import { useEffect, useState } from 'react';
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
import './index.css';
import { logoutAsync } from './features/authentication/authenticationSlice';

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function App() {
  const dispatch = useAppDispatch();

  const [lastClickTime, setLastClickTime] = useState<string>('');

  useEffect(() => {
    dispatch(initCart());
    dispatch(initwishList());

    const handleMouseClick = () => {
      const clickTime = new Date().toISOString();
      localStorage.setItem('lastClickTime', clickTime);
      setLastClickTime(clickTime);
    };

    window.addEventListener('click', handleMouseClick);

    return () => {
      window.removeEventListener('click', handleMouseClick);
    };
  }, [dispatch]);

  useEffect(() => {
    const storedLastClickTime = localStorage.getItem('lastClickTime');
    if (storedLastClickTime) {
      setLastClickTime(storedLastClickTime);
    }
  }, []);

  const handleLogout = () => {
    dispatch(logoutAsync());
  };

  useEffect(() => {
    const storedloginTime = localStorage.getItem('loginTime');
    if (storedloginTime && lastClickTime) {
      const submitTime = new Date(storedloginTime);
      const clickTime = new Date(lastClickTime);
      const timeDifference = clickTime.getTime() - submitTime.getTime();
      const timeDifferenceInMinutes = timeDifference / (1000 * 60 * 60 * 24);

      if (timeDifferenceInMinutes > 1440) {
        handleLogout();
      }
    }
  }, [lastClickTime]);

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
