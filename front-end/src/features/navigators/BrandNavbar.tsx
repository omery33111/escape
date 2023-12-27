import SearchIcon from '@mui/icons-material/Search';
import { Autocomplete, TextField, Theme } from '@mui/material';
import { makeStyles } from "@mui/styles";
import React, { useEffect, useRef, useState } from "react";
import { Container, Dropdown, Nav, Navbar } from "react-bootstrap";
import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { myServer } from "../../endpoints/endpoints";
import { getAllBrandsAsync, getPagedShoesOfBrandAsync, selectAllBrands } from "../brand/brandSlice";
import { searchShoeAsync, selectAllShoes, selectSearchShoe, selectSingleShoeLoading, setShoeSearch } from "../shoe/shoeSlice";
import './navigators.css';
import { selectCart } from '../cart/cartSlice';
import { selectWishList } from '../wishlist/wishListSlice';
import LocalMallIcon from '@mui/icons-material/LocalMall'
import FavoriteOutlinedIcon from '@mui/icons-material/FavoriteOutlined'



const useStyles = makeStyles((theme: Theme) => ({
  autocompleteRoot: {
    '& .MuiInput-underline:after': {
      borderBottom: '2px solid red',
    },
    '& .MuiInputBase-input': {
      color: 'white', // Change text color to white
    },
    '& .MuiAutocomplete-clearIndicator': {
      color: 'white', // Clear button color
    },
  },
}));



const BrandNavbar = () => {
  const classes = useStyles();

  const dispatch = useAppDispatch();
  const brands = useAppSelector(selectAllBrands);
  const [selectedBrand, setSelectedBrand] = useState(null);
  const [hoveredItem, setHoveredItem] = useState(null);
  const [page, setPage] = useState(1);
  const [orderBy, setOrderBy] = useState(1);
  let brandTimer: ReturnType<typeof setTimeout>;

  useEffect(() => {
    dispatch(getAllBrandsAsync());
  }, [dispatch]);


  const handleDropdownEnter = (brandId: any) => {
    clearTimeout(brandTimer);
    setSelectedBrand(brandId);
  };

  const handleDropdownLeave = () => {
    brandTimer = setTimeout(() => {
      setSelectedBrand(null);
      setHoveredItem(null);
    }, 300);
  };

  const handleItemHover = (index: any) => {
    setHoveredItem(index);
  };

  const navigate = useNavigate();

  const handleDropdownClick = (brandId: any, selectedModel: string) => {
    const timer = setTimeout(() => {
    dispatch(getPagedShoesOfBrandAsync({
        id: brandId,
        page,
        orderBy,
        models: selectedModel,
      })
    );
  }, 100);
  
    navigate(`/brand/shoes/${brandId}/`);
  };

  const shoes = useAppSelector(selectAllShoes);

  const searchShoe = useAppSelector(selectSearchShoe);
  const isLoading = useAppSelector(selectSingleShoeLoading);
  

  const handleSearchInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setShoeSearch(event.target.value));
  };

  
  const [showAutocomplete, setShowAutocomplete] = useState(false);

  
  const handleSearchIconClick = () => {
    setShowAutocomplete((prevShowAutocomplete) => !prevShowAutocomplete);
  };

  useEffect(() => {
    if (searchShoe.trim() !== '') {
      dispatch(searchShoeAsync({ searchQuery: searchShoe }));
    } else {
      dispatch(setShoeSearch(''));
    }
  }, [dispatch, searchShoe]);


  const navbarRef = useRef<HTMLDivElement>(null);

  const [isNavbarFixed, setIsNavbarFixed] = useState(false);

  const [navbarHeight, setNavbarHeight] = useState(0);

  const handleScroll = () => {
    if (navbarRef.current) {
      const { top, height } = navbarRef.current.getBoundingClientRect();
      setIsNavbarFixed(top <= 0);
      setNavbarHeight(height); // Store the height of the navbar
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const cart = useAppSelector(selectCart);
  const wishList = useAppSelector(selectWishList);

  return (
    <div>
      <div ref={navbarRef}>
      <Navbar data-bs-theme="dark" style={{ backgroundColor: "#1A002E", padding: '15px 0', width: "100%", position: isNavbarFixed ? "fixed" : "relative", top: isNavbarFixed ? 0 : "unset", zIndex: 1000}} >

        
        
        <Container>
          

        <Nav style = {{gap: "30px"}}>
              
        {isNavbarFixed && (
          <>
              <Nav.Link href = "/cart">

              {cart.length > 0 && (
                <span className="counter">{cart.length}</span>
              )}
              <LocalMallIcon style = {{color: "white"}}/>

              </Nav.Link>
              


              <Nav.Link href = "/wishlist">

              {wishList.length > 0 && (
                <span className="counter">{wishList.length}</span>
              )}
                <FavoriteOutlinedIcon style = {{color: "white"}}/>

              </Nav.Link>
              </>
        )}

              </Nav>
           
        
          <Nav style = {{justifyContent: "center", textAlign: "center", position: "relative", gap: "20px", left: showAutocomplete ? "165px" : "10px", transform: isNavbarFixed ? "translateX(-55px)" : "translateX(0px)" }}>
          {brands.map((brand) => (
            <Dropdown
              key={brand.id}
              show={selectedBrand === brand.id}
              onMouseEnter={() => handleDropdownEnter(brand.id)}
              onMouseLeave={handleDropdownLeave}>
              <Dropdown.Toggle as={Nav.Link} style = {{color: "#1A002E"}}>
                
              <Link to={`/brand/shoes/${brand.id}/`} style={{ textDecoration: 'none', color: 'white' }}>
                  <b style = {{fontSize: "0.9rem"}}>{brand.name}</b>
                </Link>
              </Dropdown.Toggle>
              <Dropdown.Menu style={{ backgroundColor: 'white', border: "1px solid black" }}>
                {brand.models.map((model, index) => (
                  <Dropdown.Item
                    key={index}
                    style={{
                      color: hoveredItem === index ? 'white' : 'black',
                    }}
                    onMouseEnter={() =>
                      handleItemHover(index)
                    }
                    onClick={() =>
                      handleDropdownClick(brand.id, model)
                    } // Handle the click on the model here
                  >
                    {model}
                  </Dropdown.Item>
                ))}
              </Dropdown.Menu>
            </Dropdown>
          ))}
          </Nav>




            <Nav style = {{gap: "10px"}}>
          
        
          {showAutocomplete && (
            
            <div style={{ direction: "rtl", position: "relative", right: "6px"}}>
            
            <Autocomplete
            style = {{width: "300px"}}
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
              InputLabelProps={{ style: { color: 'black' } }}
            />
          )}
        />
        </div>

          )}

          <SearchIcon style = {{position: "relative", top: showAutocomplete ? "4px" : "0px", right: "6px", color: "white", cursor: "pointer"}} onClick = {handleSearchIconClick}/>
        
          </Nav>

        </Container>
        
        </Navbar>
        {isNavbarFixed && <div style={{ height: navbarHeight }} />}

      </div>
    </div>
  )
}

export default BrandNavbar;
