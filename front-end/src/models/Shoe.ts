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
  wall: boolean;
  chosen: boolean;
  out_of: boolean;
}

  export interface ShoeState {
    shoes: Shoe[];
    
    chosenShoes: Shoe[];

    singleShoe: Shoe;

    shoesAmount: number;

    shoeImages: ShoeImage[];

    chosenIsLoading: boolean;
    wallIsLoading: boolean;
    isLoading: boolean;
    isError: boolean;

    searchShoe: string;

    isSearchLoading: boolean;
  }
