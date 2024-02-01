import { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import { Outlet, useLocation, useParams } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { initCart } from './features/cart/cartSlice';
import BrandNavbar from './features/navigators/BrandNavbar';
import MyFooter from './features/navigators/MyFooter';
import MyNavbar from './features/navigators/MyNavbar';
import { initwishList } from './features/wishlist/wishListSlice';
import './index.css';
import { logoutAsync } from './features/authentication/authenticationSlice';
import { getSingleBrandAsync, selectSingleBrand } from './features/brand/brandSlice';
import { getSingleShoeAsync, selectSingleShoe } from './features/shoe/shoeSlice';
import { isUserStaffAsync, selectIsUserStaff } from './features/administrator/administratorSlice';


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
      
      // Calculate the time difference in milliseconds
      const timeDifference = clickTime.getTime() - submitTime.getTime();
      
      // Convert 24 hours to milliseconds
      const twentyFourHoursInMillis = 24 * 60 * 60 * 1000;
  
      if (timeDifference > twentyFourHoursInMillis) {
        handleLogout();
      }
    }
  }, [lastClickTime]);

  const { pathname } = useLocation();
  const isHomepage = pathname === '/';

  const { id } = useParams();

  useEffect(() => {
    if (pathname.startsWith('/brand/shoes/') && id !== undefined) {
      dispatch(getSingleBrandAsync(id));
    }

    if (pathname.startsWith('/brand/single_shoe/') && id !== undefined) {
      dispatch(getSingleShoeAsync(id));
    }
  }, [id]);


  const singleBrand = useAppSelector(selectSingleBrand);

  const singleShoe = useAppSelector(selectSingleShoe);

  useEffect(() => {
    let title = 'Escape Shoes';

    switch (pathname) {
      case '/':
        title = 'Escape Shoes - מותגי נעליים';
        break;
      case '/wishlist':
        title = 'Escape Shoes - הרשימה שלי';
        break;
      case '/cart':
        title = 'Escape Shoes - העגלה שלי';
        break;
      case '/profile':
        title = 'Escape Shoes - החשבון שלי';
        break;
      case '/profile/orders':
        title = 'Escape Shoes - ההזמנות שלי';
        break;

      default:
        title = 'Escape Shoes - מותגי נעליים';
        break;
    }

    if (pathname.startsWith('/brand/shoes/') && singleBrand.name) {
      title = `Escape Shoes - ${singleBrand.name}`;
    }

    else if (pathname.startsWith('/brand/single_shoe/') && singleShoe.name) {
      title = `Escape Shoes - ${singleShoe.name}`;
    }

    document.title = title;
  }, [pathname, singleBrand.name, singleShoe.name]);


  const isUserStaff = useAppSelector(selectIsUserStaff);

  useEffect(() => {
    if (pathname.startsWith('/administrator')) {
      dispatch(isUserStaffAsync())

      if (isUserStaff === false)
      {
        dispatch(logoutAsync())
      }
    }
  }, [isUserStaff]);
  
  return (
    <div className="App">
      <ToastContainer />
      <MyNavbar />
      <BrandNavbar />

      {isHomepage ? (
        <>
          <ScrollToTop />
          <Outlet />
        </>
      ) : (
        <Container className="special-container">
          <ScrollToTop />
          <Outlet />
        </Container>
      )}

      {isHomepage && <MyFooter />}
      {!isHomepage && <MyFooter />}
    </div>
  );
}

export default App;
