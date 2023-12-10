


export interface Cart {
    id: string,
    category: number,
    product_name: string,
    description: string,
    price: number,
    picture: string,
    amount: number,
}



export interface CartState {
    cart: Cart[]
  };