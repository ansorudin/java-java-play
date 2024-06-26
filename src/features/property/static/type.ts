export interface Property {
  id: string;
  price: number;
  block: string;
  housePrice: number;
  hotelPrice: number;
}

export interface PropertySet {
  id: string;
  color: string;
  properties: Property[];
}
