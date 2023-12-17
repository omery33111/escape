import { useEffect } from 'react';
import { Container } from 'react-bootstrap';
import { Outlet, useLocation } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useAppDispatch } from './app/hooks';
import { initCart } from './features/cart/cartSlice';
import BrandNavbar from './features/navigators/BrandNavbar';
import MyFooter from './features/navigators/MyFooter';
import MyNavbar from './features/navigators/MyNavbar';
import { initwishList } from './features/wishlist/wishListSlice';

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(initCart());
    dispatch(initwishList());
  }, [dispatch]);

  return (
    <div className="App">
      <ToastContainer />
      <MyNavbar />
      <BrandNavbar />

      <Container className="special-container">
        <ScrollToTop />
        <Outlet />
      </Container>

      <MyFooter />
    </div>
  );
}

export default App;
