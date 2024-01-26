import { useEffect, useRef, useState } from 'react';
import { Alert, Button, Card } from 'react-bootstrap';
import { BsFillSuitHeartFill } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { myServer } from '../../endpoints/endpoints';
import { addWish, removeWish, selectWishList } from './wishListSlice';
import './wishlist.css';
import { FaHeart } from 'react-icons/fa';


const WishList = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate()
    
    const wishList = useAppSelector(selectWishList)

    const [hoveredItem, setHoveredItem] = useState<number | null>(null);

    const intervalIdsRef = useRef<NodeJS.Timeout[]>(new Array(wishList.length).fill(null));

    const [imageIndexes, setImageIndexes] = useState<number[]>([]);


    const handleMouseEnter = (shoeIndex: number) => {
      setHoveredItem(shoeIndex);

      intervalIdsRef.current[shoeIndex] = setTimeout(() => {
        setImageIndexes((prevIndexes) => {
          const newIndexes = [...prevIndexes];
          newIndexes[shoeIndex] = (newIndexes[shoeIndex] + 1) % wishList[shoeIndex].images.length;
          return newIndexes;
        });
        intervalIdsRef.current[shoeIndex] = setInterval(() => {
          setImageIndexes((prevIndexes) => {
            const newIndexes = [...prevIndexes];
            newIndexes[shoeIndex] = (newIndexes[shoeIndex] + 1) % wishList[shoeIndex].images.length;
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
      setImageIndexes(new Array(wishList.length).fill(0));
    }, [wishList]);
    

  const isMobile = window.innerWidth <= 768;

  const isTablet = window.innerWidth <= 0 || window.innerWidth <= 1024;

  
  return (
    <div>
    
    <h1 style = {{display: 'flex', justifyContent: 'center'}}><BsFillSuitHeartFill/><br/></h1>
    <h1 style = {{display: 'flex', justifyContent: 'center'}}>הרשימה שלי</h1><br/><br/><br/>

    <div>
    {wishList.length === 0 && (
                <Alert variant="dark" style = {{direction: "rtl"}}>
                <Alert.Heading>אין מוצרים ברשימה</Alert.Heading>
                <b>עדיין לא הוספת מוצרים לרשימת האהובים! על מנת למלא את הרשימה, לחץ על אייקון הלב בתחתית המוצר שאהבת.</b>
                </Alert>
              )}
      </div>

    <div style = {{display: "flex", direction: "rtl"}}>

    <br/>

    

    <div className="brand-map-items">



    {wishList.map((shoe, shoeIndex) => (
  <Card key={shoe.id} className="map-item sharp-border">

    <Card.Body>
        <div style={{ marginRight: "-0.9rem" }}>
        <img
          className="image-container-brand"
          onMouseEnter={() => handleMouseEnter(shoeIndex)}
          onMouseLeave={() => handleMouseLeave(shoeIndex)}
          onClick={() => navigate(`/brand/single_shoe/${shoe.id}`)}
          style={{ cursor: "pointer" }}
          src={`${myServer}/static/images/${shoe.images[imageIndexes[shoeIndex]]}`}
          width={isMobile ? `150px` : `225px`}
          height={isMobile ? `150px` : `225px`}

        />
        </div>

      <div>
        <Card.Text style = {{width: "100%", height: "90px", cursor: "pointer"}} onClick={() => navigate(`/brand/single_shoe/${shoe.id}`)}>{shoe.name}</Card.Text>
        <div style={{ display: "flex", justifyContent: "center", gap: `${shoe.price_before != 0 ? `${isMobile ? "1.2dvh" : "2.5dvh"}` : '0dvh'}` }}>
        <div className={hoveredItem === shoeIndex ? "card-info-hover" : "card-info"}>
        
        <b style = {{fontSize: "1.1rem"}}>₪{shoe.price}</b>

        </div>

{shoe.price_before != 0 ? (
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
       
      
    </Card.Body>
    <div>
                    {wishList.find((item) => String(item.id) === String(shoe.id))
                    && <Button variant = "none" onClick={() => dispatch(removeWish({ item: shoe }))} style = {{border: "0px solid black", height: "3rem"}}><FaHeart style = {{margin: 0, fontSize: "1.5rem", color: "red", transition: "0.3s"}}/></Button>}
                <br/>
                <br/>
                </div>
  </Card>
))}
</div>
</div>
</div>
  )
}

export default WishList                                                                                                                                                                                                                                                                                                                                                                                                 