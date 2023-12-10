import { Outlet } from 'react-router-dom';
import MyNavbar from './features/navigators/MyNavbar';
import MyFooter from './features/navigators/MyFooter';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect } from 'react';
import { initCart } from './features/cart/cartSlice';
import { useAppDispatch } from './app/hooks';
import BrandNavbar from './features/navigators/BrandNavbar';
import { Container } from 'react-bootstrap';



function App() {
  const dispatch = useAppDispatch();
  
  useEffect(() =>{
    dispatch(initCart());
  }, [dispatch])
  
  return (
    <div className="App">

      <ToastContainer />
      <MyNavbar />
      <BrandNavbar />

      <Container className = "special-container">
      <Outlet />
      </Container>

      <MyFooter />

      
      
    </div>
  );
}

export default App;
