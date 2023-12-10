import { Brand } from "./Brand";
import { Shoe } from "./Shoe";




  
export interface AdministratorState {
    shoes: Shoe[];
  
    singleShoe: Shoe;
  
    shoesAmount: number;

    brands: Brand[];
  
    singleBrand: Brand;
  
    brandsAmount: number;

    currentBrand: number;
}
  