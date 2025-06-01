type Activity = {
  id: string;
  title: string;
  date: Date;
  description: string;
  category: string;
  isCanceled: boolean;
  country: string;
  city: string;
  venue: string;
  latitude: number;
  longitude: number;
  attendees: Profile[];
  isGoing: boolean;
  isHost: boolean;
  hostId: string;
  hostDisplayName: string;
  hostImageUrl?: string;
};

type Profile = {
  id: string;
  displayName: string;
  bio?: string;
  imageUrl?: string;
};

type Photo = {
  id: string;
  url: string;
};

type ValidationError = {
  title: string;
  type: string;
  status: number;
  detail: string;
  errors: Record<string, string[]>;
};

type LocationIQSuggestion = {
  place_id: string;
  osm_id: string;
  osm_type: string;
  licence: string;
  lat: string;
  lon: string;
  boundingbox: string[];
  class: string;
  type: string;
  display_name: string;
  display_place: string;
  display_address: string;
  address: LocationIQAddress;
};

type LocationIQAddress = {
  name: string;
  road: string;
  neighbourhood: string;
  suburb: string;
  city?: string;
  town?: string;
  village?: string;
  county: string;
  state: string;
  postcode: string;
  country: string;
  country_code: string;
};

type User = {
  id: string;
  email: string;
  displayName: string;
  imageUrl?: string;
};

type ChatComment = {
  id: string;
  body: string;
  createdAt: Date;
  userId: string;
  displayName: string;
  imageUrl?: string;
};
