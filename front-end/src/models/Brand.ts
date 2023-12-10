import { Shoe } from "./Shoe";



export interface Brand {
  id?: number;
  name: string;
  description?: string;
  models: [];
}


  export interface BrandState {
    brands: Brand[];

    singleBrand: Brand;

    brandsAmount: number;

    brandShoes: Shoe[];

    shoesOfBrandAmount: number;

    isLoading: boolean;
    isError: boolean;
  }
