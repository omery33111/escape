import { useEffect, useRef, useState } from 'react';
import { Alert, Button, Card, Col, Form, Modal, Row } from 'react-bootstrap';
import ListGroup from 'react-bootstrap/ListGroup';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { myServer } from '../../endpoints/endpoints';
import { selectCart } from '../cart/cartSlice';
import './order.css';
import AddressManagement from '../shipping/AddressManagement';
import { postOrderAsync } from './orderSlice';
import { getAddressesAsync, initGuestAddresses, selectAddress, selectSingleAddress } from '../shipping/shippingSlice';
import EditIcon from '@mui/icons-material/Edit';
import CardGiftcardIcon from '@mui/icons-material/CardGiftcard';
import { checkCouponAsync, selectCouponCheck } from '../coupon/couponSlice';



const Order = () => {
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

  const isTablet = window.innerWidth <= 0 || window.innerWidth <= 1024;


  const storedIsLogged = JSON.parse(localStorage.getItem('token') as string);


  const address = useAppSelector(selectAddress);
  const couponCheck = useAppSelector(selectCouponCheck);

  const [coupon, setCoupon] = useState<any>(undefined);

  useEffect(() => {
    if (storedIsLogged === true) {
      dispatch(getAddressesAsync());
    }

  }, [dispatch, storedIsLogged]);
  

  const [showModal, setShowModal] = useState(false);
  const [note, setNote] = useState('');
  
  const handleOpenModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  const handleNoteChange = (e: any) => setNote(e.target.value);

  // COUPON
  const [showModal2, setShowModal2] = useState(false);
  
  const handleOpenModal2 = () => setShowModal2(true);
  const handleCloseModal2 = () => setShowModal2(false);

  const handleCouponChange = (e: any) => setCoupon(e.target.value);

  const handleOrderSubmit = async (event: any) => {
    event.preventDefault();
  
    const tempTotal = myCart.reduce((accumulator: any, item: any) => {
      return accumulator + item.amount * item.price;
    }, 0);
  
    const orderDetails = myCart.map((item: any) => ({
      shoe: Number(item.id),
      amount: item.amount,
      price: Number(item.price * item.amount),
      note: note,
      coupon: coupon,
    }));
  
    const orderData = {
      shipping_address: address[0].id,
    };

    dispatch(postOrderAsync({ orderData, orderDetails }));
  };
  
  const [couponApplied, setCouponApplied] = useState(false);

  const handleApplyCoupon = () => {
    if (coupon !== undefined && coupon.trim() !== '') {
      const currentCoupon = coupon.trim();
      dispatch(checkCouponAsync(currentCoupon));
      setCouponApplied(true); // Set the flag indicating the coupon has been applied
    }
  };

  const discountedTotal = total - (total * (couponCheck.discount / 100));


  return (
    <div>
        <Row>

        <h1 style = {{display: 'flex', justifyContent: 'center'}}>הזמנה</h1>
        
        <div style = {{height: "4rem"}} />

        
        <div style = {{direction: "rtl", textAlign: "right", marginBottom: '0rem', marginRight: "4rem"}}>
        
        <div style = {{color: "#700000", fontSize: "0.7rem", display: "flex", cursor: "pointer", margin: "10px 0px", maxWidth: "250px" }}>

          <div onClick = {() => navigate("/")}>
          דף הבית
          </div>

          &nbsp;/&nbsp;

          <div onClick = {() => navigate(`/cart`)}>
          העגלה שלי
          </div>

          &nbsp;/&nbsp;

          <div onClick = {() => navigate(`/order`)}>
          סיכום הזמנה
          </div>

        </div>

        </div>

            <Col md = {isTablet ? 6 : 5} xs={{ order: isMobile ? "2" : "1" }}>
              
            <div style = {{height: "2.7rem"}} />

      <div>
   
                
                <div>
                    <Card style = {{direction: "rtl", borderRadius: 0, boxShadow: "0 0 6px 3px rgba(0, 0, 0, 0.1)"}}>
                        <Card.Body style = {{justifyContent: "center", textAlign: "center"}}>
                            <b style = {{fontSize: "1.3rem"}}>
                        סיכום הזמנה
                        </b>

                        <div style={{ borderRadius: 0, position: "absolute", top: 10, right: 15, cursor: "pointer" }}
                              onClick={handleOpenModal}>
                          <EditIcon /><br/>
                          <p style = {{fontSize: "0.9rem"}}>הערות</p>
                        </div>

                        <div style={{ borderRadius: 0, position: "absolute", top: 10, right: 75, cursor: "pointer" }}
                              onClick={handleOpenModal2}>
                          <CardGiftcardIcon /><br/>
                          <p style = {{fontSize: "0.9rem"}}>קופון</p>
                        </div>

                        <hr/>
                        {myCart.map((shoe, shoeIndex) =>
              <ListGroup key = {shoe.id} style = {{direction: "rtl"}}>

              <ListGroup.Item style={{ borderTop: '0px solid white', borderLeft: '0px solid white', borderRight: '0px solid white', borderRadius: "0", marginRight: isMobile ? "0rem" : "2rem", marginLeft: isMobile ? "0rem" : "2rem"}}>
                  <Row>
                    <Col className="d-flex align-items-center justify-content-center">
                    <img className="image-container-order"
                      onMouseEnter={() => handleMouseEnter(shoeIndex)}
                      onMouseLeave={() => handleMouseLeave(shoeIndex)}
                      onClick={() => navigate(`/brand/shoe/${shoe.id}`)}
                      style={{ cursor: "pointer" }}
                      src={`${myServer}/static/images/${shoe.images[imageIndexes[shoeIndex]]}`}
                      width={isTablet ? `100px` : `100px`}
                      height={isTablet ? `100px` : `100px`}/>
                    </Col>

                    <Col className="d-flex align-items-center">
                      <div className="text-right">
                        <b onClick={() => navigate(`/brand/shoe/${shoe.id}`)} style = {{cursor: "pointer"}}>

                            {isTablet ? (
                                <div style = {{fontSize: "0.7rem"}}>
                                    {shoe.name}
                                </div>
                            ) : (
                                <div style = {{fontSize: "0.8rem"}}>
                                    {shoe.name}
                                </div>
                            )}
                          
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
                        <div style = {{display: "flex", gap: `${shoe.price_before > 0 ? '2.5dvh' : '0dvh'}`, direction: "ltr" }}>
                        <b style = {{fontSize: "1.1rem"}}>{shoe.price}₪</b>
                        </div>
                    </Col>

                  </Row>
                  </ListGroup.Item>
              </ListGroup>)}
                
                <div style = {{height: "1.1rem"}}/>

              <ListGroup>
              <ListGroup.Item style={{ borderTop: '0px solid white', borderLeft: '0px solid white', borderRight: '0px solid white', borderRadius: "0", marginRight: isMobile ? "0rem" : "2rem", marginLeft: isMobile ? "0rem" : "2rem"}}>
                <Row>

                    {isTablet ? (
                        <Col style = {{justifyContent: "right", textAlign: "right"}}>
                        <b>
                            סכום כולל
                        </b>
                    </Col>
                    ) : (
                    <Col style = {{justifyContent: "right", textAlign: "center"}} md = {6}>
                        <b>
                            סכום כולל
                        </b>
                    </Col>)}

                    {isTablet ? (
                    <Col style = {{justifyContent: "left", textAlign: "left"}}>
                    <b>
                      {total}₪
                    </b>
                    </Col>
                    ) : (
                        <Col style = {{justifyContent: "left", textAlign: "center"}} md = {6}>
                        <b>
                            {total}₪
                        </b>
                        </Col>)}

                </Row>

                <div style = {{height: "1.1rem"}}/>
                </ListGroup.Item>
                
                {couponCheck.exists && (
                               <ListGroup.Item style={{ borderTop: '0px solid white', borderBottom: '0px solid white', borderLeft: '0px solid white', borderRight: '0px solid white', borderRadius: "0", marginRight: isMobile ? "0rem" : "2rem", marginLeft: isMobile ? "0rem" : "2rem", transform: "translateY(1.1rem)"}}>
                               <Row>
               
                                   {isTablet ? (
                                       <Col style = {{justifyContent: "right", textAlign: "right"}}>
                                       <b>
                                           מחיר אחרי קופון!
                                       </b>
                                   </Col>
                                   ) : (
                                   <Col style = {{justifyContent: "right", textAlign: "center"}} md = {6}>
                                       <b>
                                       מחיר אחרי קופון
                                       </b>
                                   </Col>)}
               
                                   {isTablet ? (
                                   <Col style = {{justifyContent: "left", textAlign: "left"}}>
                                   <b>
                                    {discountedTotal}₪ ({couponCheck.discount}% הנחה!)
                                   </b>
                                   </Col>
                                   ) : (
                                       <Col style = {{justifyContent: "left", textAlign: "center"}} md = {6}>
                                       <b>
                                       {discountedTotal}₪ ({couponCheck.discount}% הנחה!)
                                       </b>
                                       </Col>)}
               
                               </Row>
                               
                               <div style = {{height: "1.1rem"}}/>
                               </ListGroup.Item>)}

                               <Alert variant="danger" show={!couponCheck.exists && couponApplied} style={{ textAlign: 'center' }}>
        הקופון אינו תקף. אנא בדוק את הקוד שוב או השתמש בקופון אחר.
      </Alert>
 

                <div style = {{height: "1.1rem"}}/>

                  <form onSubmit={handleOrderSubmit}>
                    <div style={{ justifyContent: "center", textAlign: "center" }}>
                      <Button style={{ backgroundColor: "#1A002E", width: "50%", borderRadius: 0, border: 0 }} type="submit">
                        מעבר לתשלום
                      </Button>
                    </div>
                    <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header style = {{justifyContent: "center", textAlign: "center"}}>
          <b>הוסף הערה</b>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formNote" style = {{direction: "rtl"}}>
              <Form.Control
                as="textarea"
                placeholder="הוסף הערה להזמנה"
                value={note}
                onChange={handleNoteChange}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer style = {{justifyContent: "center", textAlign: "center"}}>
          <Button variant="none" onClick={handleCloseModal}>
            ביטול
          </Button>
          <Button variant="dark" onClick={handleCloseModal}>
            שלח הערה
          </Button>
        </Modal.Footer>
      </Modal>


      <Modal show={showModal2} onHide={handleCloseModal2}>
  <Modal.Header style={{ justifyContent: "center", textAlign: "center" }}>
    <b>קוד קופון</b>
  </Modal.Header>
  <Modal.Body>
            <Form.Group controlId="formCoupon" style={{ direction: "rtl" }}>
              <Form.Control
                type="text"
                placeholder="הזן קוד קופון"
                value={coupon !== undefined ? coupon : ''}
                onChange={(e) => setCoupon(e.target.value)}
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer style={{ justifyContent: "center", textAlign: "center" }}>
            <Button variant="none" onClick={handleCloseModal2}>
              ביטול
            </Button>
            <Button variant="dark" onClick={() => { handleApplyCoupon(); handleCloseModal2(); }}>
              חסכו
            </Button>
          </Modal.Footer>
</Modal>
                  </form>


              </ListGroup>

                        </Card.Body>
                    </Card>
                </div>
                
      </div>
      </Col>


      <Col md = {isTablet ? 6 : 7} xs={{ order: isMobile ? "1" : "2" }}>
      <div style = {{height: "0.8rem"}} />
        <AddressManagement />
        {isMobile && (<div style = {{height: "20dvh"}}/>)}
      </Col>
      </Row>


      
    </div>
  )
}

export default Order