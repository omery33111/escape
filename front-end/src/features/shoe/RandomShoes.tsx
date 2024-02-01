import { useEffect, useRef, useState } from 'react';
import { Card } from 'react-bootstrap';
import { BiSolidCart, BiSolidCartAdd } from 'react-icons/bi';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import { GiConverseShoe } from 'react-icons/gi';
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { myServer } from '../../endpoints/endpoints';
import { addProduct, removeProduct, selectCart } from '../cart/cartSlice';
import { addWish, removeWish, selectWishList } from '../wishlist/wishListSlice';
import './shoe.css';
import { selectAllShoes } from './shoeSlice';



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
    navigate(`/brand/single_shoe/${shoeId}`);
  };


  const isMobile = window.innerWidth <= 768;


  const [scrollPosition, setScrollPosition] = useState(0); // State to manage scroll position
  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    if (scrollRef.current) {
      const newPosition = scrollPosition - 310; // Adjust the scroll amount as needed
      setScrollPosition(newPosition >= 0 ? newPosition : 0);
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      const newPosition = scrollPosition + 310; // Adjust the scroll amount as needed
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
  
    // Calculate the position to start from the leftmost side of the content
    return Math.min(Math.max(0, initialScroll), totalContentWidth - containerWidth);
  };
  




  useEffect(() => {
    // Set the scroll position once the component is mounted
    if (scrollRef.current) {
      const initialPosition = calculateInitialScrollPosition();
      scrollRef.current.scrollLeft = initialPosition;
      setScrollPosition(initialPosition);
    }
  }, []);
  
  
  const [isHovered, setIsHovered] = useState<number | null>(null);

  const isTablet = window.innerWidth <= 0 || window.innerWidth <= 1024;

  return (
    <div>

    <div style = {{fontSize: "1.5rem", margin: "1rem", justifyContent: "center", textAlign: "center"}}>
      <b>מוצרים דומים</b>

      <br/>

      </div>

      <div className="scroll-wrapper" style = {{backgroundColor: "#E3E3E3", borderRadius: "10px", padding: isMobile ? "0px" : "5px", boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.4)"}}>
          <IoIosArrowBack className="scroll-arrow scroll-arrow1" onClick={scrollLeft} />
          <div className="random-map-items" ref={scrollRef}>

            {isMobile || isTablet ? (
              <>
                                        {shoes.map((shoe, shoeIndex) => (
            <Card key={shoe.id} className="sharp-border-random" onClick={() => handleNavigation(String(shoe.id))}>
              <Card.Body>
                <div>
                  <img
                    className="image-container-random"
                    onMouseEnter={() => handleMouseEnter(shoeIndex)}
                    onMouseLeave={() => handleMouseLeave(shoeIndex)}
                    style={{ cursor: "pointer" }}
                    src={`${myServer}/media/${shoe.images[imageIndexes[shoeIndex]]}`}
                    width={isMobile || isTablet ? `130px` : `225px`}
                    height={isMobile || isTablet ? `130px` : `225px`}
                  />
                </div>

              <div>
                <Card.Text style = {{width: "110%", position: "relative", right: "4px", height: "90px", cursor: "pointer", fontSize: "0.8rem"}} onClick={() => navigate(`/brand/single_shoe/${shoe.id}`)}>{shoe.name}</Card.Text>

                
                <div style={{ display: "flex", justifyContent: "center", gap: `${shoe.price_before > 0 ? `${isMobile || isTablet ? "1.2dvh" : "2.5dvh"}` : '0dvh'}` }}>
                <div className={hoveredItem === shoeIndex ? "card-info-hover" : "card-info"}>
                
                {shoe.price_before > 0 ? (
    <div style={{ fontSize: "0.8rem"}}>
      <b className = "removed-price">
      ₪{shoe.price_before}
      </b>
    </div>
  ) : (
    ""
  )}

                </div>
                <b style = {{fontSize: "0.8rem"}}>₪{shoe.price}</b>
  
 
</div>
                </div>
                

              
            </Card.Body>
          </Card>
        ))}
              </>
            ) : (
              <>
                          {shoes.map((shoe, shoeIndex) => (
            <Card key={shoe.id} className="sharp-border-random">
              <Card.Body>
                <div>
                  <img
                    className="image-container-brand"
                    onMouseEnter={() => handleMouseEnter(shoeIndex)}
                    onMouseLeave={() => handleMouseLeave(shoeIndex)}
                    onClick={() => handleNavigation(String(shoe.id))}
                    style={{ cursor: "pointer"}}
                    src={`${myServer}/media/${shoe.images[imageIndexes[shoeIndex]]}`}
                    width={isMobile || isTablet ? `150px` : `225px`}
                    height={isMobile || isTablet ? `150px` : `225px`}
                  />
                </div>

              <div>
                <Card.Text style = {{width: "100%", height: "90px", cursor: "pointer"}} onClick={() => navigate(`/brand/single_shoe/${shoe.id}`)}>{shoe.name}</Card.Text>

                
                <div style={{ display: "flex", justifyContent: "center", gap: `${shoe.price_before ? `${isMobile || isTablet ? "1dvh" : "2.5dvh"}` : '0dvh'}`}}>
                <div className={hoveredItem === shoeIndex ? "card-info-hover" : "card-info"}>
                
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
                <b style = {{fontSize: "1.1rem"}}>₪{shoe.price}</b>
 
</div>
                </div>
                <hr />
                <div style = {{display: "flex", justifyContent: "space-evenly"}}>
                
                <div style = {{cursor: "pointer", color: "black", position: "relative", top: "-2px"}}>

                <div style = {{cursor: "pointer", color: "black"}}>
                {wishlist.find((item) => String(item.id) === String(shoe.id))
              ? <FaHeart style = {{fontSize: "1.6rem", position: "relative", top: '3px', color: "#1A002E"}} onClick={() => dispatch(removeWish({ item: shoe }))}/>
              : <FaRegHeart style = {{fontSize: "1.6rem", position: "relative", top: '3px'}} onClick={() => dispatch(addWish({ item: shoe }))}/>}
                </div>
                
                </div>
                
                <div onMouseEnter={() => setIsHovered(shoeIndex)} onMouseLeave={() => setIsHovered(null)} style = {{cursor: "pointer", color: "black"}} onClick={() => navigate(`/brand/single_shoe/${shoe.id}`)}>
                <GiConverseShoe style = {{fontSize: "2rem", position: "relative", right: "-4px", top: "0px"}}/>
                {isHovered === shoeIndex && (
    <div style={{ position: "absolute", fontSize: "0.8rem", marginTop: "-5px", transform: "translateX(-10px)" }}>
      לעמוד הנעל
    </div>
  )}
                </div>

                <div style = {{cursor: "pointer", color: "black", position: "relative", top: "-3px"}}>
                
                {cart.find((item) => String(item.id) === String(shoe.id))
              ? <BiSolidCart style = {{fontSize: "2rem"}} onClick={() => dispatch(removeProduct({ item: shoe }))}/>
              : <BiSolidCartAdd style = {{fontSize: "2rem"}} onClick={() => dispatch(addProduct({ item: shoe }))}/>}
                
                </div>

                </div>
              
            </Card.Body>
          </Card>
        ))}
        </>
            )}

    </div>
    <IoIosArrowForward className="scroll-arrow scroll-arrow2" onClick={scrollRight} />
        </div>
    
    </div>
  )
}

export default RandomShoes