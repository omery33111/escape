import { Brand } from "./Brand";
import { Coupon } from "./Coupon";
import { InstaRec } from "./InstaRec";
import { Order } from "./Order";
import { ProfileManager } from "./ProfileManager";
import { Shoe } from "./Shoe";




  
export interface AdministratorState {
    profilesManager: ProfileManager[];

    profileSearch: string;

    userOrders: Order[];

    profilesAmount: number;

    coupons: Coupon[];
    
    singleCoupon: Coupon;

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
  