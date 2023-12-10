import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import orderReducer from '../features/order/orderSlice';
import shippingReducer from '../features/shipping/shippingSlice';
import cartReducer from '../features/cart/cartSlice';
import authenticationReducer from '../features/authentication/authenticationSlice';
import shoeReducer from '../features/shoe/shoeSlice';
import administratorReducer from '../features/administrator/administratorSlice';
import brandReducer from '../features/brand/brandSlice';
import profileReducer from '../features/profile/profileSlice';
import wishListReducer from '../features/wishlist/wishListSlice';

export const store = configureStore({
  reducer: {
    administrator: administratorReducer,
    order: orderReducer,
    shipping: shippingReducer,
    shop: cartReducer,
    shoe: shoeReducer,
    brand: brandReducer,
    authentication: authenticationReducer,
    profile: profileReducer,
    wishlist: wishListReducer
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
