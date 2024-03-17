import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { ShoeState } from '../../models/Shoe';
import { getAllShoes, getChosenShoes, getRandomShoes, getSingleShoe, getWallShoes, postShoeImage, searchShoe } from './shoeAPI';



const initialState: ShoeState = {
  shoes: [],

  chosenShoes: [],

  singleShoe: { id: 0, name: '', description: '', price_before: 0, model: '', price: 0, sizes: [], images: [''], time: '', brand: 0, wall: false, chosen: false, out_of: false },

  shoesAmount: 0,

  shoeImages: [],

  isLoading: false,
  isError: false,

  searchShoe: "",
  chosenIsLoading: false,
  wallIsLoading: false,

  isSearchLoading: false,
};



export const getWallShoesAsync = createAsyncThunk(
  'shoe/getWallShoes',
  async () => {
    const response = await getWallShoes();
    return response.data;
  }
);



export const getChosenShoesAsync = createAsyncThunk(
  'shoe/getChosenShoes',
  async () => {
    const response = await getChosenShoes();
    return response.data;
  }
);



export const getAllShoesAsync = createAsyncThunk(
  'shoe/getAllShoes',
  async () => {
    const response = await getAllShoes();
    return response.data;
  }
);



export const getRandomShoesAsync = createAsyncThunk(
  'shoe/getRandomShoes',
  async () => {
    const response = await getRandomShoes();
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
      .addCase(getChosenShoesAsync.fulfilled, (state, action) =>
      {
        state.chosenShoes = action.payload
        state.chosenIsLoading = false;
      })
      .addCase(getChosenShoesAsync.pending, (state) => {
        state.chosenIsLoading = true;
      })
      .addCase(getChosenShoesAsync.rejected, (state) => {
        state.isError = true;
      })
      
      .addCase(getWallShoesAsync.fulfilled, (state, action) =>
      {
        state.shoes = action.payload
        state.wallIsLoading = false;
      })
      .addCase(getWallShoesAsync.pending, (state) => {
        state.wallIsLoading = true;
      })
      .addCase(getWallShoesAsync.rejected, (state) => {
        state.isError = true;
      })

      .addCase(getAllShoesAsync.fulfilled, (state, action) =>
      {
        state.shoes = action.payload
      })

      .addCase(getRandomShoesAsync.fulfilled, (state, action) =>
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
        state.isSearchLoading = false;
      })
      .addCase(searchShoeAsync.pending, (state) => {
        state.isSearchLoading = true;
      })
      .addCase(searchShoeAsync.rejected, (state) => {
        state.isError = true;
      })
  },
});



export const { setShoeSearch } = shoeSlice.actions;



export const selectSearchLoading = (state: RootState) => state.shoe.isSearchLoading;

export const selectChosenShoes = (state: RootState) => state.shoe.chosenShoes;

export const selectSearchShoe = (state: RootState) => state.shoe.searchShoe;

export const selectChosenLoading = (state: RootState) => state.shoe.chosenIsLoading;
export const selectWallLoading = (state: RootState) => state.shoe.wallIsLoading;

export const selectSingleShoeLoading = (state: RootState) => state.shoe.isLoading;
export const selectSingleShoeError = (state: RootState) => state.shoe.isError;

export const selectAllShoes = (state: RootState) => state.shoe.shoes;
export const selectSingleShoe = (state: RootState) => state.shoe.singleShoe;



export default shoeSlice.reducer;