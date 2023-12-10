import { useEffect, useState } from "react";
import { Accordion, Alert, Button, Card, Col, Container, Form, FormGroup, Modal, Row } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { myServer } from "../../endpoints/endpoints";
import { Address } from "../../models/Shipping";
// import { selectIsLogged } from "../authentication/authenticationSlice";
import { initCart, selectCart } from "../cart/cartSlice";
import { deleteAddressAsync, deleteGuestAddress, getAddressesAmountAsync, getAddressesAsync, initGuestAddresses, postAddressAsync, selectAddress, selectAddressesAmount, selectGuestAddresses } from "../shipping/shippingSlice";
import { postOrderAsync, updateAddress, updateTotal } from "./orderSlice";
import PaypalButton from "./PaypalButton";



const Orders = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const storedIsLogged = JSON.parse(localStorage.getItem('token') as string);

  const cart = useAppSelector(selectCart);

  const addresses = useAppSelector(selectAddress);

  const [selectedAddress, setSelectedAddress] = useState<number | null>(null);


  const guestAddressOrder = JSON.parse(localStorage.getItem('guestAddress') as string);

  const handleOrderSubmit = async (event: any) => {
    event.preventDefault();
    const tempTotal = cart.reduce((accumulator: any, item: any) => {
      return accumulator + item.amount * item.price;
    }, 0);
    const orderDetails = cart.map((item: any) => ({
      product: Number(item.id),
      amount: item.amount,
      price: Number(item.price * item.amount),
    }));

    if (storedIsLogged)
    {
    const orderData = {
      shipping_address: selectedAddress,
    };

    dispatch(postOrderAsync({ orderData, orderDetails }));
    console.log({ orderData, orderDetails })
    navigate("/");
    }
    
    if (!storedIsLogged)
    {
      const orderData = {
        shipping_address: guestAddressOrder[0].id,
      };

    dispatch(postOrderAsync({ orderData, orderDetails }));
    console.log({ orderData, orderDetails })
    navigate("/");
    }
    
  
    
  };



  const handleAddressSelect = (id: any) => {
    if (selectedAddress === id) {
      setSelectedAddress(null);
    } else {
      setSelectedAddress(id);
      dispatch(updateAddress(id))
    }
  }


  const [total, setTotal] = useState(0);

  useEffect(() => {
    let tempTotal = 0;
    cart.forEach((item: any) => {
      tempTotal += item.amount * item.price;
    });
    const roundedTotal = Math.round((tempTotal + Number.EPSILON) * 100) / 100;
    setTotal(roundedTotal);
    dispatch(updateTotal(roundedTotal))
  }, [dispatch, cart]);

  useEffect(() => {
    let tempTotal = 0;
    cart.forEach((item: any) => {
      tempTotal += item.amount * item.price;
    });
    const roundedTotal = Math.round((tempTotal + Number.EPSILON) * 100) / 100;
    setTotal(roundedTotal);
    dispatch(updateTotal(roundedTotal))
  }, [dispatch, cart]);

  useEffect(() => {
    dispatch(initCart());
    dispatch(initGuestAddresses());

    if (storedIsLogged)
    {
    dispatch(getAddressesAsync());
    }

    else
    {
      dispatch(getAddressesAmountAsync());
    }
  }, [dispatch]);

 
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [postalCode, setPostalCode] = useState<number>(0);

  const addressesAmount = useAppSelector(selectAddressesAmount)
  const allGuestAddresses = useAppSelector(selectGuestAddresses)

  
  // REMEMBER TO CHANGE FROM ANY TO ADDRESSSS!!! 5.12.23
  const handleSubmit = async (event: any) => { 
    event.preventDefault();
  
    const shippingData: any = { 
      address,
      city,
      postal_code: postalCode,
      id: Number(addressesAmount) + 1
    };
  
    if (storedIsLogged) {
      dispatch(postAddressAsync(shippingData));
    } else {
      const guestAddresses = JSON.parse(localStorage.getItem("guestAddress") || "[]");
      guestAddresses.push(shippingData);
      localStorage.setItem("guestAddress", JSON.stringify(guestAddresses));

      dispatch(postAddressAsync(shippingData));
    }
  
    // Clear the form fields
    setAddress("");
    setCity("");
    setPostalCode(0);
  };
  
  


  const [showModal, setShowModal] = useState(false);

  const handleButtonClick = () => {
    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
  };


  return (
    <div>
      
          
      <Container>
        <Row>
          <Col xs = {4}>
            <br />
            <br />
            <h2>CHECKOUT</h2>
            <br />
            <h5>CART</h5>

            {/* {ifLogged ? ("") :  */}
        {/* <Alert variant="info" className="d-none d-lg-block" style = {{width: "460px"}}>
    <Alert.Heading>You're signed out right now.</Alert.Heading>
    <b>
      In order to have the ability to continue the process, <a href = "/login">sign in</a>.
      </b>
    </Alert> */}
    {/* } */}
            
            {cart.map((item: any) => (
  <Card key={item.id} style={{ width: "460px", backgroundColor: "#F8F9FA", border: "none", marginBottom: "10px" }}>
    <Row>
      <Col xs={4} style={{ padding: "10px" }}>
        <img src={myServer + item.picture} alt = "orderpic" style={{ maxWidth: "100%", marginBottom: "20px", transform: " translateX(15px) translateY(10px) "}} />
      </Col>
      <Col xs={4} style={{ padding: "10px" }}>
        <Link to={`/single_product/${item.id}`} style = {{textDecoration: "none", color: "black"}}>
        <p style={{ fontWeight: "bold", textAlign: "center", margin: "0", transform: " translateX(0px) translateY(15px) "}}>{item.product_name}</p>
        </Link>
        <p style={{ textAlign: "center", margin: "0", transform: " translateX(0px) translateY(20px) "}}>x {item.amount}</p>
        <p style={{ textAlign: "center", margin: "0", transform: " translateX(0px) translateY(25px) "}}>${item.price} each</p>
      </Col>
      <Col xs={4} style={{ padding: "10px" }}>
        <p style={{ fontWeight: "bold", textAlign: "right", margin: "0", transform: " translateX(-80px) translateY(45px) "}}>${item.amount * item.price}</p>
      </Col>
    </Row>
  </Card>
))}

</Col>
          
          


         <Col xs={7} style={{ padding: "9%", transform: " translateX(-4%)"}}>
            <h5 >SHIPPING ADDRESS</h5>
            <Accordion>
            {addresses.map((address) => (
                <Accordion.Item key={address.id} eventKey="0" style={{ width: "400px"}}>
                  <Accordion.Header>{address.postal_code}</Accordion.Header>
                  <Accordion.Body onClick={() => handleAddressSelect(address.id)}>
                    <p>{address.address}, {address.city}, {address.postal_code}</p>
                    {selectedAddress === address.id && (
                      <p className="text-warning">Selected</p>
                    )}
                    <a style={{ color: "red", float: "right", textDecoration: "none", marginTop: "-10px"}}
                    onClick={() => address.id && dispatch(deleteAddressAsync(address.id))}>
                        Delete
                    </a>
                  </Accordion.Body>
                </Accordion.Item>
              ))}
              
            {allGuestAddresses.map((address: any) => (
                <Accordion.Item key={address.id} eventKey="0" style={{ width: "400px"}}>
                  <Accordion.Header>{address.first_name} {address.last_name}</Accordion.Header>
                  <Accordion.Body onClick={() => handleAddressSelect(address.id)}>
                    <p>{address.address}, {address.city}, {address.state}, {address.country} {address.postal_code}</p>
                    {selectedAddress === address.id && (
                      <p className="text-warning">Selected</p>
                    )}
                    <a style={{ color: "red", float: "right", textDecoration: "none", marginTop: "-10px"}}
                    onClick={() => dispatch(deleteGuestAddress({ item: address }))}>
                        Delete
                    </a>
                  </Accordion.Body>
                </Accordion.Item>
              ))}

<div>
              <Accordion.Item eventKey="1" style = {{width: "400px"}}>
                  <Accordion.Header style = {{color: "orange"}}>CREATE NEW ADDRESS</Accordion.Header>
                  <Accordion.Body>
                    
                    
                      
                        <Form onSubmit={handleSubmit}>
              <Row className="justify-content-center">
                <Col md={6}>

                  <Form.Group controlId="formAddress">
                    <Form.Label>Address</Form.Label>
                    <Form.Control
                      type="text"
                      value={address}
                      onChange={(event) => setAddress(event.target.value)}
                      required
                    />
                  </Form.Group>
                  <Form.Group controlId="formCity">
                    <Form.Label>City</Form.Label>
                    <Form.Control
                      type="text"
                      value={city}
                      onChange={(event) => setCity(event.target.value)}
                      required
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  
                 
                  <Form.Group controlId="formPostalCode">
                    <Form.Label>Postal Code</Form.Label>
                    <Form.Control
                      type="number"
                      onChange={(event) =>
                        setPostalCode(Number(event.target.value))
                      }
                      required
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Row >
                
              </Row>
              <Row className="justify-content-center mt-3">
                <Button
                  variant="warning"
                  type="submit"

                >
                  CREATE NEW ADDRESS
                </Button>
                <br />
                <br />
                  
                </Row>
                </Form>
                      
                  


                  </Accordion.Body>
                </Accordion.Item></div>
              </Accordion>

              
            </Col>

        
          

      
            
              
            <Card style={{ position: "fixed", width: "25%", right: "5%", top: 273 }}>
                <Card.Body>
                    <FormGroup>
                      <Link to="/order/order_post">
                      <div>
    </div>

    <Button variant="warning" onClick={handleButtonClick} style = {{width: "100%"}}>COMPLETE CHECKOUT</Button><br/><br/>

              <Modal show={showModal} onHide={handleModalClose}>
                <Modal.Header closeButton>
                  <Modal.Title>
                    Checkout
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <Button style={{ width: "100%" }} variant="warning" type="submit" onClick={(event) => handleOrderSubmit(event)} >CHECKOUT</Button><br/><br/>
                  <PaypalButton />
                </Modal.Body>
                <Modal.Footer>
                  <Button variant="secondary" onClick={handleModalClose}>Close</Button>
                </Modal.Footer>
              </Modal>
                      </Link>
                    </FormGroup>
                  <Card.Title><h5>Total of {cart.length} items.</h5></Card.Title>
                  <Card.Text><b>Total price: ${total}</b></Card.Text>
                  <hr />
                  <Card.Text>
                    <b>Items price: ${total}</b>
                  </Card.Text>
                  <Card.Text>
                    <b>Shipping price: ${total}</b>
                  </Card.Text>
                </Card.Body>
              </Card>

              </Row>
      </Container>
      
      <div style = {{height: "350px"}}/>
    </div>
  );
};

export default Orders;