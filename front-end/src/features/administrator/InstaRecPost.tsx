import { useEffect, useState } from 'react';
import { Button, Container, Form } from 'react-bootstrap';
import { BsCheckLg, BsXLg } from 'react-icons/bs';
import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { Shoe } from '../../models/Shoe';
import { postInstaRecAsync, postShoeAsync, selectCurrentBrand, setCurrentBrand } from './administratorSlice';
import { ShoeImage } from '../../models/ShoeImage';
import { postShoeImageAsync } from '../shoe/shoeSlice';
import { getAllBrandsAsync, getSingleBrandAsync, selectAllBrands, selectSingleBrand } from '../brand/brandSlice';
import { Brand } from '../../models/Brand';



const InstaRecPost = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [image, setImage] = useState<File | undefined>(undefined);

  const handleImage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setImage(event.target.files ? event.target.files[0] : undefined);
  };

  const handleImageSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!image) {
      console.error('No image selected');
      return;
    }


    const formData = new FormData();
    formData.append('image', image);

    dispatch(postInstaRecAsync(formData));

    setTimeout(() => {
      navigate("/administrator/instagram_recs/");
    }, 150);
  };


  return (
    <div>
        <h1>INSTAGRAM RECOMMENDATIONS</h1>
        <br />
        <br />

        <Form onSubmit={handleImageSubmit} className="post-form">
          <Form.Group controlId="formThumbnail">
                    <Form.Label className = "blog-form-title"><h5>Upload Images</h5></Form.Label>
                    <Form.Control type="file" onChange = {handleImage}/>
          </Form.Group><br/>

          <Button variant="secondary" type="submit">
            Add
          </Button>

          &nbsp;

          <Button variant="info" style={{ width: '20%' }} onClick = {() => navigate('/administrator/instagram_recs/') }>
                <h6 style={{ textDecoration: 'none', color: 'black' }}>
                  <BsXLg />
                </h6>
            </Button>
        </Form>



 
    </div>
  );
};

export default InstaRecPost;