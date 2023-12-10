import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { ShoeState } from '../../models/Shoe';
import { getAllShoes, getSingleShoe, postShoeImage, searchShoe } from './shoeAPI';



const initialState: ShoeState = {
  shoes: [],
  
  singleShoe: { id: 0, name: '', description: '', price_before: 0, model: '', price: 0, sizes: [], images: [''], time: '', brand: 0 },

  shoesAmount: 0,

  shoeImages: [],
    
  isLoading: false,
  isError: false,

  searchShoe: ""
};



export const getAllShoesAsync = createAsyncThunk(
  'shoe/getAllShoes',
  async () => {
    const response = await getAllShoes();
    return response.data;
  }
);



export const getSingleShoeAsync = createAsyncThunk(
  'shoe/getSingleShoe',
  async (id: string) => {
    const response = await getSingleShoe(id);
    return response.data;
  }
);



export const postShoeImageAsync = createAsyncThunk(
  'shoe/postShoeImage',
  async (shoeImageData: any) => {
  const response = await postShoeImage(shoeImageData);
  return response.data;
  }
);



export const searchShoeAsync = createAsyncThunk(
  'shoe/searchShoe',
  async (data: {searchQuery: string}) => {
    const response = await searchShoe(data.searchQuery);
    return response.data;
  }
);



export const shoeSlice = createSlice({
  name: 'shoe',
  initialState,
  reducers: {
    setShoeSearch: (state, action) => {
      state.searchShoe = action.payload
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllShoesAsync.fulfilled, (state, action) =>
      {
        state.shoes = action.payload
      })

      .addCase(getSingleShoeAsync.fulfilled, (state, action) =>
      {
        state.singleShoe = action.payload
        state.isLoading = false;
      })
      .addCase(getSingleShoeAsync.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getSingleShoeAsync.rejected, (state) => {
        state.isError = true;
      })

      .addCase(postShoeImageAsync.fulfilled, (state, action) => {
        state.shoeImages = [...state.shoeImages, action.payload];
      })

      .addCase(searchShoeAsync.fulfilled, (state, action) =>
      {
        state.shoes = action.payload
        state.isLoading = false;
      })
      .addCase(searchShoeAsync.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(searchShoeAsync.rejected, (state) => {
        state.isError = true;
      })
  },
});



export const { setShoeSearch } = shoeSlice.actions;



export const selectSearchShoe = (state: RootState) => state.shoe.searchShoe;

export const selectSingleShoeLoading = (state: RootState) => state.shoe.isLoading;
export const selectSingleShoeError = (state: RootState) => state.shoe.isError;

export const selectAllShoes = (state: RootState) => state.shoe.shoes;
export const selectSingleShoe = (state: RootState) => state.shoe.singleShoe;



export default shoeSlice.reducer;