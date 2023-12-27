import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined'
import FavoriteOutlinedIcon from '@mui/icons-material/FavoriteOutlined'
import LocalMallIcon from '@mui/icons-material/LocalMall'
import PersonAddIcon from '@mui/icons-material/PersonAdd'
import { Container, Nav, Navbar } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { selectCart } from '../cart/cartSlice'
import { selectWishList } from '../wishlist/wishListSlice'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';



const MyNavbar = () => {


  const dispatch = useAppDispatch();
  const navigate = useNavigate();


  const cart = useAppSelector(selectCart);
  const wishList = useAppSelector(selectWishList);

  const isToken = JSON.parse(localStorage.getItem('token') as string);

  return (
    <div>
        <Navbar style={{ backgroundColor: "white" }}>

            <Container>

              <Nav style = {{gap: "30px"}}>
              
              <Nav.Link href = "/cart">

              {cart.length > 0 && (
                <span className="counter">{cart.length}</span>
              )}
              <LocalMallIcon style = {{color: "black"}}/>

              </Nav.Link>
              


              <Nav.Link href = "/wishlist">

              {wishList.length > 0 && (
                <span className="counter">{wishList.length}</span>
              )}
                <FavoriteOutlinedIcon style = {{color: "black"}}/>

              </Nav.Link>
                

              </Nav>
              

            
            
            <Navbar.Brand href = "/" style = {{justifyContent: "center", textAlign: "center", position: "relative", right: "30px", top: "1px"}}>
            <img src={require('../../images/Escapelogo.png')} alt = "instagramlogo"
                 width = "250"
                 height = "45" />
            </Navbar.Brand>

            <Nav>
            


            {isToken ? (
                <Nav.Link href = "/profile">
                  <AccountCircleIcon style = {{color: "black"}}/>
                </Nav.Link>
                ) : (
                <Nav.Link href = "/authentication/login">
                  <PersonAddIcon style = {{color: "black"}}/>
                </Nav.Link>
                )}


{/*             
            <Nav.Link href = "/administrator/menu">
                <h3 style = {{color: "black"}}>
                  <FaUserSecret />
                </h3>
              </Nav.Link> */}


            </Nav>

        
            </Container>

        </Navbar>


    </div>
  )
}

export default MyNavbar
