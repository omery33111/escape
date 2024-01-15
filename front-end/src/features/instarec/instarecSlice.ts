import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { InstaRecState } from '../../models/InstaRec';
import { getAllInstaRecs, getCarInstaRecs, getInstaRecCarAmount } from './instarecAPI';



const initialState: InstaRecState = {
  instarecs: [],

  instarecAmount: 0,
};



export const getAllInstaRecsAsync = createAsyncThunk(
  "instarec/getAllInstaRecs",
  async () => {
    const response = await getAllInstaRecs();
    return response;
  }
);



export const getInstaRecCarAmountAsync = createAsyncThunk(
  "instarec/getInstaRecCarAmount",
  async () => {
    const response = await getInstaRecCarAmount();
    return response;
  }
);



export const getCarInstaRecsAsync = createAsyncThunk(
  "instarec/getCarInstaRecs",
  async (page: number) => {
    const response = await getCarInstaRecs(page);
    return response;
  }
);



export const instarecSlice = createSlice({
  name: 'instarec',
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCarInstaRecsAsync.fulfilled, (state, action) =>
      {
        state.instarecs = action.payload.data;
      })

      .addCase(getInstaRecCarAmountAsync.fulfilled, (state, action) => {
        state.instarecAmount = action.payload.data;
      })

      .addCase(getAllInstaRecsAsync.fulfilled, (state, action) => {
        state.instarecs = action.payload.data;
      })
  },
});



export const selectInstaRecs = (state: RootState) => state.instarec.instarecs;
export const selectInstaRecsCarAmount = (state: RootState) => state.instarec.instarecAmount;



export default instarecSlice.reducer;