import { faFacebook, faWhatsapp } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { Chip, MenuItem, Select, Theme } from '@mui/material';
import { makeStyles } from "@mui/styles";
import { useEffect, useRef, useState } from 'react';
import { Button, Col, Container, Row } from 'react-bootstrap';
import { BiSolidCart, BiSolidCartAdd } from 'react-icons/bi';
import { FaHeart } from 'react-icons/fa';
import { IoIosMail } from 'react-icons/io';
import { useNavigate, useParams } from 'react-router-dom';
import { TransformComponent, TransformWrapper } from 'react-zoom-pan-pinch';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { myServer } from '../../endpoints/endpoints';
import { getSingleBrandAsync, selectSingleBrand } from '../brand/brandSlice';
import { addProduct, removeProduct, selectCart } from '../cart/cartSlice';
import { addWish, removeWish, selectWishList } from '../wishlist/wishListSlice';
import RandomShoes from './RandomShoes';
import './shoe.css';
import { getRandomShoesAsync, getSingleShoeAsync, selectSingleShoe, selectSingleShoeLoading } from './shoeSlice';
import InstaRecommendation from '../instarec/InstaRecommendation';



const useStyles = makeStyles((theme: Theme) => ({
    shoeSelect: {
      '&.MuiInput-underline:after': {
        borderBottom: '2px solid red',
        height: "500px"
      },
    },
  }));



const Shoe = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const classes = useStyles();

    const [mainImage, setMainImage] = useState('');
    const [otherImages, setOtherImages] = useState<string[]>([]);
    const shoe = useAppSelector(selectSingleShoe);

    const singleBrand = useAppSelector(selectSingleBrand);

    const isLoading = useAppSelector(selectSingleShoeLoading);

    const { id } = useParams();

    useEffect(() => {
      dispatch(getRandomShoesAsync());
      
      if (id !== undefined && id !== '0') {
        dispatch(getSingleShoeAsync(id));
      }
      
    }, [dispatch, id])
    ;
    
    useEffect(() => {
      if (shoe.brand && String(shoe.brand) !== '0') {
        dispatch(getSingleBrandAsync(shoe.brand.toString()));
      }
    }, [dispatch, shoe.brand]);
    


    useEffect(() => {
        if (shoe.images && shoe.images.length > 0) {
            setMainImage(shoe.images[0]); // Set the first image as the main image
            setOtherImages(shoe.images.slice(1)); // Set the rest of the images as otherImages
        }
    }, [shoe.images]);

    const handleMainImageClick = (clickedIndex: number) => {
        if (clickedIndex !== 0) {
            const clickedImage = otherImages[clickedIndex - 1];
            setOtherImages((prevImages) => {
                const updatedImages = [...prevImages];
                updatedImages.splice(clickedIndex - 1, 1, mainImage);
                setMainImage(clickedImage);
                return updatedImages;
            });
        }
    };

    const renderImages = (images: string[]) => {
        return images.slice(0, 5).map((image, index) => (
            <div key={index} className = 'rest-images' onClick={() => handleMainImageClick(index + 1)}>
                <img
                style={{borderRadius: "100%"}}
                    src={`${myServer}/static/images/${image}`}
                    width={isTablet || isLaptop ? `70px` : `110px`}
                    height={isTablet || isLaptop ? `70px` : `110px`}
                    alt={`shoe${index + 1}`}
                />
            </div>
        ));
    };

const renderExtraImages = (images: string[]) => {
    return images.slice(5, 10).map((image, index) => (
        <div key={index} className = 'rest-images' onClick={() => handleMainImageClick(index + 6)}>
            <img
            style={{borderRadius: "100%"}}
                src={`${myServer}/static/images/${image}`}
                width={isTablet || isLaptop ? `70px` : `110px`}
                height={isTablet || isLaptop ? `70px` : `110px`}
                alt={`shoe${index + 6}`}
            />
        </div>
    ));
};

const renderRestImages = (images: string[]) => {
    return images.slice(10, 15).map((image, index) => (
        <div key={index} className = 'rest-images' onClick={() => handleMainImageClick(index + 6)}>
            <img
            style={{borderRadius: "100%"}}
                src={`${myServer}/static/images/${image}`}
                width={isTablet || isLaptop ? `70px` : `110px`}
                height={isTablet || isLaptop ? `70px` : `110px`}
                alt={`shoe${index + 6}`}
            />
        </div>
    ));
};


const [isZoomed, setIsZoomed] = useState(false);

const transformRef = useRef<any>(null);

const handleMouseEnter = () => {
  setIsZoomed(true);
  setIsChipVisible(false)
};

const handleMouseLeave = () => {
  if (transformRef.current) {
    transformRef.current.resetTransform();
  }
  setIsZoomed(false);
};

const [selectedSize, setSelectedSize] = useState('');

const handleSizeChange = (event: any) => {
    setSelectedSize(event.target.value);
    setErrorMessage('');
  };

  useEffect(() => {
    setSelectedSize('מידה');
}, []);

const cart = useAppSelector(selectCart);
  
  const wishlist = useAppSelector(selectWishList);
  
  const [errorMessage, setErrorMessage] = useState('');


  const [quantity, setQuantity] = useState(1);

  const handleDecrease = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleIncrease = () => {
    setQuantity(quantity + 1);
  };

  const handleAddToCart = () => {
    if (selectedSize === 'מידה') {
    setErrorMessage('יש לבחור מידה');
    } else if (!selectedSize) {
      setErrorMessage('יש לבחור מידה');
    } else {
      setErrorMessage('');

      dispatch(addProduct({ item: shoe, selectedSize, amount: quantity }));
    }
  };


  const isMobile = window.innerWidth <= 768;

  const isTablet = window.innerWidth <= 0 || window.innerWidth <= 1024;

  const isLaptop = window.innerWidth >= 1024 && window.innerWidth <= 1440;


  const [isChipVisible, setIsChipVisible] = useState(true);

  return (
    <Container fluid className = "shoe-page-height">
      <Row>
        <Col md={6}>

          {isLoading ? (
                                  <div style = {{height: "35dvh", display: "flex", justifyContent: "center", alignItems: "center"}}>
                                  <div className="loader" />
                                </div>
          ) : (
            <div>
                      {isMobile && (
                        <div style = {{direction: "rtl"}}>
                        <div style = {{color: "#700000", fontSize: "0.5rem", display: "flex", cursor: "pointer", margin: "7px 0px", width: "110%", zIndex: 10 }}>
  
                              <div onClick = {() => navigate("/")}>
                              דף הבית
                              </div>
  
                              &nbsp;/&nbsp;
  
                              <div onClick = {() => navigate(`/brand/shoes/${singleBrand.id}/`)}>
                              {singleBrand.name}
                              </div>
  
                              &nbsp;/&nbsp;
  
                              <div onClick = {() => navigate(`/brand/shoe/${id}/`)}>
                              {shoe.name}
                              </div>
  
                        </div>
                  
                  <div>
                      <h4>
                      {shoe.name}
                      </h4>
  
                      <div style = {{display: "flex", gap: `${shoe.price_before > 0 ? '2.5dvh' : '0dvh'}` }}>
                      
  
                      {shoe.price_before > 0 ? (
    <div style={{ position: "relative", top: "2px"}}>
      <b className = "removed-price">
      ₪{shoe.price_before}
      </b>
    </div>
  ) : (
    ""
  )}

          <b style = {{fontSize: "1.1rem"}}>₪{shoe.price}</b>

  
                      </div>
                  </div>
  
              </div>
            )}

          <div className="first-half">

            

            <div onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                <TransformWrapper ref={transformRef}>
                <TransformComponent>
                    <div style = {{cursor: 'zoom-in'}}>
                    <img
                        width={isTablet || isLaptop ? "340px" : "550"}
                        height={isTablet || isLaptop ? "340px" : "550"}
                        style={{ cursor: 'zoom-in', transition: 'transform 0.5s ease', transform: isZoomed ? 'scale(1.1)' : 'scale(1)'}}
                        src={`${myServer}/static/images/${mainImage}`}
                        alt={`shoeMainImage`}
                        onClick={() => handleMainImageClick(0)}/>

                        {isTablet && isChipVisible && (
                          <Chip label="Double tap or pinch to zoom" style={{position: 'absolute',
                                                                            top: '87%',
                                                                            left: '50%',
                                                                            transform: 'translate(-50%, -50%)'}}/>
                        )}
                    </div>
                </TransformComponent>
                </TransformWrapper>
                </div>

                <div style={{ display: 'flex', flexDirection: 'row' }}>
                    {renderImages(otherImages)}
                </div>

                <div style={{ display: 'flex', flexDirection: 'row' }}>
                    {renderExtraImages(otherImages)}
                </div>

                <div style={{ display: 'flex', flexDirection: 'row' }}>
                    {renderRestImages(otherImages)}
                </div>

          </div>
            </div>
          )}

    
        </Col>
        <Col md={6}>
        
        {isLoading ? (        <div style = {{height: "35dvh", display: "flex", justifyContent: "center", alignItems: "center"}}>
                                  <div className="loader" />
                                </div>) : (
                                  <div>
                                            <div className="vertical-line" />

<div className="second-half">
  
{isMobile ? ("") : (
            <div>
            <div style = {{color: "#700000", fontSize: "0.7rem", display: "flex", cursor: "pointer", margin: "7px 0px", width: "120%", zIndex: 10 }}>

                  <div onClick = {() => navigate("/")}>
                  דף הבית
                  </div>

                  &nbsp;/&nbsp;

                  <div onClick = {() => navigate(`/brand/shoes/${singleBrand.id}/`)}>
                  {singleBrand.name}
                  </div>

                  &nbsp;/&nbsp;

                  <div onClick = {() => navigate(`/brand/shoe/${id}/`)}>
                  {shoe.name}
                  </div>

            </div>
      
      <div>
          <h4>
          {shoe.name}
          </h4>

          <div style = {{display: "flex", gap: `${shoe.price_before ? '2.5dvh' : '0dvh'}` }}>

      <b style = {{fontSize: "1.1rem"}}>₪{shoe.price}</b>

      {shoe.price_before ? (
<div style={{ position: "relative", top: "1px"}}>
<b className = "removed-price">
₪{shoe.price_before}
</b>
</div>
) : (
""
)}

          </div>
      </div>

  </div>
)}



  {isMobile ? (<div style = {{height: "20px"}}/>) : (<div style = {{height: "60px"}}/>)}

  <div style={{ display: 'flex' }}>
  <Select
      style = {{width: "120px"}}
      value={selectedSize}
      onChange={handleSizeChange}
      variant="standard"
      className={`${classes.shoeSelect} shoe-select`}
      inputProps={{
          name: 'size',
          id: 'size-select',
          style: { color: 'white' }
      }}
      MenuProps={{
        PaperProps: {
            style: {
                maxHeight: 316, // Maximum height for the dropdown
                width: 120, // You can adjust this width as needed
            },
        },
    }}>
        
          <MenuItem value="מידה" disabled style={{ direction: 'rtl' }}>
              מידה
          </MenuItem>

          {shoe.sizes.map((size, index) => (
              <MenuItem key={index} value={size} style={{ direction: 'rtl' }}>
                  {size}
              </MenuItem>
          ))}
  </Select>


      {errorMessage && <div style={{ color: 'red', position: "relative", top: "5px", marginRight: "13px" }}>{errorMessage}</div>}
  </div>


  <div style = {{height: "60px"}}/>


  <div style={{ cursor: 'pointer', position: 'relative', display: "flex", width: isMobile ? "100%" : "55%" }}>

      <div style={{ textAlign: 'center' }}>
          <Button style={{ borderRadius: "0px", display: 'flex', alignItems: 'center', backgroundColor: "#E3E3E3", border: "0px solid black", height: "3rem" }}>
              <RemoveIcon fontSize="small" onClick={handleDecrease} style={{ cursor: 'pointer', color: "black" }} />
                  <span style={{ fontSize: '1rem', margin: '0 20px', color: "black" }}>{quantity}</span>
              <AddIcon fontSize="small" onClick={handleIncrease} style={{ cursor: 'pointer', color: "black" }} />
          </Button>
      </div>

      &nbsp;
      
      <div>
          {cart.find((item) => String(item.id) === String(shoe.id)) ? (

              <Button style = {{backgroundColor: "#1A002E", border: "0px solid black", height: "3rem", borderRadius: "0px" }} onClick={() => dispatch(removeProduct({ item: shoe }))}>
              <b style = {{fontSize: isTablet ? "0.5rem" : "0.8rem"}}>
              הסרה מהעגלה&nbsp;&nbsp;

              {isTablet || isLaptop ? ("") : (<BiSolidCart
              style={{ fontSize: '2rem' }}/>)}
              
              </b>
              </Button>
          ) : (
              <Button style = {{backgroundColor: "#1A002E", border: "0px solid black", height: "3rem", borderRadius: "0px"}} onClick={handleAddToCart}>
              <b style = {{fontSize: isTablet ? "0.5rem" : "0.9rem", position: "relative", top: isMobile ? -3 : 0}}>
              הוספה לעגלה&nbsp;

              {isTablet || isLaptop ? ("") : (<BiSolidCartAdd style={{ fontSize: '2rem' }}/>)}
              
              
              </b>
              </Button>
          )}
      </div>

     
      &nbsp;

      <div>
          {wishlist.find((item) => String(item.id) === String(shoe.id))
          ? <Button variant = "none" onClick={() => dispatch(removeWish({ item: shoe }))} style = {{border: "0px solid black", height: "3rem"}}><FaHeart style = {{margin: 0, fontSize: "1.5rem", color: "red", transition: "0.3s"}}/></Button>
          : <Button variant = "none" onClick={() => dispatch(addWish({ item: shoe }))} style = {{border: "0px solid black", height: "3rem"}}><FaHeart style = {{margin: 0, fontSize: "1.5rem", color: "black", transition: "0.3s"}}/></Button>}
      </div>


  </div>

  <div style = {{height: "4px"}}/>

  <div style = {{width: isMobile ? "100%" : "55%"}}>
  <Button onClick = {() => navigate('/cart')} style = {{backgroundColor: "black", border: "0px solid black", height: "3rem", width: "100%", borderRadius: "0px"}}>
    <b>
  לקנייה מהירה      
  </b>
  </Button>
  </div>


  <div style = {{height: "75px"}}/>

  
  <div style = {{width: "100%", justifyContent: "center", textAlign: "center"}}>
  <img src={require('../../images/safety_shoepage.png')} alt = "instagramlogo"
       width = {isTablet ? "330px" : "550px"}
       height = {isTablet ? "80px" : "130px"} />
  </div>

  <div style = {{height: "7rem"}}/>

  <div className = "shoe-desc" style = {{fontSize: "1rem", height: "10rem"}}>
    <pre>
      {shoe.description}
    </pre>
  </div>

  <hr/>
  <br/>
  <br/>

  <div className = "contact-icons">
      <div style = {{position: "absolute", marginBottom: "6rem", fontSize: "1.2rem"}}>
          <b>ליצירת קשר</b>
      </div>
      
      <IoIosMail style={{color: "#78c1d9", fontSize: "3rem", cursor: "pointer"}}/>
      <FontAwesomeIcon icon={faWhatsapp} style={{color: "#25d366", fontSize: "2.4rem", cursor: "pointer"}} />
      <img width='35px' height='35px'
                  src={require('../../images/instagram.png')}
                  alt = "instagramlogo"
                  style = {{position: "relative", right: "5px", top: "1px", cursor: "pointer"}}/>

  

      <FontAwesomeIcon icon={faFacebook} style = {{fontSize: "2.2rem", color: "#316ff6", position: "relative", right: "10px", top: "1px", cursor: "pointer"}}/>
      
      </div>



</div>
                                  </div>
                                )}



        </Col>
      </Row>
    
    <div style = {{height: "5rem"}}/>
    <hr/>

    

      <Row>
        <Col>
          <div className="underneath-layout">
          
          <RandomShoes/>

          <div style = {{height: "4rem"}}/>
          
          <div>
          <InstaRecommendation />
          </div>

          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Shoe;
