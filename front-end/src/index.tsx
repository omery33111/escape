import 'bootstrap/dist/css/bootstrap.css';
import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import App from './App';
import { store } from './app/store';
import AdminMenu from './features/administrator/AdminMenu';
import BrandPanel from './features/administrator/BrandPanel';
import BrandPost from './features/administrator/BrandPost';
import BrandPut from './features/administrator/BrandPut';
import ShoePost from './features/administrator/ShoePost';
import ShoePut from './features/administrator/ShoePut';
import ShoesPanel from './features/administrator/ShoesPanel';
import Login from './features/authentication/Login';
import Register from './features/authentication/Register';
import HomePage from './features/base/HomePage';
import BrandShoes from './features/brand/BrandShoes';
import Cart from './features/cart/Cart';
import Profile from './features/profile/Profile';
import Shoe from './features/shoe/Shoe';
import WishList from './features/wishlist/WishList';
import './index.css';
import InstaRecPost from './features/administrator/InstaRecPost';
import InstaRecommendationsPanel from './features/administrator/InstaRecommendationsPanel';
import Order from './features/order/Order';
import UserOrders from './features/order/UserOrders';
import OrderPanel from './features/administrator/OrderPanel';
import RecentOrdersPanel from './features/administrator/RecentOrdersPanel';
import ErrorPage from './features/base/ErrorPage';
import CouponPanel from './features/administrator/CouponPanel';
import CouponPost from './features/administrator/CouponPost';
import CouponPut from './features/administrator/CouponPut';
import ProfileManagerPanel from './features/administrator/ProfileManagerPanel';
import UserOrderPanel from './features/administrator/UserOrderPanel';
import ThanksPage from './features/order/ThanksPage';
import NagishliRedirect from './features/base/NagishliRedirect';



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

      <Route path="/accessibility/nagishli.js" element={<NagishliRedirect />} />
      
      <Route path = "/authentication/login" element={<Login />} />
      <Route path = "/authentication/register" element={<Register />} />


      <Route path = "/administrator/menu" element={<AdminMenu />} />
      <Route path = "/administrator/shoes" element={<ShoesPanel />} />
      <Route path = "/administrator/orders" element={<OrderPanel />} />
      <Route path = "/administrator/user_orders">
        <Route index element = {<UserOrderPanel />} />
        <Route path = ":id" element = {<UserOrderPanel />} />
      </Route>

      <Route path = "/administrator/community" element={<ProfileManagerPanel />} />
      <Route path = "/administrator/orders/recent_orders" element={<RecentOrdersPanel />} />
      <Route path = "/administrator/instagram_recs" element={<InstaRecommendationsPanel />} />
      <Route path = "/administrator/post_instagram_rec" element={<InstaRecPost />} />
      <Route path = "/administrator/post_shoe" element={<ShoePost />} />
      <Route path = "/administrator/put_shoe">
        <Route index element = {<ShoePut />} />
        <Route path = ":id" element = {<ShoePut />} />
      </Route>
      
      <Route path = "/administrator/coupons" element={<CouponPanel />} />
      <Route path = "/administrator/post_coupon" element={<CouponPost />} />
      <Route path = "/administrator/put_coupon">
        <Route index element = {<CouponPut />} />
        <Route path = ":id" element = {<CouponPut />} />
      </Route>

      <Route path = "/administrator/brands" element={<BrandPanel />} />
      <Route path = "/administrator/post_brand" element={<BrandPost />} />
      <Route path = "/administrator/put_brand">
        <Route index element = {<BrandPut />} />
        <Route path = ":id" element = {<BrandPut />} />
      </Route>

      <Route path = "/brand/shoes">
        <Route index element = {<BrandShoes />} />
        <Route path = ":id" element = {<BrandShoes />} />
      </Route>


      <Route path = "/brand/single_shoe">
        <Route index element = {<Shoe />} />
        <Route path = ":id" element = {<Shoe />} />
      </Route>



      <Route path = "/cart" element={<Cart />} />

      <Route path = "/wishlist" element={<WishList />} />

      <Route path = "/order" element={<Order />} />

      <Route path = "/thankspage" element={<ThanksPage />} />

      <Route path = "/profile/orders" element={<UserOrders />} />

      </Route>

      <Route path="/*" element={<ErrorPage />} />

      </Routes>

</BrowserRouter>

</Provider>
  </React.StrictMode>
);