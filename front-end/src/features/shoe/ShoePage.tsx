import { faFacebook, faWhatsapp } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ButtonGroup, InputLabel, MenuItem, Select, Theme } from '@mui/material';
import { makeStyles } from "@mui/styles";
import { useEffect, useRef, useState } from 'react';
import { Button } from 'react-bootstrap';
import { BiSolidCart, BiSolidCartAdd } from 'react-icons/bi';
import { FaHeart } from 'react-icons/fa';
import { IoIosMail } from "react-icons/io";
import { useNavigate, useParams } from 'react-router-dom';
import { TransformComponent, TransformWrapper } from 'react-zoom-pan-pinch';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { myServer } from '../../endpoints/endpoints';
import { addProduct, removeProduct, selectCart } from '../cart/cartSlice';
import { addWish, removeWish, selectWishList } from '../wishlist/wishListSlice';
import RandomShoes from './RandomShoes';
import './shoe.css';
import { getRandomShoesAsync, getSingleShoeAsync, selectSingleShoe } from './shoeSlice';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';



const useStyles = makeStyles((theme: Theme) => ({
    shoeSelect: {
      '&.MuiInput-underline:after': {
        borderBottom: '2px solid red',
      },
    },
  }));


const ShoePage = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const classes = useStyles();

    const [mainImage, setMainImage] = useState('');
    const [otherImages, setOtherImages] = useState<string[]>([]);
    const shoe = useAppSelector(selectSingleShoe);

    const { id } = useParams();

    useEffect(() => {
      dispatch(getRandomShoesAsync())

        if (id !== undefined) {
            dispatch(getSingleShoeAsync(id));
        }

        
    }, [dispatch, id]);

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
            <div key={index} className = 'rest-images' style={{ marginRight: '9.9px' }} onClick={() => handleMainImageClick(index + 1)}>
                <img
                style={{borderRadius: "100%"}}
                    src={`${myServer}/static/images/${image}`}
                    width="100%"
                    height="auto"
                    alt={`shoe${index + 1}`}
                />
            </div>
        ));
    };

const renderExtraImages = (images: string[]) => {
    return images.slice(5, 10).map((image, index) => (
        <div key={index} className = 'rest-images' style={{ marginRight: '9.9px', marginBottom: index % 5 === 4 ? '20px' : '0' }} onClick={() => handleMainImageClick(index + 6)}>
            <img
            style={{borderRadius: "100%"}}
                src={`${myServer}/static/images/${image}`}
                width="100%"
                height="auto"
                alt={`shoe${index + 6}`}
            />
        </div>
    ));
};

const renderRestImages = (images: string[]) => {
    return images.slice(10, 15).map((image, index) => (
        <div key={index} className = 'rest-images' style={{ marginRight: '9.9px', marginTop: "-20px" }} onClick={() => handleMainImageClick(index + 6)}>
            <img
            style={{borderRadius: "100%"}}
                src={`${myServer}/static/images/${image}`}
                width="100%"
                height="auto"
                alt={`shoe${index + 6}`}
            />
        </div>
    ));
};


const [isZoomed, setIsZoomed] = useState(false);

const transformRef = useRef<any>(null);

const handleMouseEnter = () => {
  setIsZoomed(true);
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
    setSelectedSize('מידות');
}, []);

const cart = useAppSelector(selectCart);



  
  const wishlist = useAppSelector(selectWishList);
  
  const [errorMessage, setErrorMessage] = useState('');


  const [quantity, setQuantity] = useState(1); // State to manage quantity

  // Function to decrease quantity
  const handleDecrease = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleIncrease = () => {
    setQuantity(quantity + 1);
  };

  const handleAddToCart = () => {
    if (selectedSize === 'מידות') {
    setErrorMessage('יש לבחור מידה');
    } else if (!selectedSize) {
      setErrorMessage('יש לבחור מידה');
    } else {
      setErrorMessage('');

      dispatch(addProduct({ item: shoe, selectedSize, amount: quantity }));
    }
  };

  const isMobile = window.innerWidth <= 768;

    return (
      <div className = "shoe-page-max-height">
            <div style={{ direction: "rtl", position: "relative" }} className="second-part">

            {isMobile ? ("") : (<h4 className = 'shoe-name'>
                      <b>
                    {shoe.name}
                    </b>
                    </h4>)}
                    


                    <div className = "shoe-price" style={{display: "flex", gap: `${shoe.price_before ? '2.5dvh' : '0dvh'}` }}>
                        
                    <h4>₪{shoe.price}</h4>
  
                    {shoe.price_before ? (
                        <div style={{ position: "relative"}}>
                        <h4>
                        ₪{shoe.price_before}
                        </h4>
                        <span style={{ color: "rgba(255, 0, 0, 0.3)",
                                        position: "absolute",
                                        top: -2,
                                        bottom: 0,
                                        right: "1px",
                                        fontSize: "25px",
                                        transform: "rotate(90deg) scaleY(4.1) scaleX(1.3)",
                                        display: "inline-block"}}>
                            X
                        </span>
                        </div>
                    ) : ("")}
                    </div>

                <div style = {{height: "40px"}}/>

                {isMobile && (
                <div style = {{height: "20px"}}/>
            )}
               
            <br/>
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
>
    {/* Placeholder disabled option */}
    <MenuItem value="מידות" disabled style={{ direction: 'rtl' }}>
        מידות
    </MenuItem>

    {/* Other size options */}
    {shoe.sizes.map((size, index) => (
        <MenuItem key={index} value={size} style={{ direction: 'rtl' }}>
            {size}
        </MenuItem>
    ))}
</Select>

    {errorMessage && <div style={{ color: 'red', position: "relative", top: "5px", marginRight: "13px" }}>{errorMessage}</div>}
</div>

            <br/>
            <br/>

            {isMobile && (
                <div>
                <br/>
                <br/>
                </div>
            )}

            <div style={{ cursor: 'pointer', position: 'relative', top: '-2px', display: "flex" }} className = "group-buttons">

            <div style={{ textAlign: 'center' }} className = 'shoe-quantity-button'>
    <Button style={{ borderRadius: "6px", display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '9px 15px', backgroundColor: "#E3E3E3", border: "0px solid black", height: "43px" }}>
        <RemoveIcon fontSize="small" onClick={handleDecrease} style={{ cursor: 'pointer', color: "black" }} />
        <span style={{ fontSize: '1rem', margin: '0 20px', color: "black" }}>{quantity}</span>
        <AddIcon fontSize="small" onClick={handleIncrease} style={{ cursor: 'pointer', color: "black" }} />
    </Button>
</div>
&nbsp;

  {cart.find((item) => String(item.id) === String(shoe.id)) ? (
    
    <Button className = 'shoe-cart-button' style = {{backgroundColor: "#1A002E", border: "0px solid black"}} onClick={() => dispatch(removeProduct({ item: shoe }))}>
    <div>
      הסרת מוצר&nbsp;&nbsp;
      <BiSolidCart
        style={{ fontSize: '2rem' }}/>
    </div>
    </Button>
  ) : (
    <Button className = 'shoe-cart-button' style = {{backgroundColor: "#1A002E", border: "0px solid black", cursor: "pointer"}} onClick={handleAddToCart}>
    <div>
      הוספת מוצר&nbsp;
      <BiSolidCartAdd style={{ fontSize: '2rem' }}/>
    </div>
    </Button>
  )}


            
  &nbsp;

  {wishlist.find((item) => String(item.id) === String(shoe.id))
              ? <Button onClick={() => dispatch(removeWish({ item: shoe }))} style = {{backgroundColor: "white", border: "0px solid black"}}><FaHeart style = {{margin: 0, fontSize: "1.5rem", color: "red"}}/></Button>
              : <Button onClick={() => dispatch(addWish({ item: shoe }))} style = {{backgroundColor: "red", border: "0px solid black"}}><FaHeart style = {{margin: 0, fontSize: "1.5rem"}}/></Button>}

  
  
</div>

<div style = {{height: "4px"}}/>

<div>
<Button onClick = {() => navigate('/cart')} className = "shoe-go-cart-button" style = {{backgroundColor: "black", border: "0px solid black", height: "50px"}}>
      לקנייה מהירה      
    </Button>
</div>

<br/>
<br/>

            <br/>
            <br/>
    
            <div>
            <img src={require('../../images/safety_shoepage.png')}
                  alt = "instagramlogo"
                  className = "shoe-safetty-pic"/>
            </div>


    <div style = {{height: "7rem"}}/>

    <div className = "shoe-desc" style = {{fontSize: "0.9rem", height: "10rem"}}>
    {shoe.description}
    </div>

    


    <div className = "bottom-hr"><hr/></div>

    <br/>

    

    <div className = "shoe-contact-icons" style={{ display: "flex", alignItems: "center", height: "4rem", gap: "35px", justifyContent: "center", borderRadius: "20px", backgroundColor: "#ebe5f5"}}>
    <div style = {{position: "absolute", marginBottom: "6rem", fontSize: "1.2rem"}}><b>ליצירת קשר</b></div>
    
    <IoIosMail style={{color: "#78c1d9", fontSize: "3rem", cursor: "pointer"}}/>
    <FontAwesomeIcon icon={faWhatsapp} style={{color: "#25d366", fontSize: "2.4rem", top: "-1px", cursor: "pointer"}} />
    <img width='35px' height='35px'
                  src={require('../../images/instagram.png')}
                  alt = "instagramlogo"
                  style = {{position: "relative", right: "5px", top: "1px", cursor: "pointer"}}/>

 

    <FontAwesomeIcon icon={faFacebook} style = {{fontSize: "2.2rem", color: "#316ff6", position: "relative", right: "10px", top: "1px", cursor: "pointer"}}/>
    
    </div>


                </div>


    <div style = {{position: "relative"}} className="first-part">

        {isMobile ? ("") : (
            <div style = {{textAlign: "center", justifyContent: "center", display: "flex", position: "relative", transform: "TranslateY(-65dvh)"}}>
            <div className="vertical-line" />
            </div>
        )}



        

            <div className = 'shoe-page-images'>

                
            {isMobile ? (
                <h4 className = 'shoe-name'>
                <b>
              {shoe.name}
              </b>
              </h4>
            ) : ("")}
                
            <div onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} className = "image-container">
        <TransformWrapper ref={transformRef}>
              <TransformComponent>
                <div style = {{cursor: 'zoom-in'}}>
                <img
                width='100%'
                height='auto'
                  style={{ cursor: 'zoom-in', transition: 'transform 0.5s ease', transform: isZoomed ? 'scale(1.1)' : 'scale(1)'}}
                  src={`${myServer}/static/images/${mainImage}`}
                  alt={`shoeMainImage`}
                  onClick={() => handleMainImageClick(0)}
                />
                </div>
              </TransformComponent>
        </TransformWrapper>
        
                </div>

                
                <div style = {{height: "26rem"}}>
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
    
                

                <RandomShoes/>
    </div>
        </div>
                
        
        </div>
    );
};

export default ShoePage;