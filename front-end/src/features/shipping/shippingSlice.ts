import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { Address, AddressState } from "../../models/Shipping";
import { getAddresses, getAddressesAmount, getIsraelCities, getIsraelStreets, getNextShippingID, getSingleAddress, patchAddress, postAddress } from "./shippingAPI";



const initialState: AddressState = {
  addresses: [],
  guestAddress: [],
  single_address: { id: 0, first_name: '', last_name: '', address: '', city: '', house_number: 0, phone_number: 0, postal_code: 0 },

  addressesAmount: 0,

  israelCities: [],
  israelStreets: [],

  isLoading: false,
  isError: false,

  searchCity: "",
  searchStreet: "",

  nextID: 0
};





  export const getIsraelStreetsAsync = createAsyncThunk(
    'shipping/getIsraelStreets',
    async (query: string) => {
      const response = await getIsraelStreets(query);
      return response;
    }
  );



  export const getIsraelCitiesAsync = createAsyncThunk(
    'shipping/getIsraelCities',
    async (query: string) => {
      const response = await getIsraelCities(query);
      return response;
    }
  );



export const getAddressesAmountAsync = createAsyncThunk(
  "shipping/getAddressesAmount",
  async () => {
    const response = await getAddressesAmount();
    return response;
  }
);



export const getNextShippingIDAsync = createAsyncThunk(
  "shipping/getNextShippingID",
  async () => {
    const response = await getNextShippingID();
    return response;
  }
);


export const getAddressesAsync = createAsyncThunk(
    'shipping/getAddresses',
    async () => {
        const response = await getAddresses();
        return response.data;
    }
)

export const getSingleAddressAsync = createAsyncThunk(
    'shipping/getSingleAddress',
    async (id: string) => {
      const response = await getSingleAddress(id);
      return response.data;
    }
  );


  export const postAddressAsync = createAsyncThunk(
    'shipping/postAddress',
    async (shippingData: Address) => {
        const response = await postAddress(shippingData);
        return response.data;
    }
);


  
  export const patchAddressAsync = createAsyncThunk(
    'shipping/patchAddress',
    async (data: {shippingData: any, id: number}) => {
    const response = await patchAddress(data.shippingData, data.id);
    return response;
    }
  )

export const shippingSlice = createSlice({
    name: 'shipping',
    initialState,
    reducers: {
      deleteGuestAddress: (state, action) => {
        const item = action.payload.item
      
      state.guestAddress = state.guestAddress.filter(({id}) => id !== item.id)
      
      localStorage.setItem("addresses", JSON.stringify(state.guestAddress))

      if (state.guestAddress.length === 0) {
        localStorage.removeItem("addresses");
      }
      },

      initGuestAddresses: (state) =>
      {
        const temp = JSON.parse(localStorage.getItem("addresses") as string)
        if (temp)
        {
          state.guestAddress = temp
        }
      },

      setCitySearch: (state, action) => {
        state.searchCity = action.payload
      },

      setStreetSearch: (state, action) => {
        state.searchStreet = action.payload
      }
    },
    extraReducers: (builder) => {
        builder
        .addCase(getAddressesAsync.fulfilled, (state, action) => {
          state.addresses = action.payload
          state.isLoading = false;
        })
        .addCase(getAddressesAsync.pending, (state) => {
          state.isLoading = true;
        })
        .addCase(getAddressesAsync.rejected, (state) => {
          state.isError = true;
        })

        .addCase(getSingleAddressAsync.fulfilled, (state, action) => {
          state.single_address = action.payload
        })
        .addCase(patchAddressAsync.fulfilled, (state, action) => {
          state.single_address = { ...state.single_address, ...action.payload }
        })
        
        .addCase(postAddressAsync.fulfilled, (state, action) => {
          state.addresses = [...state.addresses, action.payload];
        })

        .addCase(getAddressesAmountAsync.fulfilled, (state, action) => {
          state.addressesAmount = action.payload.data;
        })

        .addCase(getNextShippingIDAsync.fulfilled, (state, action) => {
          state.nextID = action.payload.data;
        })

        .addCase(getIsraelCitiesAsync.fulfilled, (state, action) => {
          if (action.payload) {
            console.log('Fetched data:', action.payload);
            state.israelCities = action.payload; // Update state with fetched data
          } else {
            console.log('No data retrieved.');
          }
        })

        .addCase(getIsraelStreetsAsync.fulfilled, (state, action) => {
          if (action.payload) {
            console.log('Fetched data:', action.payload);
            state.israelStreets = action.payload; // Update state with fetched data
          } else {
            console.log('No data retrieved.');
          }
        });
        
    }
})



export const { deleteGuestAddress, initGuestAddresses, setCitySearch, setStreetSearch } = shippingSlice.actions; 

export const selectNextShippingID = (state: RootState) => state.shipping.nextID;

export const selectSearchCity = (state: RootState) => state.shipping.searchCity;
export const selectSearchStreet = (state: RootState) => state.shipping.searchStreet;

export const selectUserAddressesIsLoading = (state: RootState) => state.shipping.isLoading;
export const selectUserAddressesIsError = (state: RootState) => state.shipping.isError;

export const selectIsraelCities = (state: RootState) => state.shipping.israelCities;
export const selectIsraelStreets = (state: RootState) => state.shipping.israelStreets;

export const selectGuestAddresses = (state: RootState) => state.shipping.guestAddress;
export const selectAddressesAmount = (state: RootState) => state.shipping.addressesAmount;

export const selectAddress = (state: RootState) => state.shipping.addresses;
export const selectSingleAddress = (state: RootState) => state.shipping.single_address;


export default shippingSlice.reducer;
