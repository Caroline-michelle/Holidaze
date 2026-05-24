export type Venue = {
  id: string;
  name: string;
  description: string;
  price: number;
  maxGuests: number;
  rating: number;

  media?: {
    url: string;
    alt?: string;
  }[];

  location?: {
    address?: string;
    city?: string;
    zip?: string;
    country?: string;
  };

  meta?: {
    wifi: boolean;
    parking: boolean;
    breakfast: boolean;
    pets: boolean;
  };
};
