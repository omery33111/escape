export interface Order {
    id: number;
    price: number;
    amount: number;
    user: number;
    product: { id: string;
              picture: string;
              product_name: string;
              description: string; };
    shipping_address: { first_name: string; last_name: string; address: string; city: string; state: string; postal_code: number; country: string };
    }
  
  
    export interface OrderState {
      single_order: Order;
      orders: Order[];
      orders_user: Order[];
      saveAddress: number;
      saveTotal: number;

      isLoading: boolean;
      isError: boolean;
    };