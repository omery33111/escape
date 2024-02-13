import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { CartState } from '../../models/Cart';
import CryptoJS from 'crypto-js';

const initialState: CartState = {
  cart: [],
};

// Encryption key
const SECRET_KEY = 'your_secret_key'; // Replace 'your_secret_key' with your actual secret key

// Function to encrypt data
const encryptData = (data: any) => {
  return CryptoJS.AES.encrypt(JSON.stringify(data), SECRET_KEY).toString();
};

// Function to decrypt data
const decryptData = (encryptedData: string) => {
  const bytes = CryptoJS.AES.decrypt(encryptedData, SECRET_KEY);
  return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    initCart: (state) => {
      const encryptedCart = localStorage.getItem('cart');
      if (encryptedCart) {
        try {
          const decryptedCart = decryptData(encryptedCart);
          if (decryptedCart && Array.isArray(decryptedCart)) {
            state.cart = decryptedCart;
          } else {
            console.error('Invalid cart data:', decryptedCart);
          }
        } catch (error) {
          console.error('Error decrypting cart data:', error);
        }
      }
    },
    addProduct: (state, action) => {
      const { item, selectedSize, amount = 1 } = action.payload;
      const existingProductInCart = state.cart.find(({ id }) => id === item.id);
      if (existingProductInCart) {
        existingProductInCart.amount += amount;
      } else {
        const productToAdd = {
          id: item.id,
          name: item.name,
          price: item.price,
          price_before: item.price_before,
          size: selectedSize,
          images: item.images,
          amount: amount,
        };
        state.cart.push(productToAdd);
      }
      localStorage.setItem('cart', encryptData(state.cart));
    },
    deleteProduct: (state, action) => {
      const { item, amount } = action.payload;
      let existingProductInCart = state.cart.find(({ id }) => id === item.id);
      if (existingProductInCart) {
        existingProductInCart.amount -= amount;
        if (existingProductInCart.amount <= 0) {
          state.cart = state.cart.filter(({ id }) => id !== item.id);
        }
      }
      localStorage.setItem('cart', encryptData(state.cart));
    },
    removeProduct: (state, action) => {
      const { item } = action.payload;
      state.cart = state.cart.filter(({ id }) => id !== item.id);
      localStorage.setItem('cart', encryptData(state.cart));
    },
  },
});

export const { initCart, addProduct, deleteProduct, removeProduct } = cartSlice.actions;
export const selectCart = (state: RootState) => state.shop.cart;

export default cartSlice.reducer;
