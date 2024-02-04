import React, { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { getOrdersUserAsync, getUserOrdersAmountAsync, selectOrdersUser, selectOrdersUserLoading, selectUserOrdersAmount } from './orderSlice';
import { Alert, Button, Card, Col, ListGroup, Modal, Row } from 'react-bootstrap';
import { myServer } from '../../endpoints/endpoints';
import { useNavigate } from 'react-router-dom';
import { Pagination } from '@mui/material';



const UserOrders = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const orders = useAppSelector(selectOrdersUser)
    const isLoading = useAppSelector(selectOrdersUserLoading)

    const [page, setPage] = useState(1);

    useEffect(() => {
          dispatch(getOrdersUserAsync(page));
          dispatch(getUserOrdersAmountAsync());
    }, [dispatch, page]);

    const itemsAmount = useAppSelector(selectUserOrdersAmount);

    const itemsPerPage = 10;
  
    const totalPages = Math.ceil(itemsAmount / itemsPerPage);
  
    const nextPages = [];
    for (let i = page; i <= totalPages && i <= page + 4; i++) {
      nextPages.push(i);
    }

    const isTablet = window.innerWidth >= 0 && window.innerWidth <= 1024;

    function formatDate(dateString: any) {
      const date = new Date(dateString);
      const year = date.getFullYear();
      const month = (date.getMonth() + 1).toString().padStart(2, "0");
      const day = date.getDate().toString().padStart(2, "0");
      const hours = date.getHours().toString().padStart(2, "0");
      const minutes = date.getMinutes().toString().padStart(2, "0");
      return `${year}-${month}-${day}, ${hours}:${minutes}`;
    }

    const isMobile = window.innerWidth <= 768;

    const [showModal, setShowModal] = useState(false);
    const [selectedOrderNote, setSelectedOrderNote] = useState('');

  return (
    <div>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
            <div style={{ fontSize: '1.7rem', textAlign: 'center' }}>
                ההזמנות שלי
            </div>
          </div>

          
          {isLoading ? (
        <div style = {{height: "35dvh", display: "flex", justifyContent: "center", alignItems: "center"}}>
          <div className="loader" />
        </div>) : (
          <div>
                      <div style = {{height: "3rem"}}/>

{orders.length === 0 ? (
        <Alert variant="dark" style = {{direction: "rtl"}}>
        <Alert.Heading>אין הזמנות חדשות</Alert.Heading>
        <b>לא ביצעת הזמנות בחודש האחרון. למעבר לכל ההזמנות, המשך לעיין.</b>
        </Alert>)
      : 
      (
        <div>
        <div style = {{marginBottom: "1rem"}}>
                  <Pagination
              count={totalPages}
              page={page}
              onChange={(event, newPage) => setPage(newPage)}
              size="small"
            />
            </div>
          {orders.slice().reverse().map((order) =>
          <div key = {order.id}>
          <Card style = {{height: "230px", alignItems: "center", justifyContent: "center", display: "flex", borderRadius: 0,
                          boxShadow: "0 0 6px 3px rgba(0, 0, 0, 0.1)"}}>

{order.note && (
                                        <div style = {{position: "absolute", right: 5, top: 5, cursor: "pointer"}}
                                        onClick={() => {
                                          setSelectedOrderNote(order.note);
                                          setShowModal(true);}}>
                                        הערת הזמנה
                                      </div>
                  )}

              <Modal show={showModal} onHide={() => setShowModal(false)} style = {{direction: "rtl"}}>
                      <Modal.Header>
                        <Modal.Title>הערת הזמנה</Modal.Title>
                      </Modal.Header>
                      <Modal.Body>{selectedOrderNote}</Modal.Body>
                      <Modal.Footer>
                        <Button variant="secondary" onClick={() => setShowModal(false)}>
                          סגור
                        </Button>
                      </Modal.Footer>
                    </Modal>

            <Row style = {{gap: isTablet ? "0px" : "130px"}}>

              <Col className="d-flex align-items-center" style = {{width: "250px"}}>
              {order.shoe && (
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
                                    src={`${myServer}/media/${order.shoe.images[0]}`}
                                    alt={`shoe${order.id}`}/>
                                    </ListGroup>
                  )}
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
            
            {isTablet ? (
                                      <Col className="d-flex align-items-center" style = {{direction: "rtl", justifyContent: "center", textAlign: "center"}}>
                                      <div style = {{width: "130px"}}>
                                  סך הכל לתשלום: <b>₪{order.price}</b>
                                  </div>
                                  </Col>
            ) : (
                <Col className="d-flex align-items-center" style = {{direction: "rtl"}}>
                <div style = {{width: "130px"}}>
            סך הכל לתשלום: <b>₪{order.price}</b>
            </div>
            </Col>
            )}
              
            </Row>

              {isMobile ? (
                                    <div style = {{position: "absolute", left: 10, bottom: 5, fontSize: "0.7rem"}}>
                                    <b>{formatDate(order.time)}</b>
                                  </div>
              ) : (
                                    <div style = {{position: "absolute", right: 10, bottom: 5, fontSize: "0.7rem"}}>
                                    <b>{formatDate(order.time)}</b>
                                  </div>
              )}


          </Card>
          <div style = {{height: "3.5rem"}}/>
          </div>
          )}

        </div>
      )}
          </div>
        )}



    </div>
  )
}

export default UserOrders