import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { Order, OrderState } from '../../models/Order';
import { getLastMonthOrders, getOrdersUser, getUserOrders, getUserOrdersAmount, postOrder } from './orderAPI';



const initialState: OrderState = {
    single_order: { id: 0, user: 0, price: 0, amount: 0, note: "", coupon: "", shipping_address:
                                                          { first_name: '', 
                                                            last_name: '', 
                                                            address: "",
                                                            city: "",
                                                            postal_code: 0,
                                                            phone_number: 0,
                                                            house_number: 0,
                                                            email: "" },
                                                            size: "",
                                                            shoe: { id: "",
                                                          images: [],
                                                          name: "",
                                                            description: "" },
                                                            time: "",},
                                                            
    orders: [],
    orders_user: [],
    saveAddress: 0,
    saveTotal: 0,

    saveNote: "",
    saveCoupon: "",

    isLoading: false,
    isError: false,

    userOrdersAmount: 0
};



export const postOrderAsync = createAsyncThunk(
  'order/postOrder',
  async (data: { orderData: any, orderDetails: { shoe: number, amount: number, price: number, note: string, coupon: string }[] }) => {
    const response = await postOrder(data.orderData, data.orderDetails);
    return response.data;
  }
);


export const getUserOrdersAmountAsync = createAsyncThunk(
  "order/getUserOrdersAmount",
  async () => {
    const response = await getUserOrdersAmount();
    return response;
  }
);



export const getOrdersUserAsync = createAsyncThunk(
  'order/getOrdersUser',
  async (page: number) => {
      const response = await getOrdersUser(page);
      return response.data;
  }
)



export const getLastMonthOrdersAsync = createAsyncThunk(
  'order/getLastMonthOrders',
  async () => {
      const response = await getLastMonthOrders();
      return response.data;
  }
)



export const getUserOrdersAsync = createAsyncThunk(
  'order/getUserOrders',
  async () => {
      const response = await getUserOrders();
      return response.data;
  }
)



export const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    updateAddress: (state, action) => {
      state.saveAddress = action.payload
    },

    updateTotal: (state, action) => {
      state.saveTotal = action.payload
    },

    updateNote: (state, action) => {
      state.saveNote = action.payload
    },

    updateCoupon: (state, action) => {
      state.saveCoupon = action.payload
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(postOrderAsync.fulfilled, (state, action) => {
        state.orders = [...state.orders, action.payload];
      })
      .addCase(getOrdersUserAsync.fulfilled, (state, action) => {
        state.orders_user = action.payload
        state.isLoading = false;
      })
      .addCase(getOrdersUserAsync.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getOrdersUserAsync.rejected, (state) => {
        state.isError = true;
      })

      .addCase(getLastMonthOrdersAsync.fulfilled, (state, action) => {
        state.orders_user = action.payload
        state.isLoading = false;
      })
      .addCase(getLastMonthOrdersAsync.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getLastMonthOrdersAsync.rejected, (state) => {
        state.isError = true;
      })

      .addCase(getUserOrdersAsync.fulfilled, (state, action) => {
        state.orders_user = action.payload
      })

      .addCase(getUserOrdersAmountAsync.fulfilled, (state, action) => {
        state.userOrdersAmount = action.payload.data;
      })
  },
});



export const { updateAddress, updateTotal, updateNote, updateCoupon } = orderSlice.actions; 

export const selectUserOrdersAmount = (state: RootState) => state.order.userOrdersAmount;

export const selectSavedNote = (state: RootState) => state.order.saveNote;
export const selectSavedCoupon = (state: RootState) => state.order.saveCoupon;

export const selectOrdersUserError = (state: RootState) => state.order.isError;
export const selectOrdersUserLoading = (state: RootState) => state.order.isLoading;

export const selectOrdersUser = (state: RootState) => state.order.orders_user;
export const selectSingleOrder = (state: RootState) => state.order.single_order;
export const selectOrders = (state: RootState) => state.order.orders;
export const selectSavedAddress = (state: RootState) => state.order.saveAddress;
export const selectSavedTotal= (state: RootState) => state.order.saveTotal;

export default orderSlice.reducer;
