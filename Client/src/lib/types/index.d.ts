type Activity = {
  id: string;
  title: string;
  date: string;
  description: string;
  category: string;
  isCanceled: boolean;
  country: string;
  city: string;
  venue: string;
  latitude: number;
  longitude: number;
};

type ValidationError = {
  title: string;
  type: string;
  status: number;
  detail: string;
  errors: Record<string, string[]>;
};
