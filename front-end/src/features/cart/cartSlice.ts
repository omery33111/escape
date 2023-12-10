import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { CartState } from '../../models/Cart';



const initialState: CartState = {
  cart: [],
};



// export const displayCartAsync = createAsyncThunk(
//   "cart/getPagedProducts",
//   async (page: number) => {
//     const response = await getPagedProducts(page);
//     return response;
//   }
// );



export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    initCart: (state) =>
    {
      const temp = JSON.parse(localStorage.getItem("cart") as string)
      if (temp)
      {
        state.cart = temp
      }
    },

    addProduct: (state, action) =>
    {
      const item = action.payload.item
      const amount = action.payload.amount

      let existingProductInCart = state.cart.find(({id}) => id === item.id)

      if (existingProductInCart)
      {
        existingProductInCart.amount = existingProductInCart.amount + amount
      }
      else
      {
        state.cart.push({id: item.id,
                        category: item.category,
                        product_name: item.product_name,
                        description: item.description,
                        price: item.price,
                        picture: item.picture, amount: 1})
      }
      localStorage.setItem("cart", JSON.stringify(state.cart))
    },
    
    deleteProduct: (state, action) => {
      const item = action.payload.item
      const amount = action.payload.amount
    
      let existingProductInCart = state.cart.find(({id}) => id === item.id)
    
      if (existingProductInCart) {
        existingProductInCart.amount = existingProductInCart.amount - amount
        if (existingProductInCart.amount < 1) {
          state.cart = state.cart.filter(({id}) => id !== item.id)
        }
      }
      
      localStorage.setItem("cart", JSON.stringify(state.cart))
    },

    removeProduct: (state, action) => {
      const item = action.payload.item
      
      state.cart = state.cart.filter(({id}) => id !== item.id)
      
      localStorage.setItem("cart", JSON.stringify(state.cart))
    }
  },
  // extraReducers: (builder) => {
  //   builder
  //     .addCase(displayCartAsync.fulfilled, (state, action) =>
  //     {
  //       state.cart = action.payload
  //     });
  // },
});




export const { initCart, addProduct, deleteProduct, removeProduct } = cartSlice.actions; 
export const selectCart = (state: RootState) => state.shop.cart;





export default cartSlice.reducer;