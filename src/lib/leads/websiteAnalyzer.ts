import axios from 'axios';
import * as cheerio from 'cheerio';
import { WebsiteAnalysis } from './types';

const REQUEST_TIMEOUT = 12000;

export async function analyzeWebsite(url: string): Promise<WebsiteAnalysis> {
  const analysis: WebsiteAnalysis = {
    hasSSL: false,
    isMobileResponsive: false,
    hasMetaDescription: false,
    metaDescription: '',
    title: '',
    hasWhatsApp: false,
    hasFacebook: false,
    hasInstagram: false,
    instagramHandle: '',
    hasYoutube: false,
    contactPhone: '',
    contactEmail: '',
    isWordPress: false,
    hasGoogleAnalytics: false,
    hasLiveChat: false,
    hasOnlineStore: false,
    score: 0,
    issues: [],
  };

  if (!url) {
    analysis.issues.push('Sem website cadastrado');
    return analysis;
  }

  // Normalize URL
  let normalizedUrl = url;
  if (!url.startsWith('http://') && !url.startsWith('https://')) {
    normalizedUrl = `https://${url}`;
  }

  // Check SSL
  analysis.hasSSL = normalizedUrl.startsWith('https://');

  try {
    const response = await axios.get(normalizedUrl, {
      timeout: REQUEST_TIMEOUT,
      headers: {
        'User-Agent':
          'Mozilla/5.0 (iPhone; CPU iPhone OS 14_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.0 Mobile/15E148 Safari/604.1',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
        'Accept-Language': 'pt-BR,pt;q=0.9,en;q=0.8',
      },
      maxRedirects: 5,
    });

    const html: string = response.data;
    const $ = cheerio.load(html);

    // Update SSL based on redirect
    if (response.config.url?.startsWith('https://') || response.request?.res?.responseUrl?.startsWith('https://')) {
      analysis.hasSSL = true;
    }

    // Title
    analysis.title = $('title').first().text().trim().slice(0, 120);

    // Meta description
    const metaDesc =
      $('meta[name="description"]').attr('content') ||
      $('meta[property="og:description"]').attr('content') ||
      '';
    analysis.metaDescription = metaDesc.trim().slice(0, 200);
    analysis.hasMetaDescription = metaDesc.trim().length > 0;

    // Mobile responsive: viewport meta tag
    const viewport = $('meta[name="viewport"]').attr('content') || '';
    analysis.isMobileResponsive =
      viewport.includes('width=device-width') || viewport.includes('initial-scale');

    const bodyText = $.html().toLowerCase();

    // WhatsApp
    analysis.hasWhatsApp =
      bodyText.includes('wa.me/') ||
      bodyText.includes('api.whatsapp.com') ||
      bodyText.includes('whatsapp.com/send') ||
      bodyText.includes('whatsapp');

    // Facebook
    analysis.hasFacebook =
      bodyText.includes('facebook.com/') ||
      bodyText.includes('fb.com/');

    // Instagram
    const instagramMatch =
      bodyText.match(/instagram\.com\/([a-zA-Z0-9._]+)/) ||
      $('a[href*="instagram.com"]').attr('href')?.match(/instagram\.com\/([a-zA-Z0-9._]+)/);
    if (instagramMatch) {
      analysis.hasInstagram = true;
      const handle = instagramMatch[1];
      if (!['p', 'explore', 'stories', 'reel', 'tv', 'accounts'].includes(handle)) {
        analysis.instagramHandle = handle;
      }
    }

    // YouTube
    analysis.hasYoutube =
      bodyText.includes('youtube.com/') ||
      bodyText.includes('youtu.be/');

    // Contact: phone (Brazilian patterns)
    const phoneMatch = bodyText.match(/(\(?\d{2}\)?\s?[\d\s\-]{8,13}\d)/);
    if (phoneMatch) {
      analysis.contactPhone = phoneMatch[0].replace(/\s+/g, ' ').trim().slice(0, 20);
    }

    // Contact: email
    const emailMatch = bodyText.match(/[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}/);
    if (emailMatch && !emailMatch[0].includes('sentry') && !emailMatch[0].includes('example')) {
      analysis.contactEmail = emailMatch[0].slice(0, 60);
    }

    // WordPress
    analysis.isWordPress =
      bodyText.includes('wp-content/') ||
      bodyText.includes('wp-includes/') ||
      bodyText.includes('/wordpress/');

    // Google Analytics
    analysis.hasGoogleAnalytics =
      bodyText.includes('googletagmanager.com') ||
      bodyText.includes('google-analytics.com') ||
      bodyText.includes('gtag(') ||
      bodyText.includes('ga(');

    // Live chat
    analysis.hasLiveChat =
      bodyText.includes('tawk.to') ||
      bodyText.includes('zendesk') ||
      bodyText.includes('intercom') ||
      bodyText.includes('drift.com') ||
      bodyText.includes('crisp.chat') ||
      bodyText.includes('jivochat') ||
      bodyText.includes('livechat');

    // Online store
    analysis.hasOnlineStore =
      bodyText.includes('shopify') ||
      bodyText.includes('woocommerce') ||
      bodyText.includes('adicionar ao carrinho') ||
      bodyText.includes('add to cart') ||
      bodyText.includes('checkout') ||
      bodyText.includes('finalizar compra') ||
      bodyText.includes('loja virtual');

    // Calculate score and issues
    const { score, issues } = calculateWebsiteScore(analysis);
    analysis.score = score;
    analysis.issues = issues;
  } catch (err) {
    const error = err as Error & { code?: string; response?: { status: number } };
    if (error.code === 'ECONNREFUSED' || error.code === 'ENOTFOUND') {
      analysis.issues.push('Website fora do ar ou inacessível');
    } else if (error.response?.status === 403) {
      analysis.issues.push('Website bloqueia bots (análise parcial)');
      const { score, issues } = calculateWebsiteScore(analysis);
      analysis.score = score;
      analysis.issues = [...analysis.issues, ...issues];
    } else if (error.code === 'ECONNABORTED') {
      analysis.issues.push('Website muito lento (timeout)');
    } else {
      analysis.issues.push(`Erro ao acessar website: ${error.message?.slice(0, 50)}`);
    }
  }

  return analysis;
}

function calculateWebsiteScore(analysis: WebsiteAnalysis): { score: number; issues: string[] } {
  const issues: string[] = [];
  let score = 10;

  if (!analysis.hasSSL) {
    score -= 2;
    issues.push('Sem certificado SSL (HTTPS) — penalizado pelo Google');
  }
  if (!analysis.isMobileResponsive) {
    score -= 2;
    issues.push('Não é responsivo para mobile — 70%+ do tráfego vem do celular');
  }
  if (!analysis.hasMetaDescription) {
    score -= 1;
    issues.push('Sem meta description — prejudica SEO e cliques no Google');
  }
  if (!analysis.hasWhatsApp) {
    score -= 1;
    issues.push('Sem botão de WhatsApp — principal canal de conversão no Brasil');
  }
  if (!analysis.hasInstagram) {
    score -= 1;
    issues.push('Sem link para Instagram no site');
  }
  if (!analysis.hasGoogleAnalytics) {
    score -= 1;
    issues.push('Sem Google Analytics — sem dados de visitantes');
  }
  if (!analysis.contactPhone && !analysis.contactEmail) {
    score -= 1;
    issues.push('Sem telefone ou e-mail visível no site');
  }
  if (!analysis.hasLiveChat) {
    score -= 0.5;
    issues.push('Sem chat ao vivo — dificulta atendimento imediato');
  }

  return { score: Math.max(0, Math.round(score * 10) / 10), issues };
}
