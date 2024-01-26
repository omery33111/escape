import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { AdministratorState } from '../../models/Administrator';
import { deleteBrand, deleteCoupon, deleteInstaRec, deleteShoe, getBrandsAmount, getCoupons, getInstaRecAmount, getOrdersAmount, getPagedBrands, getPagedInstaRecs, getPagedOrders, getPagedProfilesManager, getPagedShoes, getProfilesAmount, getRecentOrders, getShoesAmount, getSingleCoupon, getUserOrders, postBrand, postCoupon, postInstaRec, postShoe, putBrand, putCoupon, putShoe, searchProfile } from './administratorAPI';



const initialState: AdministratorState = {
  shoes: [],

  instarecs: [],

  singleShoe: { id: 0, name: '', description: '', model: '', price_before: 0, price: 0, sizes: [], images: [''], time: '', brand: 0, wall: false, chosen: false, out_of: false },

  shoesAmount: 0,

  brands: [],

  singleBrand: { id: 0, name: '', models: [] },

  brandsAmount: 0,

  instarecAmount: 0,

  currentBrand: 0,

  ordersAmount: 0,

  profilesAmount: 0,

  orders: [],

  coupons: [],

  singleCoupon: { id: 0, name: "", discount: 0, one_time: true },

  profilesManager: [],

  userOrders: [],

  profileSearch: '',
};



export const searchProfileAsync = createAsyncThunk(
  'administrator/searchProfile',
  async (data: {searchQuery: string}) => {
    const response = await searchProfile(data.searchQuery);
    return response.data;
  }
);



export const getCouponsAsync = createAsyncThunk(
  "administrator/getCoupons",
  async () => {
    const response = await getCoupons();
    return response;
  }
);



export const getPagedProfilesManagerAsync = createAsyncThunk(
  "administrator/getPagedProfilesManager",
  async (page: number) => {
    const response = await getPagedProfilesManager(page);
    return response;
  }
);



export const getPagedOrdersAsync = createAsyncThunk(
  "administrator/getPagedOrders",
  async (page: number) => {
    const response = await getPagedOrders(page);
    return response;
  }
);



export const getPagedShoesAsync = createAsyncThunk(
  "administrator/getPagedShoes",
  async (page: number) => {
    const response = await getPagedShoes(page);
    return response;
  }
);



export const getPagedInstaRecsAsync = createAsyncThunk(
  "administrator/getPagedInstaRecs",
  async (page: number) => {
    const response = await getPagedInstaRecs(page);
    return response;
  }
);



export const getSingleCouponAsync = createAsyncThunk(
  'shoe/getSingleCoupon',
  async (id: number) => {
    const response = await getSingleCoupon(id);
    return response.data;
  }
);



export const getProfilesAmountAsync = createAsyncThunk(
  "administrator/getProfilesAmount",
  async () => {
    const response = await getProfilesAmount();
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



export const deleteCouponAsync = createAsyncThunk(
  'administrator/deleteCoupon',
  async (id: number) => { await deleteCoupon(id);
  return { id };
  }
);



export const deleteShoeAsync = createAsyncThunk(
  'administrator/deleteShoe',
  async (id: number) => { await deleteShoe(id);
  return { id };
  }
);



export const deleteInstaRecAsync = createAsyncThunk(
  'administrator/deleteInstaRec',
  async (id: number) => { await deleteInstaRec(id);
  return { id };
  }
);



export const postInstaRecAsync = createAsyncThunk(
  'administrator/postInstaRec',
  async (recData: any) => {
  const response = await postInstaRec(recData);
  return response.data;
  }
);



export const postCouponAsync = createAsyncThunk(
  'administrator/postCoupon',
  async (couponData: any) => {
  const response = await postCoupon(couponData);
  return response.data;
  }
);



export const postShoeAsync = createAsyncThunk(
  'administrator/postShoe',
  async (shoeData: any) => {
  const response = await postShoe(shoeData);
  return response.data;
  }
);



export const putCouponAsync = createAsyncThunk(
    'administrator/putCoupon',
    async (data: {couponData: any, id: number}) => {
    const response = await putCoupon(data.couponData, data.id);
    return response;
  }
)



export const putShoeAsync = createAsyncThunk(
    'administrator/putShoe',
    async (data: {shoeData: any, id: number}) => {
    const response = await putShoe(data.shoeData, data.id);
    return response;
  }
)



export const getRecentOrdersAsync = createAsyncThunk(
  "administrator/getRecentOrders",
  async () => {
    const response = await getRecentOrders();
    return response;
  }
);



export const getUserOrdersAsync = createAsyncThunk(
  "administrator/getUserOrders",
  async (id: number) => {
    const response = await getUserOrders(id);
    return response;
  }
);



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


export const getInstaRecAmountAsync = createAsyncThunk(
  "administrator/getInstaRecAmount",
  async () => {
    const response = await getInstaRecAmount();
    return response;
  }
);


export const getOrdersAmountAsync = createAsyncThunk(
  "administrator/getOrdersAmount",
  async () => {
    const response = await getOrdersAmount();
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
    },

    updateSearchProfile: (state, action) => {
      state.profileSearch = action.payload
    }

  },
  extraReducers: (builder) => {
    builder
      .addCase(searchProfileAsync.fulfilled, (state, action) =>
      {
        state.profilesManager = action.payload
      })

      .addCase(getPagedShoesAsync.fulfilled, (state, action) => {
        state.shoes = action.payload.data;
      })

      .addCase(getUserOrdersAsync.fulfilled, (state, action) => {
        state.userOrders = action.payload.data;
      })

      .addCase(getPagedProfilesManagerAsync.fulfilled, (state, action) => {
        state.profilesManager = action.payload.data;
      })

      .addCase(getSingleCouponAsync.fulfilled, (state, action) =>
      {
        state.singleCoupon = action.payload
      })

      .addCase(getCouponsAsync.fulfilled, (state, action) => {
        state.coupons = action.payload.data;
      })

      .addCase(getPagedInstaRecsAsync.fulfilled, (state, action) => {
        state.instarecs = action.payload.data;
      })

      .addCase(getPagedOrdersAsync.fulfilled, (state, action) => {
        state.orders = action.payload.data;
      })

      .addCase(postInstaRecAsync.fulfilled, (state, action) => {
        state.instarecs = [...state.instarecs, action.payload];
      })

      .addCase(postCouponAsync.fulfilled, (state, action) => {
        state.coupons = [...state.coupons, action.payload];
      })

      .addCase(postShoeAsync.fulfilled, (state, action) => {
        state.shoes = [...state.shoes, action.payload];
      })

      .addCase(putShoeAsync.fulfilled, (state, action) => {
        state.singleShoe = { ...state.singleShoe, ...action.payload }
      })

      .addCase(putCouponAsync.fulfilled, (state, action) => {
        state.singleCoupon = { ...state.singleCoupon, ...action.payload }
      })
      

      .addCase(putBrandAsync.fulfilled, (state, action) => {
        state.singleBrand = { ...state.singleBrand, ...action.payload }
      })

      .addCase(getPagedBrandsAsync.fulfilled, (state, action) => {
        state.brands = action.payload.data;
      })

      .addCase(getRecentOrdersAsync.fulfilled, (state, action) => {
        state.orders = action.payload.data;
      })

      .addCase(postBrandAsync.fulfilled, (state, action) => {
        state.brands = [...state.brands, action.payload];
      })

      .addCase(getBrandsAmountAsync.fulfilled, (state, action) => {
        state.brandsAmount = action.payload.data;
      })

      .addCase(getInstaRecAmountAsync.fulfilled, (state, action) => {
        state.instarecAmount = action.payload.data;
      })

      .addCase(getOrdersAmountAsync.fulfilled, (state, action) => {
        state.ordersAmount = action.payload.data;
      })

      .addCase(deleteBrandAsync.fulfilled, (state, action) => {
        state.brands = state.brands.filter(item => item.id !== action.payload.id)
      })

      .addCase(deleteCouponAsync.fulfilled, (state, action) => {
        state.coupons = state.coupons.filter(item => item.id !== action.payload.id)
      })


      .addCase(getShoesAmountAsync.fulfilled, (state, action) => {
        state.shoesAmount = action.payload.data;
      })

      .addCase(getProfilesAmountAsync.fulfilled, (state, action) => {
        state.profilesAmount = action.payload.data;
      })

      .addCase(deleteShoeAsync.fulfilled, (state, action) => {
        state.shoes = state.shoes.filter(item => item.id !== action.payload.id)
      })

      .addCase(deleteInstaRecAsync.fulfilled, (state, action) => {
        state.instarecs = state.instarecs.filter(item => item.id !== action.payload.id)
      })
  },
});



export const { setCurrentBrand, updateSearchProfile } = administratorSlice.actions;

export const selectUserOrders = (state: RootState) => state.administrator.userOrders;

export const selectProfilesAmount = (state: RootState) => state.administrator.profilesAmount;
export const selectProfilesManager = (state: RootState) => state.administrator.profilesManager;
export const selectProfileSearch = (state: RootState) => state.administrator.profileSearch;

export const selectSingleCoupon = (state: RootState) => state.administrator.singleCoupon;
export const selectCoupons = (state: RootState) => state.administrator.coupons;

export const selectOrdersAmount = (state: RootState) => state.administrator.ordersAmount;
export const selectPagedOrders = (state: RootState) => state.administrator.orders;

export const selectPagedShoes = (state: RootState) => state.administrator.shoes;
export const selectShoesAmount = (state: RootState) => state.administrator.shoesAmount;

export const selectPagedBrands = (state: RootState) => state.administrator.brands;
export const selectAdminPagedInstaRec = (state: RootState) => state.administrator.instarecs;
export const selectInstaRecAmount = (state: RootState) => state.administrator.instarecAmount;
export const selectBrandsAmount = (state: RootState) => state.administrator.brandsAmount;
export const selectCurrentBrand = (state: RootState) => state.administrator.currentBrand;



export default administratorSlice.reducer;