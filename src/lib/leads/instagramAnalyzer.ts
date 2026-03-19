import axios from 'axios';
import { InstagramData } from './types';

const REQUEST_TIMEOUT = 10000;

export async function analyzeInstagram(handle: string): Promise<InstagramData> {
  const cleanHandle = handle.replace('@', '').replace(/\/$/, '').trim();

  const data: InstagramData = {
    handle: cleanHandle,
    displayName: '',
    followers: 0,
    following: 0,
    posts: 0,
    bio: '',
    isVerified: false,
    isBusinessAccount: false,
    profilePicUrl: '',
    score: 0,
    issues: [],
  };

  if (!cleanHandle) {
    data.issues.push('Sem perfil no Instagram');
    return data;
  }

  try {
    // Try the public profile page and extract embedded JSON
    const response = await axios.get(`https://www.instagram.com/${cleanHandle}/`, {
      timeout: REQUEST_TIMEOUT,
      headers: {
        'User-Agent':
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8',
        'Accept-Language': 'pt-BR,pt;q=0.9,en-US;q=0.8,en;q=0.7',
        'Accept-Encoding': 'gzip, deflate, br',
        'Cache-Control': 'no-cache',
        'Sec-Fetch-Dest': 'document',
        'Sec-Fetch-Mode': 'navigate',
        'Sec-Fetch-Site': 'none',
      },
    });

    const html: string = response.data;

    // Try to extract from meta tags (most reliable without auth)
    extractFromMetaTags(html, data);

    // Try to extract from embedded JSON (window.__additionalDataLoaded or similar)
    extractFromEmbeddedJson(html, data);

    // Calculate score
    const { score, issues } = calculateInstagramScore(data);
    data.score = score;
    data.issues = issues;
  } catch (err) {
    const error = err as Error & { response?: { status: number } };
    if (error.response?.status === 404) {
      data.issues.push(`Perfil @${cleanHandle} não encontrado`);
    } else if (error.response?.status === 429) {
      data.issues.push('Instagram limitou o acesso — verifique manualmente');
      data.score = 0;
    } else {
      // Instagram often blocks scraping — return what we have
      data.issues.push('Não foi possível acessar dados do Instagram automaticamente');
      const { score, issues } = calculateInstagramScore(data);
      data.score = score;
      data.issues = [...data.issues, ...issues];
    }
  }

  return data;
}

function extractFromMetaTags(html: string, data: InstagramData): void {
  // og:description contains: "X Followers, X Following, X Posts - See Instagram photos..."
  const descMatch = html.match(/<meta[^>]+property="og:description"[^>]+content="([^"]+)"/i);
  if (descMatch) {
    const desc = descMatch[1];
    // Pattern: "1.2K Followers, 345 Following, 89 Posts"
    const followersMatch = desc.match(/([\d,\.]+[KMk]?)\s+Follower/i);
    const followingMatch = desc.match(/([\d,\.]+[KMk]?)\s+Following/i);
    const postsMatch = desc.match(/([\d,\.]+[KMk]?)\s+Post/i);

    if (followersMatch) data.followers = parseInstagramCount(followersMatch[1]);
    if (followingMatch) data.following = parseInstagramCount(followingMatch[1]);
    if (postsMatch) data.posts = parseInstagramCount(postsMatch[1]);
  }

  // og:title contains display name
  const titleMatch = html.match(/<meta[^>]+property="og:title"[^>]+content="([^"]+)"/i);
  if (titleMatch) {
    data.displayName = titleMatch[1].replace(/@\w+.*$/, '').replace(/\s*\(\s*$/, '').trim();
  }

  // Profile pic
  const imgMatch = html.match(/<meta[^>]+property="og:image"[^>]+content="([^"]+)"/i);
  if (imgMatch) data.profilePicUrl = imgMatch[1];
}

function extractFromEmbeddedJson(html: string, data: InstagramData): void {
  // Try to find JSON data embedded in script tags
  const patterns = [
    /"edge_followed_by":\{"count":(\d+)\}/,
    /"followers_count":(\d+)/,
    /"follower_count":(\d+)/,
  ];

  for (const pattern of patterns) {
    const match = html.match(pattern);
    if (match && !data.followers) {
      data.followers = parseInt(match[1], 10);
      break;
    }
  }

  const followingPatterns = [
    /"edge_follow":\{"count":(\d+)\}/,
    /"following_count":(\d+)/,
  ];
  for (const pattern of followingPatterns) {
    const match = html.match(pattern);
    if (match && !data.following) {
      data.following = parseInt(match[1], 10);
      break;
    }
  }

  const postsPatterns = [
    /"edge_owner_to_timeline_media":\{"count":(\d+)/,
    /"media_count":(\d+)/,
  ];
  for (const pattern of postsPatterns) {
    const match = html.match(pattern);
    if (match && !data.posts) {
      data.posts = parseInt(match[1], 10);
      break;
    }
  }

  // Bio
  const bioMatch = html.match(/"biography":"([^"]+)"/);
  if (bioMatch) {
    data.bio = bioMatch[1].replace(/\\n/g, ' ').trim().slice(0, 200);
  }

  // Verified
  data.isVerified = html.includes('"is_verified":true') || html.includes('"verified":true');

  // Business account
  data.isBusinessAccount =
    html.includes('"is_business_account":true') ||
    html.includes('"is_professional_account":true') ||
    html.includes('"account_type":2');
}

function parseInstagramCount(value: string): number {
  const clean = value.replace(',', '.').replace(/\s/g, '');
  if (clean.endsWith('K') || clean.endsWith('k')) {
    return Math.round(parseFloat(clean) * 1000);
  }
  if (clean.endsWith('M') || clean.endsWith('m')) {
    return Math.round(parseFloat(clean) * 1_000_000);
  }
  return parseInt(clean.replace(/\D/g, ''), 10) || 0;
}

function calculateInstagramScore(data: InstagramData): { score: number; issues: string[] } {
  const issues: string[] = [];
  let score = 10;

  if (data.followers === 0 && data.posts === 0) {
    // We couldn't get data, give neutral score
    return { score: 5, issues: ['Dados do Instagram não disponíveis para análise automática'] };
  }

  if (data.followers < 500) {
    score -= 3;
    issues.push(`Poucos seguidores (${data.followers}) — perfil pouco relevante`);
  } else if (data.followers < 2000) {
    score -= 1.5;
    issues.push(`Seguidores abaixo da média para negócios locais (${data.followers})`);
  }

  if (data.posts < 12) {
    score -= 2;
    issues.push(`Poucos posts (${data.posts}) — presença fraca no Instagram`);
  } else if (data.posts < 30) {
    score -= 1;
    issues.push(`Frequência de posts baixa (${data.posts} posts)`);
  }

  if (!data.bio) {
    score -= 1;
    issues.push('Sem bio no Instagram — perde oportunidade de apresentação');
  }

  if (!data.isBusinessAccount) {
    score -= 0.5;
    issues.push('Conta pessoal ao invés de conta comercial — sem acesso a métricas');
  }

  if (!data.isVerified && data.followers > 50000) {
    issues.push('Conta com muitos seguidores sem verificação');
  }

  // Low engagement ratio
  if (data.followers > 0 && data.following > data.followers * 2) {
    score -= 0.5;
    issues.push('Segue mais do que tem seguidores — indica estratégia de follow/unfollow');
  }

  return { score: Math.max(0, Math.round(score * 10) / 10), issues };
}
