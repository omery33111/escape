


export interface wishList {
    id: string,
    name: string;
    price: number;
    price_before: number;
    images: string[];
}



export interface WishListState {
    wishList: wishList[]
  };