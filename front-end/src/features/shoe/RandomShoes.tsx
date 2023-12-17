import { useEffect, useRef, useState } from 'react';
import { Card } from 'react-bootstrap';
import { BiSolidCart, BiSolidCartAdd } from 'react-icons/bi';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import { GiConverseShoe } from 'react-icons/gi';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { myServer } from '../../endpoints/endpoints';
import { addProduct, removeProduct, selectCart } from '../cart/cartSlice';
import { addWish, removeWish, selectWishList } from '../wishlist/wishListSlice';
import { getRandomShoesAsync, selectAllShoes } from './shoeSlice';

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
    const intervalIdsRef = useRef<NodeJS.Timeout[]>([]);

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
        clearTimeout(intervalIdsRef.current[shoeIndex]); // Clear initial delay timeout
        clearInterval(intervalIdsRef.current[shoeIndex]); // Clear subsequent interval
        setImageIndexes((prevIndexes) => {
          const newIndexes = [...prevIndexes];
          newIndexes[shoeIndex] = 0; // Reset to the first image
          return newIndexes;
        });
      };

    useEffect(() => {
        dispatch(getRandomShoesAsync())
      }, [dispatch]);

    useEffect(() => {
      setImageIndexes(new Array(shoes.length).fill(0));
    }, [shoes]);

  return (
    <div>
        
    <div style = {{position: "absolute", transform: "TranslateY(5dvh)"}}>
    
    <hr/>

    <div style = {{height: "0.8rem"}}/>

    <div style = {{justifyContent: "center", textAlign: "center", fontSize: "1.5rem"}}><b>מוצרים דומים</b></div>

    <div className = "random-shoes" style = {{transform: "TranslateY(3dvh)"}}>
        {shoes.map((shoe, shoeIndex) => (
          <Card key={shoe.id} className = "random-shoes sharper-border">
            <Card.Body>
                <div style={{ padding: "25px" }}>
                <img
                  className="image-container-brand"
                  onMouseEnter={() => handleMouseEnter(shoeIndex)}
                  onMouseLeave={() => handleMouseLeave(shoeIndex)}
                  onClick={() => navigate(`/brand/shoe/${shoe.id}`)}
                  style={{ cursor: "pointer" }}
                  src={`${myServer}/static/images/${shoe.images[imageIndexes[shoeIndex]]}`}
                  width="100%"
                  height="100%"
                />
                </div>

              <div>
                <Card.Text style = {{width: "100%", height: "50px"}}>{shoe.name}</Card.Text>
                <div style={{ display: "flex", justifyContent: "center", gap: `${shoe.price_before ? '2.5dvh' : '0dvh'}` }}>
                <div >
                <b>₪{shoe.price}</b>
                </div>
  
  {shoe.price_before ? (
    <div style={{ position: "relative"}}>
      <b>
      ₪{shoe.price_before}
      </b>
      <span
        style={{
          color: "rgba(255, 0, 0, 0.3)", // Red color with 50% transparency
          position: "absolute",
          top: -2,
          bottom: 0,
          right: "1px", // Adjust this value for proper alignment
          fontSize: "25px",
          transform: "rotate(90deg) scaleY(4.1) scaleX(1.3)", // Stretching X horizontally
          display: "inline-block",
        }}
      >
        X
      </span>
    </div>
  ) : (
    ""
  )}
</div>
                </div>
                
                
                <hr />

                <div style = {{display: "flex", justifyContent: "space-evenly"}}>
                
                <div style = {{cursor: "pointer", color: "#3C005A", position: "relative", top: "-2px"}}>

                {cart.find((item) => String(item.id) === String(shoe.id))
              ? <BiSolidCart style = {{fontSize: "2rem"}} onClick={() => dispatch(removeProduct({ item: shoe }))}/>
              : <BiSolidCartAdd style = {{fontSize: "2rem"}} onClick={() => dispatch(addProduct({ item: shoe }))}/>}
                
                </div>
                
                <div style = {{cursor: "pointer", color: "#3C005A"}} onClick={() => navigate(`/brand/shoe/${shoe.id}`)}>
                <GiConverseShoe style = {{fontSize: "2rem", position: "relative", right: "-4px", top: "0px"}}/>
                <div style = {{position: "absolute", fontSize: "0.8rem", justifyContent: "center", transform: "translateX(-20px) translateY(-2px)"}}>
                לעמוד הנעל!
                </div>
                </div>

                <div style = {{cursor: "pointer", color: "#3C005A"}}>
                {wishlist.find((item) => String(item.id) === String(shoe.id))
              ? <FaHeart style = {{fontSize: "1.6rem", position: "relative", top: '3px'}} onClick={() => dispatch(removeWish({ item: shoe }))}/>
              : <FaRegHeart style = {{fontSize: "1.6rem", position: "relative", top: '3px'}} onClick={() => dispatch(addWish({ item: shoe }))}/>}
                </div>

                </div>
              
            </Card.Body>
          </Card>
        ))}
    </div>
    </div>
    </div>
  )
}

export default RandomShoes