import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { CouponCheckState } from '../../models/CouponCheck';
import { checkCoupon } from './couponAPI';



const initialState: CouponCheckState = {
  checked: { id: '', exists: false, discount: 0, one_time: true},
};



export const checkCouponAsync = createAsyncThunk(
  "coupon/checkCoupon",
  async (coupon: string) => {
    const response = await checkCoupon(coupon);
    return response;
  }
);



export const couponSlice = createSlice({
  name: 'coupon',
  initialState,
  reducers: {
    do: (state, action) => {
    }
  },
  extraReducers: (builder) => {
    builder
    .addCase(checkCouponAsync.fulfilled, (state, action) => {
      state.checked = action.payload.data;
    })
  },
});



export const selectCouponCheck = (state: RootState) => state.coupon.checked;



export default couponSlice.reducer;
