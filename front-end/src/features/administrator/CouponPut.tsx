import { useEffect, useState } from 'react';
import { Button, Container, Form } from 'react-bootstrap';
import { BsCheckLg, BsXLg } from 'react-icons/bs';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch } from '../../app/hooks';
import { Brand } from '../../models/Brand';
import { getSingleCouponAsync, postBrandAsync, postCouponAsync, putCouponAsync } from './administratorSlice';



const CouponPut = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { id } = useParams();

  useEffect(() => {
    if (id !== undefined)
    {
      dispatch(getSingleCouponAsync(Number(id)));
    }
  }, [dispatch]);

  const [name, setName] = useState('');
  const [discount, setDiscount] = useState<number>(0);

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleDiscountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let discountValue = Number(e.target.value);
  
    discountValue = Math.min(100, Math.max(0, discountValue));
  
    setDiscount(discountValue);
  };

  const handleSubmit = async (event: any) => {
    event.preventDefault();

    const formData: any = new FormData();
    formData.append('name', name);
    formData.append('discount', discount.toString());

    dispatch(putCouponAsync({ couponData: formData, id: Number(id) }));

    setTimeout(() => {
      navigate("/administrator/coupons/");
    }, 150);
  };

  return (
    <div>
      <Container>
        <h1>COUPON</h1>
        <br />
        <br />
        <Form onSubmit={handleSubmit} className="post-form">
          
        <Form.Group>
          <Form.Label><h5>COUPON CODE</h5></Form.Label>
          <Form.Control type="textarea" value={name} required onChange={handleNameChange} />
        </Form.Group>
          
        <Form.Group>
          <Form.Label><h5>DISCOUNT</h5></Form.Label>
          <Form.Control type="number" value={discount} required onChange = {handleDiscountChange}/>
        </Form.Group>

        <br/>

            <div style = {{gap: "20px", display: "flex", width: "100%"}}>
            <Button variant="warning" type="submit" style = {{width: "20%"}}>
              <h6>
                <BsCheckLg />
              </h6>
            </Button>

            <Button className="cancel-update-blog" variant="info" style = {{width: "20%"}}>
              <Link style={{ textDecoration: "none", color: "black" }} to="/administrator/coupons/">
                <h6>
                  <BsXLg />
                </h6>
              </Link>
            </Button>
            </div>

        </Form>

        <div style={{ height: "30vh" }} />
      </Container>
    </div>
  );
};

export default CouponPut;