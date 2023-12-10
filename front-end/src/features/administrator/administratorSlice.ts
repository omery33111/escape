import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { AdministratorState } from '../../models/Administrator';
import { deleteBrand, deleteShoe, getBrandsAmount, getPagedBrands, getPagedShoes, getShoesAmount, postBrand, postShoe, putBrand, putShoe } from './administratorAPI';



const initialState: AdministratorState = {
  shoes: [],

  singleShoe: { id: 0, name: '', description: '', model: '', price_before: 0, price: 0, sizes: [], images: [''], time: '', brand: 0 },

  shoesAmount: 0,


  brands: [],

  singleBrand: { id: 0, name: '', models: [] },

  brandsAmount: 0,

  currentBrand: 0,
};



export const getPagedShoesAsync = createAsyncThunk(
  "administrator/getPagedShoes",
  async (page: number) => {
    const response = await getPagedShoes(page);
    return response;
  }
);


export const getShoesAmountAsync = createAsyncThunk(
  "administrator/getShoesAmount",
  async () => {
    const response = await getShoesAmount();
    return response;
  }
);



export const deleteShoeAsync = createAsyncThunk(
  'administrator/deleteShoe',
  async (id: number) => { await deleteShoe(id);
  return { id };
  }
);



export const postShoeAsync = createAsyncThunk(
  'administrator/postShoe',
  async (shoeData: any) => {
  const response = await postShoe(shoeData);
  return response.data;
  }
);



export const putShoeAsync = createAsyncThunk(
    'administrator/putShoe',
    async (data: {shoeData: any, id: number}) => {
    const response = await putShoe(data.shoeData, data.id);
    return response;
  }
)



export const getPagedBrandsAsync = createAsyncThunk(
  "administrator/getPagedBrands",
  async (page: number) => {
    const response = await getPagedBrands(page);
    return response;
  }
);


export const getBrandsAmountAsync = createAsyncThunk(
  "administrator/getBrandsAmount",
  async () => {
    const response = await getBrandsAmount();
    return response;
  }
);



export const deleteBrandAsync = createAsyncThunk(
  'administrator/deleteBrand',
  async (id: number) => { await deleteBrand(id);
  return { id };
  }
);



export const postBrandAsync = createAsyncThunk(
  'administrator/postBrand',
  async (brandData: any) => {
  const response = await postBrand(brandData);
  return response.data;
  }
);



export const putBrandAsync = createAsyncThunk(
    'administrator/putBrand',
    async (data: {brandData: any, id: number}) => {
    const response = await putBrand(data.brandData, data.id);
    return response;
  }
)



export const administratorSlice = createSlice({
  name: 'administrator',
  initialState,
  reducers: {
    setCurrentBrand: (state, action) => {
      state.currentBrand = action.payload
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getPagedShoesAsync.fulfilled, (state, action) => {
        state.shoes = action.payload.data;
      })

      .addCase(postShoeAsync.fulfilled, (state, action) => {
        state.shoes = [...state.shoes, action.payload];
      })

      .addCase(putShoeAsync.fulfilled, (state, action) => {
        state.singleShoe = { ...state.singleShoe, ...action.payload }
      })
      

      .addCase(putBrandAsync.fulfilled, (state, action) => {
        state.singleBrand = { ...state.singleBrand, ...action.payload }
      })

      .addCase(getPagedBrandsAsync.fulfilled, (state, action) => {
        state.brands = action.payload.data;
      })

      .addCase(postBrandAsync.fulfilled, (state, action) => {
        state.brands = [...state.brands, action.payload];
      })

      .addCase(getBrandsAmountAsync.fulfilled, (state, action) => {
        state.brandsAmount = action.payload.data;
      })

      .addCase(deleteBrandAsync.fulfilled, (state, action) => {
        state.brands = state.brands.filter(item => item.id !== action.payload.id)
      })


      .addCase(getShoesAmountAsync.fulfilled, (state, action) => {
        state.shoesAmount = action.payload.data;
      })

      .addCase(deleteShoeAsync.fulfilled, (state, action) => {
        state.shoes = state.shoes.filter(item => item.id !== action.payload.id)
      })
  },
});



export const { setCurrentBrand } = administratorSlice.actions;

export const selectPagedShoes = (state: RootState) => state.administrator.shoes;
export const selectShoesAmount = (state: RootState) => state.administrator.shoesAmount;

export const selectPagedBrands = (state: RootState) => state.administrator.brands;
export const selectBrandsAmount = (state: RootState) => state.administrator.brandsAmount;
export const selectCurrentBrand = (state: RootState) => state.administrator.currentBrand;



export default administratorSlice.reducer;