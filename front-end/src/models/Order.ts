


export interface Order {
    id: number;
    price: number;
    note: string;
    coupon: string;
    amount: number;
    user: number;
    size: string;
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

      saveNote: string;
      saveCoupon: string;

      userOrdersAmount: number;
    };