export type Local = {
  _id: string;
  geolocation: Geolocation;
  name: string;
  itinerary: string;
  description?: string;
  histories: History[];
};

export type Geolocation = {
  lat: number;
  lng: number;
};

export type History = {
  language: string;
  text: string;
  images?: string[];
  audio?: string;
  video?: string;
};
