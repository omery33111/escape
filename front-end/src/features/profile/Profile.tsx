import { Button } from '@mui/material';
import { useEffect, useState } from 'react';
import { Alert, Card, Col, Container, ListGroup, Modal, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { myServer } from '../../endpoints/endpoints';
import { logoutAsync } from '../authentication/authenticationSlice';
import { selectCart } from '../cart/cartSlice';
import { getLastMonthOrdersAsync, selectOrdersUser } from '../order/orderSlice';
import AddressManagement from '../shipping/AddressManagement';
import { getProfileAsync, selectMyProfile, selectProfileIsLoading } from './profileSlice';




const Profile = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const storedIsLogged = JSON.parse(localStorage.getItem('token') as string);


    useEffect(() => {
      if (storedIsLogged)
      {
        dispatch(getProfileAsync());
        dispatch(getLastMonthOrdersAsync());
      }
      }, [dispatch]);

    const profile = useAppSelector(selectMyProfile)
    const orders = useAppSelector(selectOrdersUser)

    const isLoading = useAppSelector(selectProfileIsLoading)

    const cart = useAppSelector(selectCart)
      

    const handleLogout = () => {
        dispatch(logoutAsync())
    };


    const isTablet = window.innerWidth >= 0 && window.innerWidth <= 1024;

    const isMobile = window.innerWidth <= 768;

    const monthAgoDate = new Date();
    monthAgoDate.setMonth(monthAgoDate.getMonth() - 1);


    function formatDate(dateString: any) {
      const date = new Date(dateString);
      const year = date.getFullYear();
      const month = (date.getMonth() + 1).toString().padStart(2, "0");
      const day = date.getDate().toString().padStart(2, "0");
      const hours = date.getHours().toString().padStart(2, "0");
      const minutes = date.getMinutes().toString().padStart(2, "0");
      return `${year}-${month}-${day}, ${hours}:${minutes}`;
    }

    const [showModal, setShowModal] = useState(false);

    const handleShowModal = () => {
      setShowModal(true);
    };

  return (
    <div style = {{border: "1px solid black", padding: "2rem", borderTop: "none", transform: "translateY(-80px)"}}>
              
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
          <div style={{ fontSize: '1.7rem', textAlign: 'center' }}>
            החשבון שלי
          </div>

          <div style={{ alignSelf: 'flex-end', marginTop: '-32px' }}>
            <b onClick={handleLogout} style={{ color: 'red', cursor: 'pointer' }}>התנתקות</b>
          </div>
      </div>
      
      <div style = {{marginTop: "110px"}}>
      
      {isLoading ? (
        <div style = {{height: "35dvh", display: "flex", justifyContent: "center", alignItems: "center"}}>
          <div className="loader" />
        </div>
        
            ) : (
              <Container fluid style = {{height: isTablet ? "" : "35dvh"}}>
              <Row>
        
                <Col md={isTablet ? 12 : 6} xs={{ order: isTablet ? "2" : "1" }}>
        
                  {isTablet && (<div style = {{height: "5rem"}}/>)}
        
                  {isMobile ? ("") : (
                    <div>
                                   <div style = {{direction: "rtl", marginTop: "-2rem", fontSize: isMobile ? "0.8rem" : "1rem"}}><b>ההזמנות האחרונות שלי (מתאריך {monthAgoDate.toLocaleDateString('he-IL')}):</b></div>
        
        <div style = {{height: "3rem"}}/>
        {orders.length === 0 ? (
          <Alert variant="dark" style = {{direction: "rtl"}}>
          <Alert.Heading>אין הזמנות חדשות</Alert.Heading>
          <b>לא ביצעת הזמנות בחודש האחרון. למעבר לכל ההזמנות, המשך לעיין.</b>
          </Alert>)
        : 
        (
          <div style = {{overflowY: 'auto', overflowX: 'hidden', maxHeight: "230px"}}>
            {orders.slice().reverse().map((order) =>
            <div key = {order.id}>
            <Card style = {{height: "230px", alignItems: "center", justifyContent: "center", display: "flex", borderRadius: 0}}>
            
            <div style = {{position: "absolute", right: 5, top: 5, color: "purple", cursor: "pointer"}} onClick={handleShowModal}>
              {order.note && ("הערות הזמנה")}
            </div>

            



              <Row>
                <Col className="d-flex align-items-center">
                <ListGroup style = {{direction: "rtl", maxWidth: "170px", minWidth: "120px"}}>
                  <ListGroup.Item style = {{borderRadius: 0, borderTop: 0, borderLeft: 0, borderRight: 0, fontSize: "0.7rem", width: "140px"}}>
                    <div style = {{cursor: "pointer"}} onClick = {() => navigate(`/brand/single_shoe/${order.shoe.id}`)}>
                      {order.shoe.name}
                      </div>
                  </ListGroup.Item>
                  <img
                  onClick = {() => navigate(`/brand/single_shoe/${order.shoe.id}`)}
                style = {{width: "110px", height: "110px", cursor: "pointer"}}
                  width={"100%"}
                  height={"100%"}
                  src={`${myServer}/static/images/${order.shoe.images[0]}`}
                  alt={`shoe${order.id}`}/>
                  </ListGroup>
              </Col>
        
                <Col className="d-flex align-items-center">
        
                <ListGroup style = {{direction: "rtl", maxWidth: "170px", minWidth: "120px"}}>
                  <ListGroup.Item style = {{borderRadius: 0, borderTop: 0, borderLeft: 0, borderRight: 0}}>
                  {order.shipping_address.first_name} {order.shipping_address.last_name}
                  </ListGroup.Item>
        
                  <ListGroup.Item style = {{borderRadius: 0, borderTop: 0, borderLeft: 0, borderRight: 0}}>
                  {order.shipping_address.city}
                  </ListGroup.Item>
                  
                  <ListGroup.Item style = {{borderRadius: 0, borderTop: 0, borderLeft: 0, borderRight: 0}}>
                  {order.shipping_address.address} {order.shipping_address.house_number}
                  </ListGroup.Item>
        
                  <ListGroup.Item style = {{borderRadius: 0, borderTop: 0, borderLeft: 0, borderRight: 0}}>
                  0{order.shipping_address.phone_number}
                  </ListGroup.Item>
        
                </ListGroup>
              </Col>
        
              <Col className="d-flex align-items-center">
                      <div style = {{direction: "rtl"}}>
                        <b>
                        כמות: {order.amount}
                        </b>
                          <br/>
                        <p>
                        {order.size && (
                                  <div>
                                  מידה: {order.size}
                                  </div>
                            )}
                          
                        </p>
                      </div>
                    </Col>

                <Col className="d-flex align-items-center" style = {{direction: "rtl"}}>
                  <div style = {{width: "130px"}}>
              סך הכל לתשלום: <b>₪{order.price}</b>
              </div>
              </Col>
              </Row>
        
        
              <div style = {{position: "absolute", right: 10, bottom: 5, fontSize: "0.7rem"}}>
                <b>{formatDate(order.time)}</b>
              </div>
        
            </Card>
            <Modal show={showModal} onHide={() => setShowModal(false)} style = {{direction: "rtl"}}>
        <Modal.Header style = {{justifyContent: "center", textAlign: "center"}}>
          <b>הערות הזמנה</b>
        </Modal.Header>
        <div>
                  {order.note}
        </div>
      </Modal>
            
            </div>
            )}
        
        
          </div>
        )}
                    </div>
                  )}
            
         
                  {isMobile && (<div style = {{height: "4rem"}}/>)}
                <div style = {{width: isMobile ? "100%" : "55%", transform: "translateY(1.5rem)"}}>
                    <Button style = {{backgroundColor: "black", border: "0px solid black", height: "3rem", width: "100%", borderRadius: "0px", color: "white"}} onClick = {() => navigate('/profile/orders')}>
                      <b>
                    לכל ההזמנות    
                    </b>
                    </Button>
                    </div>
                </Col>
                
                <Col md={isTablet ? 12 : 6} xs={{ order: isTablet ? "1" : "2" }}>
        
                <div style = {{direction: "rtl", marginTop: "-2rem"}}><b>הפרטים שלי</b></div>
        
                <br/>
        
                <div>
                  <AddressManagement />
                  </div>
        
        
                </Col>
              </Row>
              <div style = {{height: "7rem"}}/>
            </Container>
        
            )}


      </div>

      
    </div>
  )
}

export default Profile