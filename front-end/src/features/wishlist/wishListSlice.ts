import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { WishListState } from '../../models/WishList';



const initialState: WishListState = {
    wishList: [],
};



export const wishListSlice = createSlice({
  name: 'wishlist',
  initialState,
  reducers: {
    initwishList: (state) =>
    {
      const temp = JSON.parse(localStorage.getItem("wishList") as string)
      if (temp)
      {
        state.wishList = temp
      }
    },

    addWish: (state, action) =>
    {
      const item = action.payload.item

      let existingProductInWishList = state.wishList.find(({id}) => id === item.id)

      if (existingProductInWishList)
      {
        existingProductInWishList = action.payload.item
      }
      else
      {
        state.wishList.push({id: item.id,
                        category: item.category,
                        product_name: item.product_name,
                        description: item.description,
                        price: item.price,
                        picture: item.picture})
      }
      localStorage.setItem("wishList", JSON.stringify(state.wishList))
    },


    removeWish: (state, action) => {
      const item = action.payload.item
      
      state.wishList = state.wishList.filter(({id}) => id !== item.id)
      
      localStorage.setItem("wishList", JSON.stringify(state.wishList))
    }
  },
  extraReducers: (builder) => {
    // builder
      // .addCase(displaywishListAsync.fulfilled, (state, action) =>
      // {
      //   state.shop.wishList = action.payload
      // });
  },
});




export const { initwishList, addWish, removeWish } = wishListSlice.actions; 
export const selectWishList = (state: RootState) => state.wishlist.wishList;






export default wishListSlice.reducer;