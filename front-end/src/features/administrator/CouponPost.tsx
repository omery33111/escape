import { useState } from 'react';
import { Button, Container, Form } from 'react-bootstrap';
import { BsCheckLg, BsXLg } from 'react-icons/bs';
import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../app/hooks';
import { Brand } from '../../models/Brand';
import { postBrandAsync, postCouponAsync } from './administratorSlice';



const CouponPost = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [discount, setDiscount] = useState<number>(0);
  const [isOneTime, setIsOneTime] = useState(true);

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const enteredValue = e.target.value.slice(0, 6);
    setName(enteredValue);
  };

  const handleDiscountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let discountValue = Number(e.target.value);
  
    discountValue = Math.min(100, Math.max(0, discountValue));
  
    setDiscount(discountValue);
  };

  const handleIsOneTimeChange = () => {
    setIsOneTime(!isOneTime);
  };

  const handleSubmit = async (event: any) => {
    event.preventDefault();

    const formData: any = new FormData();
    formData.append('name', name);
    formData.append('discount', discount.toString());
    formData.append('one_time', isOneTime.toString());

    dispatch(postCouponAsync(formData));

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
        </Form.Group><br/>

        <Form.Group>
            <Form.Check
              type="checkbox"
              label="חד פעמי"
              onChange={handleIsOneTimeChange}
              checked={isOneTime}
            />
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

export default CouponPost;