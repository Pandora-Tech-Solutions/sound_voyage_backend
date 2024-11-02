export type Traveler = {
  _id: string;
  name: string;
  email: string;
  phone?: string;
  birthdate?: Date;
  itineraries?: string[];
};
