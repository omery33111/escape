


export interface Cart {
    id: string,
    name: string;
    price: number;
    price_before: number;
    size: string;
    images: string[];
    amount: number,
}



export interface CartState {
    cart: Cart[]
};
