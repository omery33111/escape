import { faFacebook, faWhatsapp } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { InputLabel, MenuItem, Select, Theme } from '@mui/material';
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



const useStyles = makeStyles((theme: Theme) => ({
    shoeSelect: {
      '&.MuiInput-underline:after': {
        borderBottom: '2px solid black',
      },
      '& .MuiSelect-root': {
        color: 'black',
      },
    },
    paginator: {
      "& .MuiPaginationItem-root": {
        color: "black", // Change the color to white or any desired color
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
    // Logic to update selected size based on user selection
  };

const cart = useAppSelector(selectCart);

const handleAddToCart = () => {
  if (!selectedSize) {
      setErrorMessage('יש לבחור מידה'); // Set the error message if size is not selected
  } else {
      setErrorMessage(''); // Clear the error message if size is selected
      dispatch(addProduct({ item: shoe, selectedSize, amount: 1 }));
  }
};

  
  const wishlist = useAppSelector(selectWishList);
  
  const [errorMessage, setErrorMessage] = useState('');


    return (
      <div style={{ transform: "translateY(-10dvh)", position: "relative", marginBottom: '-90dvh' }}>
            <div style={{ direction: "rtl", position: "relative", transform: "translateY(10dvh) translateX(-7dvh)" }}>

                    <h4 style = {{width: "43%"}}>
                    {shoe.name}
                    </h4>

                    

                    <div style={{display: "flex", gap: `${shoe.price_before ? '2.5dvh' : '0dvh'}` }}>
                    <b>₪{shoe.price}</b>
  
                    {shoe.price_before ? (
                        <div style={{ position: "relative"}}>
                        <b>
                        ₪{shoe.price_before}
                        </b>
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

                

                <InputLabel htmlFor="size-select" shrink={false} style={{ position: "absolute", color: 'black', top: '90px', right: "13px" }}>
                    {selectedSize ? ("") : ("מידות")}
            </InputLabel>
            <br/>
            <Select
                value={selectedSize}
                onChange={handleSizeChange}
                variant="standard"
                className={`${classes.shoeSelect} shoe-select`}
                inputProps={{
                    name: 'size',
                    id: 'size-select',
                    style: { color: 'white' }
                }}>
                {shoe.sizes.map((size, index) => (
                    <MenuItem key={index} value={size} style={{ direction: 'rtl' }}>
                        {size}
                    </MenuItem>
                ))}
            </Select>

            <br/>
            <br/>

            <div style={{ cursor: 'pointer', color: '#3C005A', position: 'relative', top: '-2px', maxWidth: "30%", display: "flex" }}>
  {cart.find((item) => String(item.id) === String(shoe.id)) ? (
    <Button style = {{backgroundColor: "#1A002E", border: "0px solid black"}} onClick={() => dispatch(removeProduct({ item: shoe }))}>
    <div>
      הסר מהעגלה&nbsp;
      <BiSolidCart
        style={{ fontSize: '2rem' }}/>
    </div>
    </Button>
  ) : (
    <Button style = {{backgroundColor: "#1A002E", border: "0px solid black", cursor: "pointer"}} onClick={handleAddToCart}>
    <div>
      הוספה לעגלה&nbsp;
      <BiSolidCartAdd style={{ fontSize: '2rem' }}/>
    </div>
    </Button>
  )}


  &nbsp;

  {wishlist.find((item) => String(item.id) === String(shoe.id))
              ? <Button onClick={() => dispatch(removeWish({ item: shoe }))} style = {{backgroundColor: "white", border: "0px solid black"}}><FaHeart style = {{margin: 0, fontSize: "1.5rem", color: "red"}}/></Button>
              : <Button onClick={() => dispatch(addWish({ item: shoe }))} style = {{backgroundColor: "red", border: "0px solid black"}}><FaHeart style = {{margin: 0, fontSize: "1.5rem"}}/></Button>}

  
</div>

<>
  {errorMessage && ( <p style={{ color: 'red', position: "absolute" }}>{errorMessage}</p> )}
  </>
            <br/>
            <br/>
    
    <div style = {{width: "41%", fontSize: "0.9rem", height: "10rem"}}>
    {shoe.description}
    </div>

    <div style = {{height: "6rem"}}/>

    <div style={{ width: "38%", display: "flex", alignItems: "center", height: "4rem", gap: "35px", justifyContent: "center", borderRadius: "20px", backgroundColor: "#ebe5f5"}}>
    <div style = {{position: "absolute", marginBottom: "10dvh", fontSize: "1.2rem"}}><b>ליצירת קשר</b></div>
    
    <IoIosMail style={{color: "#78c1d9", fontSize: "3rem", cursor: "pointer"}}/>
    <FontAwesomeIcon icon={faWhatsapp} style={{color: "#25d366", fontSize: "2.4rem", top: "-1px", cursor: "pointer"}} />
    <img width='35px' height='35px'
                  src={require('../../images/instagram.png')}
                  alt = "instagramlogo"
                  style = {{position: "relative", right: "5px", top: "1px", cursor: "pointer"}}/>

    <FontAwesomeIcon icon={faFacebook} style = {{fontSize: "2.2rem", color: "#316ff6", position: "relative", right: "10px", top: "1px", cursor: "pointer"}}/>
    
    </div>

    <div style = {{height: "7rem"}}/>

    <div style = {{width: "38.1%"}}><hr/></div>


                </div>




<div style = {{textAlign: "center", justifyContent: "center", display: "flex", position: "relative", transform: "TranslateY(-65dvh)"}}>
        <div className="vertical-line" />
        </div>


        

            <div className = 'shoe-page-images'>
                
            <div onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} className = "image-container">
        <TransformWrapper ref={transformRef}>
              <TransformComponent>
                <div style = {{cursor: 'zoom-in'}}>
                <img
                width='100%'
                height='auto'
                  style={{ cursor: 'zoom-in', transition: 'transform 0.5s ease', transform: isZoomed ? 'scale(1.1)' : 'scale(1)' }}
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
    );
};

export default ShoePage;