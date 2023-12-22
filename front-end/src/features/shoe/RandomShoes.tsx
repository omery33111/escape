import { useEffect, useRef, useState } from 'react';
import { Card, Container } from 'react-bootstrap';
import { BiSolidCart, BiSolidCartAdd } from 'react-icons/bi';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import { GiConverseShoe } from 'react-icons/gi';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { myServer } from '../../endpoints/endpoints';
import { addProduct, removeProduct, selectCart } from '../cart/cartSlice';
import { addWish, removeWish, selectWishList } from '../wishlist/wishListSlice';
import { getRandomShoesAsync, selectAllShoes } from './shoeSlice';
import { Button } from '@mui/material';
import { IoIosArrowBack, IoIosArrowForward, IoIosArrowUp } from "react-icons/io";



const RandomShoes = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const shoes = useAppSelector(selectAllShoes);
  const cart = useAppSelector(selectCart);
  const wishlist = useAppSelector(selectWishList);

  const [isZoomed, setIsZoomed] = useState(false);
  const [imageIndexes, setImageIndexes] = useState<number[]>([]);
  const [hoveredItem, setHoveredItem] = useState<number | null>(null);

  const transformRef = useRef<any>(null);
  const intervalIdsRef = useRef<NodeJS.Timeout[]>(new Array(shoes.length).fill(null));

  const handleMouseEnter = (shoeIndex: number) => {
    setHoveredItem(shoeIndex);

    intervalIdsRef.current[shoeIndex] = setTimeout(() => {
      setImageIndexes((prevIndexes) => {
        const newIndexes = [...prevIndexes];
        newIndexes[shoeIndex] = (newIndexes[shoeIndex] + 1) % shoes[shoeIndex].images.length;
        return newIndexes;
      });
      intervalIdsRef.current[shoeIndex] = setInterval(() => {
        setImageIndexes((prevIndexes) => {
          const newIndexes = [...prevIndexes];
          newIndexes[shoeIndex] = (newIndexes[shoeIndex] + 1) % shoes[shoeIndex].images.length;
          return newIndexes;
        });
      }, 600);
    }, 1200);
  };

  const handleMouseLeave = (shoeIndex: number) => {
    setHoveredItem(null);
    clearTimeout(intervalIdsRef.current[shoeIndex]);
    clearInterval(intervalIdsRef.current[shoeIndex]);
    setImageIndexes((prevIndexes) => {
      const newIndexes = [...prevIndexes];
      newIndexes[shoeIndex] = 0;
      return newIndexes;
    });
  };

  useEffect(() => {
    dispatch(getRandomShoesAsync());
  }, [dispatch]);

  useEffect(() => {
    setImageIndexes(new Array(shoes.length).fill(0));
    return () => {
      intervalIdsRef.current.forEach((intervalId) => clearInterval(intervalId));
    };
  }, [shoes]);

  useEffect(() => {
    return () => {
      if (hoveredItem !== null) {
        handleMouseLeave(hoveredItem);
      }
    };
  }, [hoveredItem]);

  const handleNavigation = (shoeId: string) => {
    if (hoveredItem !== null) {
      handleMouseLeave(hoveredItem);
    }
    navigate(`/brand/shoe/${shoeId}`);
  };


  const isMobile = window.innerWidth <= 768;

  const handleRamdomShoes = () => {
    dispatch(getRandomShoesAsync());
  };


  const [scrollPosition, setScrollPosition] = useState(0); // State to manage scroll position
  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    if (scrollRef.current) {
      const newPosition = scrollPosition - 324; // Adjust the scroll amount as needed
      setScrollPosition(newPosition >= 0 ? newPosition : 0);
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      const newPosition = scrollPosition + 324; // Adjust the scroll amount as needed
      const maxScroll = scrollRef.current.scrollWidth - scrollRef.current.clientWidth;
      setScrollPosition(newPosition <= maxScroll ? newPosition : maxScroll);
    }
  };

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({ left: scrollPosition, behavior: 'smooth' });
    }
  }, [scrollPosition]);

  const calculateInitialScrollPosition = () => {
    const containerWidth = scrollRef.current?.clientWidth || 0;
    const totalContentWidth = scrollRef.current?.scrollWidth || 0;
  
    let initialScroll = 0;
  
    // Set initial scroll differently based on isMobile
    if (isMobile) {
      initialScroll = 165; // Set the initial scroll to 30 for mobile devices
    }
  
    // Calculate the position to center the initial scroll
    return Math.max(0, initialScroll - containerWidth / 2 + totalContentWidth / 2);
  };

  useEffect(() => {
    // Set the scroll position once the component is mounted
    if (scrollRef.current) {
      const initialPosition = calculateInitialScrollPosition();
      scrollRef.current.scrollLeft = initialPosition;
      setScrollPosition(initialPosition);
    }
  }, []);
  
  
  return (
    <div className = 'random-shoes-section'>
        
    <div style = {{position: "absolute", transform: isMobile ? `TranslateY(10dvh)` : `TranslateY(5dvh)`}} className = 'random-shoes-section'>
    
    {isMobile ? ("") : (
      <hr/>
    )}

    

    <div style = {{height: "0.8rem"}}/>

    <div style = {{justifyContent: "center", textAlign: "center", fontSize: "1.5rem"}}>
      <b>מוצרים דומים</b>

      <br/>

      <IoIosArrowUp className = "arrow-icon" onClick = {handleRamdomShoes}/>
      </div>

      <div className="scroll-wrapper">
          <IoIosArrowBack className="scroll-arrow scroll-arrow1" onClick={scrollLeft} />
          <div className="map-items" ref={scrollRef}>
          {shoes.map((shoe, shoeIndex) => (
            <Card key={shoe.id} className="map-item sharper-border">
              <Card.Body>
                <div style={{ marginRight: "-0.9rem" }}>
                  <img
                    className="image-container-brand"
                    onMouseEnter={() => handleMouseEnter(shoeIndex)}
                    onMouseLeave={() => handleMouseLeave(shoeIndex)}
                    onClick={() => handleNavigation(String(shoe.id))}
                    style={{ cursor: "pointer" }}
                    src={`${myServer}/static/images/${shoe.images[imageIndexes[shoeIndex]]}`}
                    width={isMobile ? `150px` : `225px`}
                    height={isMobile ? `150px` : `225px`}
                  />
                </div>

              <div>
                <Card.Text style = {{width: "100%", height: "90px", cursor: "pointer"}} onClick={() => navigate(`/brand/shoe/${shoe.id}`)}>{shoe.name}</Card.Text>

                
                <div style={{ display: "flex", justifyContent: "center", gap: `${shoe.price_before ? `${isMobile ? "1.2dvh" : "2.5dvh"}` : '0dvh'}` }}>
  
                {shoe.price_before ? (
    <div style={{ position: "relative"}}>
      <b className = "removed-price">
      ₪{shoe.price_before}
      </b>
    </div>
  ) : (
    ""
  )}

<div>
                <b>₪{shoe.price}</b>
                </div>
</div>
                </div>
                
                
                <hr />

                <div style = {{display: "flex", justifyContent: "space-evenly"}}>
                
                <div style = {{cursor: "pointer", color: "#3C005A", position: "relative", top: "-3px"}}>

                {cart.find((item) => String(item.id) === String(shoe.id))
              ? <BiSolidCart style = {{fontSize: "2rem"}} onClick={() => dispatch(removeProduct({ item: shoe }))}/>
              : <BiSolidCartAdd style = {{fontSize: "2rem", position: "relative", top: "1.5px"}} onClick={() => dispatch(addProduct({ item: shoe }))}/>}
                
                </div>
                
                <div style = {{cursor: "pointer", color: "#3C005A"}} onClick={() => navigate(`/brand/shoe/${shoe.id}`)}>
                  {isMobile ? (
                    <GiConverseShoe style = {{fontSize: "2rem"}}/>
                  ) : (<GiConverseShoe style = {{fontSize: "2rem", position: "relative", right: "-1px", top: "0px"}}/>)}
                

                <div style = {{position: "absolute", fontSize: "0.8rem", justifyContent: "center", transform: "translateX(-30px) translateY(-2px)"}}>
                !לעמוד הנעל
                </div>
                </div>

                <div style = {{cursor: "pointer", color: "#3C005A"}}>
                {wishlist.find((item) => String(item.id) === String(shoe.id))
              ? <FaHeart style = {{fontSize: "1.6rem", position: "relative", top: '2px'}} onClick={() => dispatch(removeWish({ item: shoe }))}/>
              : <FaRegHeart style = {{fontSize: "1.6rem", position: "relative", top: '2px'}} onClick={() => dispatch(addWish({ item: shoe }))}/>}
                </div>

                </div>
              
            </Card.Body>
          </Card>
        ))}
    </div>
    <IoIosArrowForward className="scroll-arrow scroll-arrow2" onClick={scrollRight} />
        </div>
    
    </div>

    <div style = {{height: "10rem"}}/>

    </div>
  )
}

export default RandomShoes