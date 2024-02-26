import React, { useEffect, useState } from 'react'
import { Nav, Navbar, Offcanvas } from 'react-bootstrap'
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import PersonAddIcon from '@mui/icons-material/PersonAdd'
import LocalMallIcon from '@mui/icons-material/LocalMall'
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { selectCart } from '../cart/cartSlice';
import FavoriteOutlinedIcon from '@mui/icons-material/FavoriteOutlined'
import { selectWishList } from '../wishlist/wishListSlice';
import { Autocomplete, TextField, Theme } from '@mui/material';
import { makeStyles } from "@mui/styles";
import { searchShoeAsync, selectAllShoes, selectSearchLoading, selectSearchShoe, selectSingleShoeLoading, setShoeSearch } from '../shoe/shoeSlice';
import { Link, useNavigate } from 'react-router-dom';
import { myServer } from '../../endpoints/endpoints';
import SearchIcon from '@mui/icons-material/Search';
import { getAllBrandsAsync, getPagedShoesOfBrandAsync, selectAllBrands } from '../brand/brandSlice';
import ListGroup from 'react-bootstrap/ListGroup';
import HamburgerIcon from 'hamburger-react';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import { getProfileAsync, selectMyProfile } from '../profile/profileSlice';



const useStyles = makeStyles((theme: Theme) => ({
    autocompleteRoot: {
      '& .MuiInput-underline:after': {
        borderBottom: '2px solid #663399',
      },
      '& .MuiInputBase-input': {
        color: 'black',
      },
      '& .MuiAutocomplete-clearIndicator': {
        color: 'black',
      },
    },
  }));



const Hamburger = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const classes = useStyles();

    const [showOffcanvas, setShowOffcanvas] = useState(false);
    const [isHamburgerActive, setIsHamburgerActive] = useState(true);
    const [hoveredItem, setHoveredItem] = useState(null);

    const isSearchLoading = useAppSelector(selectSearchLoading);

    const handleOffcanvasClose = () => {
      setShowOffcanvas(false);
      setIsHamburgerActive(true); // Reset to Hamburger icon when offcanvas is closed
    };
  
    const handleOffcanvasShow = () => {

      setTimeout(() => {
        setShowOffcanvas(true);
      }, 100);
      
      setIsHamburgerActive(false); // Switch to X icon when offcanvas is shown
    };

    const isToken = JSON.parse(localStorage.getItem('token') as string);

    const cart = useAppSelector(selectCart);
    const wishList = useAppSelector(selectWishList);
    const searchShoe = useAppSelector(selectSearchShoe);
    const shoes = useAppSelector(selectAllShoes);

    const [selectedBrand, setSelectedBrand] = useState(null);


    useEffect(() => {
        if (searchShoe.trim() !== '') {
          dispatch(searchShoeAsync({ searchQuery: searchShoe }));
        } else {
          dispatch(setShoeSearch(''));
        }
      }, [dispatch, searchShoe]);

    
  const handleSearchInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setShoeSearch(event.target.value));
  };

  const brands = useAppSelector(selectAllBrands);

  useEffect(() => {
    dispatch(getAllBrandsAsync());
  }, [dispatch]);

  
  const handleItemHover = (index: any) => {
    setHoveredItem(index);
  };

  const [page, setPage] = useState(1);
  const [orderBy, setOrderBy] = useState(1);

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

  const isStaff = JSON.parse(localStorage.getItem('is_staff') as string);
  
  const localGuestAddress = JSON.parse(localStorage.getItem('addresses') as string);

  const profile = useAppSelector(selectMyProfile)

  const storedIsLogged = JSON.parse(localStorage.getItem('token') as string);

  useEffect(() => {
    if (storedIsLogged)
    {
      dispatch(getProfileAsync());
    }
    }, [dispatch]);

    const isMobile = window.innerWidth <= 768;

    
  return (
    <div>
        <div onClick={showOffcanvas ? handleOffcanvasClose : handleOffcanvasShow} style={{ position: 'relative', top: '2px' }}>
        <HamburgerIcon direction="left" size={20} toggled={!isHamburgerActive} />
      </div>

        <Offcanvas show={showOffcanvas} onHide={handleOffcanvasClose} placement="end" style = {{direction: "rtl", width: "80%"}}>
        <Offcanvas.Header style={{ justifyContent: "center", textAlign: "center" }} closeButton>
        <Navbar.Brand as={Link} to = "/" style = {{position: "relative"}}>
            <img src={require('../../images/Escapelogo.png')} alt = "instagramlogo"
                 width = "250"
                 height = "45" /><br/>

{storedIsLogged && (
                <>
                {profile.activated == false && (
                    
                    <>
                  {isMobile && (
                                    <b style = {{direction: "rtl", fontSize: "0.8rem", color: "red"}}>
                                    נדרש אישור אימות במייל
                                    </b>
                  )}
                  </>

                  )}
                </>
              )}

            </Navbar.Brand>
        </Offcanvas.Header><br/>
        <Offcanvas.Header style = {{justifyContent: "space-evenly", textAlign: "center", display: "flex", transform: "translateY(-1.5rem)"}}>
            
      <>
              {isStaff && (
                 <Nav.Link as={Link} to = "/administrator/menu">
                    <AdminPanelSettingsIcon style = {{color: "black", fontSize: "2.3rem"}}/>
                  </Nav.Link>
                  )}
      </>

            <div>
            <Nav.Link as={Link} to = "/profile">
                  
            {isToken ? (
                <Nav.Link as={Link} to = "/profile">
                  <AccountCircleIcon style = {{color: "black", fontSize: "2.3rem"}}/>
                </Nav.Link>
                ) : (
                <Nav.Link as={Link} to = "/authentication/login">
                  <PersonAddIcon style = {{color: "black", fontSize: "2.3rem"}}/>
                </Nav.Link>
                )}

            </Nav.Link>
            </div>

            <div>
                
            <Nav.Link as={Link} to = "/cart">

                {cart.length > 0 && (
                <span className="counter-offcanva">{cart.length}</span>
                )}
                <LocalMallIcon style = {{color: "black", fontSize: "2.2rem"}}/>

            </Nav.Link>             
            </div>

            <div>
            <Nav.Link as={Link} to = "/wishlist">

                {wishList.length > 0 && (
                <span className="counter-offcanva">{wishList.length}</span>
                )}
                <FavoriteOutlinedIcon style = {{color: "black", fontSize: "2.2rem"}}/>

            </Nav.Link>
            </div>
                    
        </Offcanvas.Header>
        <hr className="customHr" />
        <Offcanvas.Title style = {{justifyContent: "center", textAlign: "center", transform: 'translateY(-1.9rem)', marginLeft: 'auto', marginRight: 'auto'}}>
                
                          
              <div>

            
            <div style = {{display: "flex"}}>

            <SearchIcon style = {{position: "relative", right: "-0.7rem", bottom: "-0.2rem", color: "black", cursor: "pointer"}}/>

            
            <Autocomplete
            style = {{width: "13rem"}}
          className={classes.autocompleteRoot}
          freeSolo
          options={shoes.map((shoe) => ({
            id: shoe.id,
            name: shoe.name,
            image: shoe.images[0],
          }))}
          getOptionLabel={(shoe: any) => shoe.name}
          renderOption={(props, shoe) => (
            <li {...props} onClick = {handleOffcanvasClose}>

              {isSearchLoading ? (
                <div className="loader" style = {{width: "30px", direction: "rtl"}}/>
              ) : (
                <div
                style={{ display: 'flex', direction: 'rtl', alignItems: "center"}}
                onClick={() => navigate(`/brand/single_shoe/${shoe.id}/`)}
              >
                <img
                style = {{transform: "scaleX(-1)"}}
                  src={`${myServer}/media/${shoe.image}`}
                  width="20%"
                  height="auto"
                />
                <p style = {{position: "relative", marginTop: "20px", alignItems: "flex-end", marginRight: "10px"}}>{shoe.name}</p>
              </div>
              )}


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

 

        
              </div>


            </Offcanvas.Title>
            <hr style = {{transform: "translateY(-1.2rem)"}}/>
            
            <Offcanvas.Title style = {{justifyContent: "center", textAlign: "center", top: -5, position: "relative"}}>
              <b>מותגים</b>
            </Offcanvas.Title>
            
            <Offcanvas.Body>
  {brands.map((brand: any) => (
    <ListGroup key={brand.id} className="borderless">
      <div onClick={() => setSelectedBrand(selectedBrand === brand.id ? null : brand.id)}>
        <ListGroup.Item style={{ borderBottom: '0px solid white', borderRight: '0px solid white', borderLeft: '0px solid white'}}>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <b style={{ margin: 3 }}>{brand.name}</b>
            <>
            {selectedBrand === brand.id ? (
              <KeyboardArrowDownIcon style={{ transform: 'rotate(180deg)', marginLeft: '0px', marginTop: "4px"  }} />
            ) : (
              <KeyboardArrowDownIcon style={{ transform: 'rotate(0deg)', marginLeft: '0px', marginTop: "4px" }} />
            )}
            </>
          </div>
          {selectedBrand === brand.id && (
  <div>
    <ListGroup.Item
      key="all-shoes"
      style={{
        borderBottom: '0px solid white',
        borderRight: '0px solid white',
        borderLeft: '0px solid white',
        borderTop: '0px solid white',
      }}
      onMouseEnter={() => handleItemHover(-1)}
      onClick={() => {
        handleDropdownClick(brand.id, "0");
        handleOffcanvasClose();
        setShowOffcanvas(false);
      }}
    >
      כל הנעליים
    </ListGroup.Item>

    {/* Render other models */}
    {brand.models.map((model: any, index: any) => (
      <ListGroup.Item
        key={index}
        style={{
          borderBottom: '0px solid white',
          borderRight: '0px solid white',
          borderLeft: '0px solid white',
          borderTop: '0px solid white',
        }}
        onMouseEnter={() => handleItemHover(index)}
        onClick={() => {
          handleDropdownClick(brand.id, model);
          handleOffcanvasClose();
          setShowOffcanvas(false);
        }}
      >
        {model}
      </ListGroup.Item>
    ))}
  </div>
)}
        </ListGroup.Item>

      </div>

      
    </ListGroup>
  ))}
</Offcanvas.Body>
        <hr style = {{width: "100%"}}/>
      </Offcanvas>
    </div>
  )
}

export default Hamburger