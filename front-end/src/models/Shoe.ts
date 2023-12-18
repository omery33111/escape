import { ShoeImage } from "./ShoeImage";



export interface Shoe {
  id: number | undefined;
  name: string;
  description: string;
  price_before: number;
  price: number;
  sizes: string[];
  images: string[];
  time?: string;
  brand: number;
  model: string;
}

  export interface ShoeState {
    shoes: Shoe[];

    singleShoe: Shoe;

    shoesAmount: number;

    shoeImages: ShoeImage[];

    isLoading: boolean;
    isError: boolean;

    searchShoe: string;
  }
