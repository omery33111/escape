


export interface wishList {
    id: string,
    category: string,
    product_name: string,
    description: string,
    price: number,
    picture: string,
}



export interface WishListState {
    wishList: wishList[]
  };