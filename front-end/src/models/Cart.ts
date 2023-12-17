


export interface Cart {
    id: string,
    name: string;
    description: string;
    price: number;
    price_before: number;
    size: string;
    picture: string;
    amount: number,
}



export interface CartState {
    cart: Cart[]
};
