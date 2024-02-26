import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings'
import FavoriteOutlinedIcon from '@mui/icons-material/FavoriteOutlined'
import LocalMallIcon from '@mui/icons-material/LocalMall'
import PersonAddIcon from '@mui/icons-material/PersonAdd'
import { useEffect, useState } from 'react'
import { Container, Nav, Navbar } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { selectCart } from '../cart/cartSlice'
import { getAddressesAsync, initGuestAddresses, selectAddress } from '../shipping/shippingSlice'
import { selectWishList } from '../wishlist/wishListSlice'
import HamburgerMenu from './HamburgerMenu'
import { getProfileAsync, selectMyProfile } from '../profile/profileSlice'
import { Link } from "react-router-dom";



const MyNavbar = () => {


  const dispatch = useAppDispatch();
  const navigate = useNavigate();


  const cart = useAppSelector(selectCart);
  const wishList = useAppSelector(selectWishList);

  const isToken = JSON.parse(localStorage.getItem('token') as string);

  const isStaff = JSON.parse(localStorage.getItem('is_staff') as string);

  const isMobile = window.innerWidth <= 768;
  const isSmallMobile = window.innerWidth <= 375;

  const [showOffcanvas, setShowOffcanvas] = useState(false);

  const handleOffcanvasClose = () => setShowOffcanvas(false);
  
  const handleOffcanvasShow = () => setShowOffcanvas(true);

  const isTablet = window.innerWidth >= 0 && window.innerWidth <= 1024;

  const storedIsLogged = JSON.parse(localStorage.getItem('token') as string);
  
  const address = useAppSelector(selectAddress);

  useEffect(() => {

    if (storedIsLogged)
    {
      dispatch(getAddressesAsync());
    }

    else
    {
      dispatch(initGuestAddresses());
    }
    
    }, [dispatch]);

  const localGuestAddress = JSON.parse(localStorage.getItem('addresses') as string);

  const profile = useAppSelector(selectMyProfile)

  useEffect(() => {
    if (storedIsLogged)
    {
      dispatch(getProfileAsync());
    }
    }, [dispatch]);

  return (
    <div>
        <Navbar style={{ backgroundColor: "white", overflowX: "hidden" }}>

            <Container>

              <Nav style = {{gap: isTablet ? "0px" : "30px"}}>

                
                  <Nav.Link as={Link} to = "/cart">

                  {cart.length > 0 && (
                    <span className="counter">{cart.length}</span>
                  )}
                  <LocalMallIcon style = {{color: "black"}}/>
    
                  </Nav.Link>
                
              
              
              

                {isTablet ? ("") : (
              <Nav.Link as={Link} to = "/wishlist">

              {wishList.length > 0 && (
                <span className="counter">{wishList.length}</span>
              )}
                <FavoriteOutlinedIcon style = {{color: "black"}}/>

              </Nav.Link>)}
                

              </Nav>
              

            
            
            <Navbar.Brand as={Link} to = "/" style = {{justifyContent: "center", textAlign: "center", position: "relative", right: "-5px", top: "1px"}}>
              
            <img src={require('../../images/Escapelogo.png')} alt = "instagramlogo"
                 width = {isSmallMobile ? 150 : 250}
                 height = {isSmallMobile ? 29 : 45} />
            </Navbar.Brand>

            <Nav style = {{gap: isMobile ? "0px" : "30px"}}>

              

              {localGuestAddress && (
                <>
                {isStaff ? ("") : (
                                                <div>
                                                {localGuestAddress.map((address: any) =>
                                                <div style = {{position: "absolute", direction: "rtl", transform: "translateY(0.71rem) translateX(-1.5rem)"}}>
                                                 שלום, {address.first_name}
                                                </div>)}
                                             </div>
                )}

                </>
              )}
              
              {address && (
                <>
                {isStaff ? ("") : (
                                                <div>
                                                {address.map((address: any) =>
                                                <div style = {{position: "absolute", direction: "rtl", transform: "translateY(0.71rem) translateX(-1.5rem)"}}>
                                                 שלום, {address.first_name}
                                                </div>)}
                                             </div>
                )}

                </>
              )}
            
            
                      <div>
                        {!isTablet && isStaff && (
                          <Nav.Link as={Link} to = "/administrator/menu">
                            <AdminPanelSettingsIcon style = {{color: "black"}}/>
                          </Nav.Link>
                        )}
                        </div>


            
                {isTablet ? (
                  <div onClick={handleOffcanvasShow}>
                    <HamburgerMenu />
                  </div>
                ) : (
                  <div>
                    {isToken ? (
                <Nav.Link as={Link} to = "/profile">
                  <AccountCircleIcon style = {{color: "black"}}/>
                </Nav.Link>
                ) : (
                <Nav.Link as={Link} to = "/authentication/login">
                  <PersonAddIcon style = {{color: "black"}}/>
                </Nav.Link>
                )}
                  </div>
                )}
            

            </Nav>

        
            </Container>

        </Navbar>
       


    </div>
  )
}

export default MyNavbar
