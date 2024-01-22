import { Pagination } from '@mui/material';
import { useEffect } from 'react';
import { Button, Card, Col, ListGroup, Row } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { myServer } from '../../endpoints/endpoints';
import { getUserOrdersAsync, selectUserOrders } from './administratorSlice';

const UserOrderPanel = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const orders = useAppSelector(selectUserOrders)

    const { id } = useParams();


    useEffect(() => {
      if (id !== undefined)
      {
        dispatch(getUserOrdersAsync(Number(id)));
      }
    }, [dispatch]);

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


  return (
    <div>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
            <div style={{ fontSize: '1.7rem', textAlign: 'center' }}>
                ההזמנות של המשתמש
            </div>
          </div>



          <div style = {{height: "3rem"}}/>

                <div>
                  {orders.map((order) =>
                  <div key = {order.id}>
                  <Card style = {{height: "230px", alignItems: "center", justifyContent: "center", display: "flex", borderRadius: 0,
                                  boxShadow: "0 0 6px 3px rgba(0, 0, 0, 0.1)"}}>

                    <Row style = {{gap: isTablet ? "0px" : "130px"}}>
                      
                    <Col className="d-flex align-items-center" style = {{width: "250px"}}>
              <ListGroup style = {{justifyContent: "center", textAlign: "center"}}>
                <div>
                {order.shoe.name}
                </div>
                <img
                onClick = {() => navigate(`/brand/shoe/${order.shoe.id}`)}
              style = {{width: isTablet ? "120px" : "160px", height: isTablet ? "120px" : "160px", cursor: "pointer"}}
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

                      <Col className="d-flex align-items-center" style = {{direction: "rtl", marginRight: "1rem"}}>
                    כמות: {order.amount}
                    </Col>

                    {order.note && (
                      <Col className="d-flex align-items-center" style = {{direction: "rtl", width: "200px"}}>
                        {order.note}
                      </Col>
                    )}
                    
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

    </div>
  )
}

export default UserOrderPanel
