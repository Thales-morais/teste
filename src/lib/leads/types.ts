export interface Lead {
  id: string;
  name: string;
  address: string;
  phone: string;
  website: string;
  rating: number;
  totalRatings: number;
  placeId: string;
  category: string;
  status: 'pending' | 'analyzing' | 'done' | 'error';
  websiteAnalysis?: WebsiteAnalysis;
  instagramData?: InstagramData;
  diagnosis?: Diagnosis;
  errorMessage?: string;
}

export interface WebsiteAnalysis {
  hasSSL: boolean;
  isMobileResponsive: boolean;
  hasMetaDescription: boolean;
  metaDescription: string;
  title: string;
  hasWhatsApp: boolean;
  hasFacebook: boolean;
  hasInstagram: boolean;
  instagramHandle: string;
  hasYoutube: boolean;
  contactPhone: string;
  contactEmail: string;
  isWordPress: boolean;
  hasGoogleAnalytics: boolean;
  hasLiveChat: boolean;
  hasOnlineStore: boolean;
  score: number;
  issues: string[];
}

export interface InstagramData {
  handle: string;
  displayName: string;
  followers: number;
  following: number;
  posts: number;
  bio: string;
  isVerified: boolean;
  isBusinessAccount: boolean;
  profilePicUrl: string;
  score: number;
  issues: string[];
}

export interface Diagnosis {
  overallScore: number;
  priority: 'baixa' | 'media' | 'alta';
  strengths: string[];
  weaknesses: string[];
  recommendations: string[];
  ourSolution: string;
  estimatedImpact: string;
  urgencyReason: string;
}

export interface SearchParams {
  query: string;
  city: string;
  maxResults: number;
}

export interface SearchResult {
  leads: Lead[];
  total: number;
}

export interface AnalyzeRequest {
  leadId: string;
  website: string;
  businessName: string;
  instagramHandle?: string;
}

export interface ExportLead {
  'Nome do Negócio': string;
  'Endereço': string;
  'Telefone': string;
  'Website': string;
  'Avaliação Google': string;
  'Nº Avaliações': number;
  'Categoria': string;
  'SSL (HTTPS)': string;
  'Responsivo Mobile': string;
  'Meta Description': string;
  'Tem WhatsApp': string;
  'Tem Facebook': string;
  'Tem Instagram': string;
  'Handle Instagram': string;
  'Seguidores Instagram': string;
  'Posts Instagram': string;
  'Google Analytics': string;
  'Loja Online': string;
  'Pontuação Website': string;
  'Pontuação Instagram': string;
  'Pontuação Geral': string;
  'Prioridade': string;
  'Pontos Fortes': string;
  'Problemas Identificados': string;
  'Recomendações': string;
  'Nossa Solução': string;
  'Impacto Estimado': string;
  'Urgência': string;
}
