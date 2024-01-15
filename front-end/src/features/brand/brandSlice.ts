import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { BrandState } from '../../models/Brand';
import { getAllBrands, getBrandShoes, getPagedShoesOfBrand, getShoesAmountOfBrand, getSingleBrand } from './brandAPI';



const initialState: BrandState = {
  brands: [],

  singleBrand: { id: 0, name: '', models: [] },

  brandsAmount: 0,

  brandShoes: [],

  shoesOfBrandAmount: 0,

  brandsIsLoading: false,

  isLoading: false,
  isError: false
};



export const getAllBrandsAsync = createAsyncThunk(
  "brand/getAllBrands",
  async () => {
    const response = await getAllBrands();
    return response;
  }
);



export const getSingleBrandAsync = createAsyncThunk(
  'brand/getSingleBrand',
  async (id: string) => {
    const response = await getSingleBrand(id);
    return response.data;
  }
);



export const getBrandShoesAsync = createAsyncThunk(
  'brand/getBrandShoes',
  async (id: string) => {
    const response = await getBrandShoes(id);
    return response.data;
  }
);



export const getPagedShoesOfBrandAsync = createAsyncThunk(
  'brand/getPagedShoesOfBrand',
  async ({ id, page, orderBy, models }: { id: string, page: number, orderBy: number, models: string }) => {
    const response = await getPagedShoesOfBrand(id, page, orderBy, models);
    return response.data;
  }
);



export const getShoesAmountOfBrandAsync = createAsyncThunk(
  "brand/getShoesAmountOfBrand",
  async (id: string) => {
    const response = await getShoesAmountOfBrand(id);
    return response;
  }
);



export const brandSlice = createSlice({
  name: 'brand',
  initialState,
  reducers: {
    do: (state, action) => {
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllBrandsAsync.fulfilled, (state, action) => {
        state.brands = action.payload.data;
        state.brandsIsLoading = false;
      })
      .addCase(getAllBrandsAsync.pending, (state) => {
        state.brandsIsLoading = true;
      })
      .addCase(getAllBrandsAsync.rejected, (state) => {
        state.isError = true;
      })

      .addCase(getPagedShoesOfBrandAsync.fulfilled, (state, action) => {
        state.brandShoes = action.payload;
        state.isLoading = false;
      })
      .addCase(getPagedShoesOfBrandAsync.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getPagedShoesOfBrandAsync.rejected, (state) => {
        state.isError = true;
      })

      .addCase(getSingleBrandAsync.fulfilled, (state, action) =>
      {
        state.singleBrand = action.payload
      })

      .addCase(getBrandShoesAsync.fulfilled, (state, action) =>
      {
        state.brandShoes = action.payload
      })

      .addCase(getShoesAmountOfBrandAsync.fulfilled, (state, action) =>
      {
        state.shoesOfBrandAmount = action.payload.data
      })
  },
});



export const selectBrandsLoading = (state: RootState) => state.brand.brandsIsLoading;
export const selectBrandLoading = (state: RootState) => state.brand.isLoading;
export const selectBrandError = (state: RootState) => state.brand.isError;

export const selectAllBrands = (state: RootState) => state.brand.brands;
export const selectSingleBrand = (state: RootState) => state.brand.singleBrand;
export const selectBrandShoes = (state: RootState) => state.brand.brandShoes;
export const selectshoesOfBrandAmount = (state: RootState) => state.brand.shoesOfBrandAmount;



export default brandSlice.reducer;
