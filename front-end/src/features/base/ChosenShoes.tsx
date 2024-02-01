import { useEffect, useRef, useState } from 'react';
import { Card } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { myServer } from '../../endpoints/endpoints';
import { getChosenShoesAsync, selectChosenLoading, selectChosenShoes } from '../shoe/shoeSlice';

const ChosenShoes = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const shoes = useAppSelector(selectChosenShoes);
  const isLoading = useAppSelector(selectChosenLoading);

  const intervalIdsRef = useRef<NodeJS.Timeout[]>(new Array(shoes.length).fill(null));

  const [hoveredItem, setHoveredItem] = useState<number | null>(null);
  const [imageIndexes, setImageIndexes] = useState<number[]>([]);

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

  const handleNavigation = (shoeId: string) => {
    if (hoveredItem !== null) {
      handleMouseLeave(hoveredItem);
    }
    navigate(`/brand/single_shoe/${shoeId}`);
  };

  useEffect(() => {
      dispatch(getChosenShoesAsync());
  }, [dispatch]);

  useEffect(() => {
    setImageIndexes(new Array(shoes.length).fill(0));
    return () => {
      intervalIdsRef.current.forEach((intervalId) => clearInterval(intervalId));
    };
  }, [shoes]);


  const isMobile = window.innerWidth <= 768;
  const isTablet = window.innerWidth <= 0 || window.innerWidth <= 1024;


  return (
    <Container>

    <div style = {{justifyContent: "center", textAlign: "center"}}>
        <b style={{ fontSize: '2rem' }}>הדגמים הנמכרים ביותר</b>
        <div>הסניקרס הנמכרות והמבוקשות ביותר</div>
        <div style = {{height: "3.5rem"}}/>
        </div>

    <div className = 'home-map-items'>
      
      {shoes.map((shoe, shoeIndex) => (
            <Card key={shoe.id} className="sharp-border-base" onClick={() => handleNavigation(String(shoe.id))}>
                          {isLoading ? (
                      <div style = {{height: "35dvh", display: "flex", justifyContent: "center", alignItems: "center"}}>
                      <div className="loader" />
                    </div>
            ) : (
              <Card.Body>
              <div>
                <img
                  className="image-container-chosen"
                  onMouseEnter={() => handleMouseEnter(shoeIndex)}
                  onMouseLeave={() => handleMouseLeave(shoeIndex)}
                  style={{ cursor: "pointer" }}
                  src={`${myServer}/media/${shoe.images[imageIndexes[shoeIndex]]}`}
                  width={isMobile || isTablet ? `130px` : `225px`}
                  height={isMobile || isTablet ? `130px` : `225px`}
                />
              </div>

            <div>
              <Card.Text style = {{width: "110%", position: "relative", right: "10px", height: "90px", cursor: "pointer", fontSize: "1rem"}} onClick={() => navigate(`/brand/single_shoe/${shoe.id}`)}>{shoe.name}</Card.Text>

              
              <div style={{ display: "flex", justifyContent: "center", gap: `${shoe.price_before > 0 ? `${isMobile || isTablet ? "1.2dvh" : "2.5dvh"}` : '0dvh'}` }}>
              <div className={hoveredItem === shoeIndex ? "card-info-hover" : "card-info"}>
              
              {shoe.price_before > 0 ? (
  <div style={{ fontSize: "1rem"}}>
    <b className = "removed-price">
    ₪{shoe.price_before}
    </b>
  </div>
) : (
  ""
)}

              </div>
              <b style = {{fontSize: "1rem"}}>₪{shoe.price}</b>


</div>
              </div>
              

            
          </Card.Body>
            )}

          </Card>
        ))}

    </div>
    </Container>
  )
}

export default ChosenShoes


