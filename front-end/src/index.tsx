import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './app/store';
import App from './App';
import './index.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';
import HomePage from './features/base/HomePage';
import Cart from './features/cart/Cart';
import Orders from './features/order/Orders';
import Login from './features/authentication/Login';
import Shoes from './features/shoe/Shoes';
import AdminMenu from './features/administrator/AdminMenu';
import ShoesPanel from './features/administrator/ShoesPanel';
import BrandPanel from './features/administrator/BrandPanel';
import BrandPost from './features/administrator/BrandPost';
import ShoePost from './features/administrator/ShoePost';
import BrandPut from './features/administrator/BrandPut';
import ShoePut from './features/administrator/ShoePut';
import BrandShoes from './features/brand/BrandShoes';
import Register from './features/authentication/Register';
import Profile from './features/profile/Profile';
import ShoePage from './features/shoe/ShoePage';
import Shoe from './features/shoe/Shoe';



const container = document.getElementById('root')!;
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <Provider store={store}>

<BrowserRouter>

  <Routes>

      <Route path = "/" element={<App />}>

      <Route path = "/" element={<HomePage />} />

      <Route path = "/profile" element={<Profile />} />

      <Route path = "/authentication/login" element={<Login />} />
      <Route path = "/authentication/register" element={<Register />} />


      <Route path = "/administrator/menu" element={<AdminMenu />} />
      <Route path = "/administrator/shoes" element={<ShoesPanel />} />
      <Route path = "/administrator/post_shoe" element={<ShoePost />} />
      <Route path = "/administrator/put_shoe">
        <Route index element = {<ShoePut />} />
        <Route path = ":id" element = {<ShoePut />} />
      </Route>
      
      <Route path = "/administrator/brands" element={<BrandPanel />} />
      <Route path = "/administrator/post_brand" element={<BrandPost />} />
      <Route path = "/administrator/put_brand">
        <Route index element = {<BrandPut />} />
        <Route path = ":id" element = {<BrandPut />} />
      </Route>

      <Route path = "/shoes" element={<Shoes />} />

      <Route path = "/brand/shoes">
        <Route index element = {<BrandShoes />} />
        <Route path = ":id" element = {<BrandShoes />} />
      </Route>

      <Route path = "/brand/shoepage">
        <Route index element = {<Shoe />} />
        <Route path = ":id" element = {<Shoe />} />
      </Route>

      <Route path = "/brand/shoe">
        <Route index element = {<ShoePage />} />
        <Route path = ":id" element = {<ShoePage />} />
      </Route>


      <Route path = "/cart" element={<Cart />} />

      <Route path = "/order/order_post" element={<Orders />} />

      </Route>

      {/* <Route path="/*" element={<ErrorPage />} /> */}

      </Routes>

</BrowserRouter>

</Provider>
  </React.StrictMode>
);