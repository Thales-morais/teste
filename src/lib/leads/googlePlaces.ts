import { Lead } from './types';

const PLACES_API_BASE = 'https://maps.googleapis.com/maps/api/place';

interface PlaceResult {
  place_id: string;
  name: string;
  formatted_address: string;
  rating?: number;
  user_ratings_total?: number;
  website?: string;
  formatted_phone_number?: string;
  types?: string[];
}

interface TextSearchResponse {
  results: PlaceResult[];
  status: string;
  error_message?: string;
  next_page_token?: string;
}

interface PlaceDetailsResponse {
  result: {
    formatted_phone_number?: string;
    website?: string;
    international_phone_number?: string;
  };
  status: string;
}

export async function searchPlaces(
  query: string,
  city: string,
  maxResults: number,
  apiKey: string
): Promise<Lead[]> {
  const fullQuery = `${query} em ${city}`;
  const url = `${PLACES_API_BASE}/textsearch/json?query=${encodeURIComponent(fullQuery)}&language=pt-BR&key=${apiKey}`;

  const response = await fetch(url);
  const data: TextSearchResponse = await response.json();

  if (data.status !== 'OK' && data.status !== 'ZERO_RESULTS') {
    throw new Error(`Google Places API error: ${data.status} - ${data.error_message || ''}`);
  }

  const results = (data.results || []).slice(0, maxResults);
  const leads: Lead[] = [];

  for (const place of results) {
    let phone = '';
    let website = place.website || '';

    // Fetch details for phone and website if not in text search
    if (!place.website || !phone) {
      try {
        const details = await fetchPlaceDetails(place.place_id, apiKey);
        phone = details.formatted_phone_number || details.international_phone_number || '';
        if (!website && details.website) website = details.website;
      } catch {
        // ignore details errors
      }
    }

    const category = mapCategory(place.types || []);

    leads.push({
      id: place.place_id,
      name: place.name,
      address: place.formatted_address,
      phone,
      website,
      rating: place.rating || 0,
      totalRatings: place.user_ratings_total || 0,
      placeId: place.place_id,
      category,
      status: 'pending',
    });
  }

  return leads;
}

async function fetchPlaceDetails(placeId: string, apiKey: string): Promise<{
  formatted_phone_number?: string;
  international_phone_number?: string;
  website?: string;
}> {
  const url = `${PLACES_API_BASE}/details/json?place_id=${placeId}&fields=formatted_phone_number,international_phone_number,website&language=pt-BR&key=${apiKey}`;
  const response = await fetch(url);
  const data: PlaceDetailsResponse = await response.json();

  if (data.status !== 'OK') return {};
  return data.result;
}

function mapCategory(types: string[]): string {
  const categoryMap: Record<string, string> = {
    restaurant: 'Restaurante',
    food: 'Alimentação',
    bar: 'Bar',
    cafe: 'Café',
    beauty_salon: 'Salão de Beleza',
    hair_care: 'Cabeleireiro',
    gym: 'Academia',
    health: 'Saúde',
    doctor: 'Médico',
    dentist: 'Dentista',
    store: 'Loja',
    clothing_store: 'Loja de Roupas',
    shoe_store: 'Sapatos',
    electronics_store: 'Eletrônicos',
    furniture_store: 'Móveis',
    home_goods_store: 'Casa e Decoração',
    car_dealer: 'Concessionária',
    car_repair: 'Oficina',
    real_estate_agency: 'Imobiliária',
    lawyer: 'Advocacia',
    accounting: 'Contabilidade',
    school: 'Escola',
    lodging: 'Hospedagem',
    hotel: 'Hotel',
    spa: 'Spa',
    pharmacy: 'Farmácia',
    supermarket: 'Supermercado',
    bakery: 'Padaria',
    pet_store: 'Pet Shop',
    florist: 'Floricultura',
  };

  for (const type of types) {
    if (categoryMap[type]) return categoryMap[type];
  }

  return 'Negócio Local';
}
