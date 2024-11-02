export type Itinerary = {
  _id: string;
  name: string;
  description?: string;
  company: string;
  price: number;
  durationInMinutes: number;
  image?: string;
  // rating: number; TODO: incluir depois
  // reviews: number; TODO: incluir depois
  // tags: string[]; TODO: incluir depois
  // location: string; TODO: incluir depois
};
