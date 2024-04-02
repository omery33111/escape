import SearchIcon from '@mui/icons-material/Search';
import { Autocomplete, TextField, Theme } from '@mui/material';
import { makeStyles } from "@mui/styles";
import React, { useEffect, useRef, useState } from "react";
import { Container, Dropdown, Nav, Navbar } from "react-bootstrap";
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { myServer } from "../../endpoints/endpoints";
import { getAllBrandsAsync, getPagedShoesOfBrandAsync, selectAllBrands, selectBrandsLoading } from "../brand/brandSlice";
import { searchShoeAsync, selectAllShoes, selectSearchShoe, selectSingleShoeLoading, setShoeSearch } from "../shoe/shoeSlice";
import { selectWishList } from '../wishlist/wishListSlice';
import './navigators.css';



const useStyles = makeStyles((theme: Theme) => ({
  autocompleteRoot: {
    '& .MuiInput-underline:after': {
      borderBottom: '2px solid #663399',
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
    }, 400);
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
  }, 400);
  
    navigate(`/brand/shoes/${brandId}/`);
  };

  const shoes = useAppSelector(selectAllShoes);

  const searchShoe = useAppSelector(selectSearchShoe);
  const isLoading = useAppSelector(selectBrandsLoading);

  const isSearchLoading = useAppSelector(selectSingleShoeLoading);
  

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
      setNavbarHeight(height);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const wishList = useAppSelector(selectWishList);

  const isMobile = window.innerWidth <= 768;
  const isTablet = window.innerWidth >= 0 && window.innerWidth <= 1024;

  const [scrollPosition, setScrollPosition] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);


  const brandsToShow = isMobile ? 3 : 13;

  const [visibleBrands, setVisibleBrands] = useState(brands.slice(0, brandsToShow));

  const [startIndex, setStartIndex] = useState(isMobile ? 6 : 0);

  const scrollLeft = () => {
    if (startIndex > 0) {
      setStartIndex(startIndex - 1);
      const updatedVisibleBrands = brands.slice(startIndex - 1, startIndex + (brandsToShow - 1));
      setVisibleBrands(updatedVisibleBrands);
    }
  };

  const scrollRight = () => {
    if (startIndex + brandsToShow < brands.length) {
      setStartIndex(startIndex + 1);
      const updatedVisibleBrands = brands.slice(startIndex + 1, startIndex + brandsToShow + 1);
      setVisibleBrands(updatedVisibleBrands);
    }
  };

  const showLeftScroll = startIndex > 0;
  const showRightScroll = startIndex + brandsToShow < brands.length;
  

  return (
    <div>
      <div ref={navbarRef}>
      <Navbar data-bs-theme="dark" style={{ backgroundColor: "black", padding: '15px 0', width: "100%", position: isNavbarFixed ? "fixed" : "relative", top: isNavbarFixed ? 0 : "unset", zIndex: 1000}} >

      {showLeftScroll && isTablet && (
          <IoIosArrowBack className="brand-arrow1" onClick={scrollLeft} />
        )}
        
        <Container>

        
          <Nav style = {{justifyContent: "center", textAlign: "center", position: "relative", gap: isMobile ? "0px" : "15px", left: showAutocomplete ? "10px" : "10px", transform: isNavbarFixed ? `${isTablet ? "translateX(-1rem)" : "translateX(-0rem)"}` : "translateX(0px)" }}>

          {isTablet ? (
            
            <>

                  {isLoading ? (
                                          <div style = {{display: "flex", justifyContent: "center", alignItems: "center"}}>
                                          <div className="loader" style = {{width: "40px"}}/>
                                        </div>
                  ) : (
                    <>
               {brands.slice(startIndex, startIndex + brandsToShow).map((brand) => (
                <Dropdown
                  key={brand.id}
                  show={selectedBrand === brand.id}
                  onMouseEnter={() => handleDropdownEnter(brand.id)}
                  onMouseLeave={handleDropdownLeave}
                >

                  <Dropdown.Toggle as={Nav.Link} style={{ color: "black" }}>
                  <Link to={`/brand/shoes/${brand.id}/`} onClick={() => setPage(1)} style={{ textDecoration: 'none', color: 'white' }}>
                <b style={{ fontSize: isMobile ? "0.7rem" : "0.9rem" }}>{brand.name}</b>
                    </Link>
                  </Dropdown.Toggle>
                  <Dropdown.Menu style={{ backgroundColor: 'white', border: "1px solid black" }}>
      <Dropdown.Item style = {{textAlign: "right"}}
        onMouseEnter={() => handleItemHover(-1)}
        onClick={() => { setPage(1); window.location.href = (`/brand/shoes/${brand.id}/`)}}
      >
        כל המוצרים
      </Dropdown.Item>
      {brand.models.length > 1 ? (
        <>
              {brand.models.map((model, index) => (
        <Dropdown.Item
        style = {{textAlign: "right"}}
          key={index}
          onMouseEnter={() => handleItemHover(index)}
          onClick={() => handleDropdownClick(brand.id, model)}>
          {model}
        </Dropdown.Item>
      ))}
        </>
      ) : ("")}

    </Dropdown.Menu>
                </Dropdown>
              ))}
                    </>
                  )}

          </>

          ) : (
            
            
            <>
            
                  {isLoading ? (
                                          <div style = {{display: "flex", justifyContent: "center", alignItems: "center"}}>
                                          <div className="loader" style = {{width: "40px"}}/>
                                        </div>
                  ) : (
                    <>
                  
                  <div style = {{display: "flex", transform: "translateX(-15rem)", gap: "15px"}}>
                    {showLeftScroll && (<IoIosArrowBack className="brand-arrow1-gen" onClick={scrollLeft} />)}

               {brands.slice(startIndex, startIndex + brandsToShow).map((brand) => (
            <Dropdown
  key={brand.id}
  show={selectedBrand === brand.id}
  onMouseEnter={() => handleDropdownEnter(brand.id)}
  onMouseLeave={handleDropdownLeave}
>
  <Dropdown.Toggle as={Nav.Link} style={{ color: "black" }}>
    <Link to={`/brand/shoes/${brand.id}/`} style={{ textDecoration: 'none', color: 'white' }}>
      <b style={{ fontSize: "0.9rem" }}>{brand.name}</b>
    </Link>
  </Dropdown.Toggle>
    <Dropdown.Menu style={{ backgroundColor: 'white', border: "1px solid black" }}>
      <Dropdown.Item style = {{textAlign: "right"}}
        onMouseEnter={() => handleItemHover(-1)}
        onClick={() => window.location.href = (`/brand/shoes/${brand.id}/`)}
      >
        כל המוצרים
      </Dropdown.Item>
      {brand.models.length > 1 ? (
        <>
              {brand.models.map((model, index) => (
        <Dropdown.Item
        style = {{textAlign: "right"}}
          key={index}
          onMouseEnter={() => handleItemHover(index)}
          onClick={() => handleDropdownClick(brand.id, model)}>
          {model}
        </Dropdown.Item>
      ))}
        </>
      ) : ("")}

    </Dropdown.Menu>
</Dropdown>
          ))}
              {showRightScroll && (<IoIosArrowForward className="brand-arrow2-gen" onClick={scrollRight} />)}
              </div>

                    </>
                    )}
            </>

          )}

 
          </Nav>

  
              
          <Nav style = {{gap: "10px", transform: "translateX(-17rem)"}}>

          {isTablet ? ("") : (
              <div style={{ position: "relative", right: "6px", display: "flex", gap: "10px"}}>
                  {showAutocomplete && (
            
            <div style = {{direction: "rtl"}}>
            
            <Autocomplete
            style = {{width: "250px"}}
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

              {isSearchLoading ? (
                <div className="loader" style = {{width: "30px", direction: "rtl"}}/>
              ) : (
                              <div
                              style={{ display: 'flex', direction: 'rtl', alignItems: "center"}}
                              onClick={() => navigate(`/brand/single_shoe/${shoe.id}/`)}>
                              <img
                              style = {{transform: "scaleX(-1)"}}
                                src={`${myServer}/media/${shoe.image}`}
                                width="30%"
                                height="auto"
                              />
                              <p style = {{position: "relative", marginTop: "20px", alignItems: "flex-end", marginRight: "10px"}}>
                                {shoe.name}
                                </p>
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
          )}

          <SearchIcon style = {{position: "relative", top: showAutocomplete ? "4px" : "0px", right: "0px", color: "white", cursor: "pointer", transform: showAutocomplete ? "translateX(0rem)" : "translateX(5rem)"}} onClick = {handleSearchIconClick}/>
        
              </div>
            )}


          </Nav>

        </Container>

        {showRightScroll && isTablet && (
          <IoIosArrowForward className="brand-arrow2" onClick={scrollRight} />
        )}
        
        </Navbar>
        {isNavbarFixed && <div style={{ height: navbarHeight }} />}

      </div>
    </div>
  )
}

export default BrandNavbar;
