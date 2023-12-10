import { useEffect, useState } from 'react'
import { Alert, Button, Card, Col, Container, Row } from 'react-bootstrap'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { addProduct, deleteProduct, removeProduct, selectCart } from './cartSlice'
import { BsPlusLg } from "react-icons/bs";
import { FaMinus } from "react-icons/fa";
import { Link } from 'react-router-dom'
import { myServer } from '../../endpoints/endpoints'



const Cart = () => {
  const myCart = useAppSelector(selectCart);
  const [total, setTotal] = useState(0);
  const dispatch = useAppDispatch();


  useEffect(() => {
    let tempTotal = 0;
    myCart.forEach((item) => {
      tempTotal += item.amount * item.price;
    });
    const roundedTotal = Math.round((tempTotal + Number.EPSILON) * 100) / 100;
    setTotal(roundedTotal);
  }, [myCart]);


  const [isScrolling, setIsScrolling] = useState(false);

  useEffect(() => {
    window.addEventListener('scroll', () => {
      if (window.pageYOffset > 110) {
        setIsScrolling(true);
      } else {
        setIsScrolling(false);
      }
    });
  }, [dispatch]);
  
      

  return (
    <div>
      
        <Container><br/><br/>
        <h2>SHOPPING CART</h2><br/>

        {/* {isLogged ? ("") :  */}
        {/* <Alert variant="info" className="d-none d-lg-block" style = {{width: "66.9%"}}>
    <Alert.Heading>You're signed out right now.</Alert.Heading>
    <b>
      To save your items or have the ability to continue in the process, <a href = "/login">sign in</a>.
      </b>
    </Alert> */}
    {/* } */}
    <br/>

    {myCart.length === 0 ? (
    <Alert variant="info" className="d-none d-lg-block" style = {{width: "66.9%"}}>
    <Alert.Heading>Your cart seems to be empty. </Alert.Heading>
    <b>In order to have items in shopping cart, you are welcome to browse the site and look for the products you are interested in.</b>
    </Alert>
    ) : (
    <Container>
       <Row style={{ display: "flex" }}>
       <Col xs={12} md={7}>
        <div style={{ width: "900px" }}>
    {myCart.map((product) =>
    <div key = {product.id}>
        <Card style = {{width: "95%", height: "220px"}}>
        <Row style = {{display: "flex", alignItems: "center", height: "100%"}}>
        <Col xs={4}>
        
          <div style = {{position: "absolute", transform: " translateX(40px) translateY(-84px) "}}>
          
          <Link to={`/single_product/${product.id}`} style={{ textDecoration: "none", color: "black"}}>
        <Card.Img height = {170} src={myServer + product.picture} />
        </Link>
        </div>
        </Col>
        <Col xs={2}>
  <Card.Title>
    <Link to={`/single_product/${product.id}`} style={{ textDecoration: "none", color: "black"}}>
      {product.product_name}
    </Link>
  </Card.Title>
  <Card.Text>
    <small>
    <Link to={`/single_product/${product.id}`} style={{ textDecoration: "none", color: "black"}}>
      {product.description.length > 50 ? `${product.description.substr(0, 50)}...` : product.description}
      </Link>
    </small>
  </Card.Text>
</Col>
<Col xs={3}>
  <Card.Title className="d-flex justify-content-center">
    <Button variant="warning" onClick={() => dispatch(addProduct({ item: product, amount: 1 }))}>
      <h6><BsPlusLg /></h6>
    </Button>
    &nbsp;&nbsp;&nbsp;<h2>{product.amount}</h2>&nbsp;&nbsp;&nbsp;
    <Button variant="warning" onClick={() => dispatch(deleteProduct({ item: product, amount: 1 }))}>
      <h6><FaMinus /></h6>
    </Button>
  </Card.Title>
</Col>

        <Col xs={3}>
        <Card.Title><h2>{product.price} $</h2></Card.Title>
        </Col>
        </Row>

        
       
        <Col xs={3}>
        <Button style={{position: "absolute", bottom: "0", right: "0", margin: "15px"}} variant="warning" onClick={() => dispatch(removeProduct({ item: product }))}>Delete</Button>
        </Col>
        </Card><br/>
        </div>)}
        </div>
        </Col>


        <Col xs={4}>
          {isScrolling? (
            

            <Card style={{ position: "fixed", width: "25%", right: "5%", top: 273 }}>
      <Card.Body>
        <Link to="/order/order_post">
          <Button style={{ width: "100%" }} variant="warning">
            GO TO CHECKOUT
          </Button>
          <br />
          <br />
        </Link>
        <Card.Title>
          <h5>Total of {myCart.length} items.</h5>
        </Card.Title>
        <Card.Text>
          <b>Total price: {total}$</b>
        </Card.Text>
        <hr />
        <Card.Text>
          <b>Items price: {total}$</b>
        </Card.Text>
        <Card.Text>
          <b>
            Shipping price: {total}$
            {total >= 50 ? "(order over 50$!)" : ""}
          </b>
        </Card.Text>
      </Card.Body>
    </Card>

          ) : 
          
          
          (<Card style={{ position: "fixed", width: "25%", right: "5%" }}>
      <Card.Body>
        <Link to="/order/order_post">
          <Button style={{ width: "100%" }} variant="warning">
            GO TO CHECKOUT
          </Button>
          <br />
          <br />
        </Link>
        <Card.Title>
          <h5>Total of {myCart.length} items.</h5>
        </Card.Title>
        <Card.Text>
          <b>Total price: ${total}</b>
        </Card.Text>
        <hr />
        <Card.Text>
          <b>Items price: ${total}</b>
        </Card.Text>
        <Card.Text>
          <b>
            Shipping price: ${total}
          </b>
        </Card.Text>
      </Card.Body>
    </Card>)}

  </Col>
</Row>
        
        </Container>
)}


</Container>
<div style = {{height: "350px"}}/>
    </div>
  )
}

export default Cart

