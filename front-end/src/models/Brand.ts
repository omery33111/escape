import { Shoe } from "./Shoe";



export interface Brand {
  id: number;
  name: string;
  description?: string;
  models: [];
  model_counts?: { [key: string]: number };
}


  export interface BrandState {
    brands: Brand[];

    singleBrand: Brand;

    brandsAmount: number;

    brandShoes: Shoe[];

    shoesOfBrandAmount: number;

    brandsIsLoading: boolean;
    isLoading: boolean;
    isError: boolean;

    numPages: number;
  }
