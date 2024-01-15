import { Brand } from "./Brand";
import { InstaRec } from "./InstaRec";
import { Order } from "./Order";
import { Shoe } from "./Shoe";




  
export interface AdministratorState {
    shoes: Shoe[];

    instarecs: InstaRec[];
  
    singleShoe: Shoe;
  
    shoesAmount: number;

    brands: Brand[];

    orders: Order[];
  
    singleBrand: Brand;
  
    brandsAmount: number;

    instarecAmount: number;

    ordersAmount: number;

    currentBrand: number;
}
  