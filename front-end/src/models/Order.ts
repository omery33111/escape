export interface Order {
    id: number;
    price: number;
    amount: number;
    user: number;
    shoe: { id: string;
              images: string[];
              name: string;
              description: string; };
    shipping_address: { first_name: string; last_name: string; address: string; city: string; house_number: number; phone_number: number; postal_code: number };
    time: string;
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