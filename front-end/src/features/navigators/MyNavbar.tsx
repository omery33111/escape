import { Autocomplete, TextField, Theme } from '@mui/material'
import { makeStyles } from "@mui/styles"
import { useEffect } from 'react'
import { Container, Nav, Navbar } from 'react-bootstrap'
import { FaUserSecret } from 'react-icons/fa'
import { RiUserFill } from 'react-icons/ri'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { myServer } from '../../endpoints/endpoints'
import { logoutAsync } from '../authentication/authenticationSlice'
import { searchShoeAsync, selectAllShoes, selectSearchShoe, selectSingleShoeLoading, setShoeSearch } from '../shoe/shoeSlice'



const useStyles = makeStyles((theme: Theme) => ({
  autocompleteRoot: {
    '& .MuiInput-underline:after': {
      borderBottom: '2px solid red',
    },
    '& .MuiInputBase-input': {
      color: 'white', // Change text color to white
    },
  },
}));



const MyNavbar = () => {
  const classes = useStyles(); // Apply the defined styles


  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const shoes = useAppSelector(selectAllShoes);
  const searchShoe = useAppSelector(selectSearchShoe);
  const isLoading = useAppSelector(selectSingleShoeLoading);
  

  const handleSearchInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setShoeSearch(event.target.value));
  };

  useEffect(() => {
    if (searchShoe.trim() !== '') {
      dispatch(searchShoeAsync({ searchQuery: searchShoe }));
    } else {
      dispatch(setShoeSearch(''));
    }
  }, [dispatch, searchShoe]);

  return (
    <div>
        <Navbar bg="dark" data-bs-theme="dark">

            <Container>

            <Nav>

            <Navbar.Brand href = "/">Navbar</Navbar.Brand>

            </Nav>

            <div style={{ width: '30%', direction: "rtl" }}>
            
            <Autocomplete
          className={classes.autocompleteRoot}
          freeSolo
          options={shoes.map((shoe) => ({
            id: shoe.id,
            name: shoe.name,
            image: shoe.images[0],
          }))}
          getOptionLabel={(shoe: any) => shoe.name}
          renderOption={(props, shoe) => (
            <li {...props}>
              <div
                style={{ display: 'flex', direction: 'rtl', alignItems: "center"}}
                onClick={() => navigate(`/brand/shoe/${shoe.id}/`)}
              >
                <img
                style = {{transform: "scaleX(-1)"}}
                  src={`${myServer}/static/images/${shoe.image}`}
                  width="20%"
                  height="auto"
                />
                <p style = {{position: "relative", marginTop: "20px", alignItems: "flex-end", marginRight: "10px"}}>{shoe.name}</p>
              </div>
            </li>
          )}
          renderInput={(params) => (
            <TextField
              placeholder="חיפוש..."
              variant="standard"
              {...params}
              onChange={handleSearchInputChange}
              value={searchShoe}
              InputLabelProps={{ style: { color: 'white' } }}
            />
          )}
        />

            </div>
            

            <Nav style = {{gap: "30px"}}>
            
            
            <Nav.Link href = "/shoes">Shoes</Nav.Link>
            
            <Nav.Link href = "/cart">Cart</Nav.Link>

            <Nav.Link onClick = {() => dispatch(logoutAsync())}>Logout</Nav.Link>

            <Nav.Link href = "/authentication/login">
                Login
              </Nav.Link>

            <Nav.Link href = "/administrator/menu">
                <h3 style = {{color: "white"}}>
                  <FaUserSecret />
                </h3>
              </Nav.Link>

              <Nav.Link href = "/profile">
                <h3 style = {{color: "white"}}>
                <RiUserFill />
                </h3>
              </Nav.Link>

            </Nav>

        
            </Container>

        </Navbar>


    </div>
  )
}

export default MyNavbar
