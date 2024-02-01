import { useEffect, useRef, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { addProduct, deleteProduct, removeProduct, selectCart } from './cartSlice';
import { myServer } from '../../endpoints/endpoints';
import { useNavigate } from 'react-router-dom';
import { Alert, Button, Card, Col, Row } from 'react-bootstrap';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import ListGroup from 'react-bootstrap/ListGroup';
import LocalMallIcon from '@mui/icons-material/LocalMall'



const Cart = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const myCart = useAppSelector(selectCart);

    const [hoveredItem, setHoveredItem] = useState<number | null>(null);

    const intervalIdsRef = useRef<NodeJS.Timeout[]>(new Array(myCart.length).fill(null));

    const [imageIndexes, setImageIndexes] = useState<number[]>([]);


    const handleMouseEnter = (shoeIndex: number) => {
      setHoveredItem(shoeIndex);

      intervalIdsRef.current[shoeIndex] = setTimeout(() => {
        setImageIndexes((prevIndexes) => {
          const newIndexes = [...prevIndexes];
          newIndexes[shoeIndex] = (newIndexes[shoeIndex] + 1) % myCart[shoeIndex].images.length;
          return newIndexes;
        });
        intervalIdsRef.current[shoeIndex] = setInterval(() => {
          setImageIndexes((prevIndexes) => {
            const newIndexes = [...prevIndexes];
            newIndexes[shoeIndex] = (newIndexes[shoeIndex] + 1) % myCart[shoeIndex].images.length;
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
      setImageIndexes(new Array(myCart.length).fill(0));
    }, [myCart]);
    

  const isMobile = window.innerWidth <= 768;

  const [total, setTotal] = useState(0);

  useEffect(() => {
    let tempTotal = 0;
    myCart.forEach((item) => {
      tempTotal += item.amount * item.price;
    });
    const roundedTotal = Math.round((tempTotal + Number.EPSILON) * 100) / 100;
    setTotal(roundedTotal);
  }, [myCart]);


  return (
    <div>
      <h1 style = {{display: 'flex', justifyContent: 'center'}}>העגלה שלי</h1>

        <div style = {{height: "4rem"}} />

        <div style = {{direction: "rtl", marginBottom: '2rem', textAlign: "right", marginRight: isMobile ? '0rem' : "4rem"}}>
        
        <div style = {{color: "#700000", fontSize: "0.7rem", display: "flex", cursor: "pointer", margin: "10px 0px" }}>

          <div onClick = {() => navigate("/")}>
          דף הבית
          </div>

          &nbsp;/&nbsp;

          <div onClick = {() => navigate(`/cart`)}>
          העגלה שלי
          </div>

        </div>

        </div>

      <div>
    {myCart.length === 0 ? (
                <Alert variant="dark" style = {{direction: "rtl"}}>
                <Alert.Heading>אין מוצרים בעגלה</Alert.Heading>
                <b>עדיין לא הוספת מוצרים לעגלה! על מנת למלא את הרשימה, לחץ על אייקון העגלה בתחתית המוצר שאהבת.</b>
                </Alert>
              ) : (
                
                <div>
                        {isMobile ? ("") : (
              <ListGroup style = {{direction: "rtl"}}>
              <ListGroup.Item style={{ border: '0px solid white', borderRight: '0px solid white', borderTop: '0px solid white', borderRadius: "0", marginRight: "4rem", marginLeft: "4rem"}}>
                  <Row>
                    <Col className="d-flex align-items-center justify-content-right">
                        מוצר
                    </Col>

                    <Col className="d-flex align-items-center">
                    </Col>

                    <Col className="d-flex align-items-center justify-content-center">
                        כמות
                    </Col>

                    <Col className="d-flex align-items-center justify-content-center">
                        מחיר
                    </Col>
                  </Row>
                  </ListGroup.Item>
              </ListGroup>

      )}


            {myCart.map((shoe, shoeIndex) =>
              <ListGroup key = {shoe.id} style = {{direction: "rtl"}}>
              <ListGroup.Item style={{ borderBottom: '0px solid white', borderLeft: '0px solid white', borderRight: '0px solid white', borderRadius: "0", marginRight: isMobile ? "0rem" : "4rem", marginLeft: isMobile ? "0rem" : "4rem", top: -1}}>
                  <Row>
                    <Col className="d-flex align-items-center justify-content-center">
                    <img className="image-container-brand"
                      onMouseEnter={() => handleMouseEnter(shoeIndex)}
                      onMouseLeave={() => handleMouseLeave(shoeIndex)}
                      onClick={() => navigate(`/brand/single_shoe/${shoe.id}`)}
                      style={{ cursor: "pointer" }}
                      src={`${myServer}/media/${shoe.images[imageIndexes[shoeIndex]]}`}
                      width={isMobile ? `150px` : `200px`}
                      height={isMobile ? `150px` : `200px`}/>
                    </Col>

                    <Col className="d-flex align-items-center">
                      <div className="text-right">
                        <b>
                          {shoe.name}
                        </b>
                          <br/>
                        <b style = {{fontSize: "0.8rem"}}>
                        {shoe.size ? (
                          <div>
                          מידה: {shoe.size}
                          </div>
                        ) : (
                          <div>
                            מידה: לא נבחרה
                          </div>
                        )}
                          
                        </b>
                      </div>
                    </Col>

                    <Col className="d-flex align-items-center justify-content-center">
                      <div style={{ textAlign: 'center' }}>
                        <Button style={{ borderRadius: "7px", display: 'flex', alignItems: 'center', backgroundColor: "#E3E3E3", border: "0px solid black", height: "3rem" }}>
                            <RemoveIcon fontSize="small" onClick={() => dispatch(deleteProduct({ item: shoe, amount: 1 }))} style={{ cursor: 'pointer', color: "black" }} />
                                <span style={{ fontSize: '1rem', margin: '0 20px', color: "black" }}>{shoe.amount}</span>
                            <AddIcon fontSize="small" onClick={() => dispatch(addProduct({ item: shoe, amount: 1 }))} style={{ cursor: 'pointer', color: "black" }} />
                        </Button>
                      </div>
                    </Col>

                    <Col className="d-flex align-items-center justify-content-center">
                    
                    <div style = {{display: "flex", gap: `${shoe.price_before > 0 ? '2.5dvh' : '0dvh'}`, direction: "ltr" }}>
                      
  
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

                    </Col>
                  </Row>
                  <div style = {{position: "absolute", left: 10, bottom: isMobile ? "" : 10, top: isMobile ? 10 : "", cursor: "pointer", color: "red"}} onClick={() => dispatch(removeProduct({ item: shoe }))}>
                  הסרה
                  </div>
                  </ListGroup.Item>
              </ListGroup>)}

              <Card style = {{top: -1, direction: "rtl", marginRight: isMobile ? "0rem" : "4rem", marginLeft: isMobile ? "0rem" : "4rem", borderRadius: 0,
              boxShadow: "0 0 6px 3px rgba(0, 0, 0, 0.1)"}}>
      <Card.Body style = {{justifyContent: "center", textAlign: "center"}}>
          <Button style = {{backgroundColor: "#1A002E", width: "50%", borderRadius: 0, border: 0}} onClick = {() => navigate('/order')}>
            מעבר לתשלום
          </Button>
          <br />
          <br />
        <Card.Title>
        {myCart.length == 1 ? ("סך הכל מוצר אחד בעגלה") : (
          <div>
          סך הכל {myCart.length} מוצרים בעגלה
          </div>
        )}
          
        </Card.Title>
       
       <div style = {{justifyContent: "center", textAlign: "center", display: "flex"}}>
          <hr style = {{width: "50%"}}/>
        </div>

        <Card.Text>
          סכום כולל של <b>₪{total}</b>
        </Card.Text>

        
      </Card.Body>
    </Card>
                </div>
                
              )}
      </div>


    </div>
  )
}

export default Cart