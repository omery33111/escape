import React from 'react';
import { Carousel, Container } from 'react-bootstrap';
import './base.css';
import { useNavigate } from 'react-router-dom';


const HomePageCar = () => {
  const navigate = useNavigate()
  return (
    <Container>
      <Carousel className="custom-carousel">

      <Carousel.Item>
        <img
          onClick = {() => navigate('/brand/shoes/8/')}
          src={require(`../../images/homepagecar1.png`)}
          alt="First slide"
          width="100%"
          height="100%"
        />
      </Carousel.Item>

      <Carousel.Item>
      <img
          onClick = {() => navigate('/brand/shoes/15/')}
          src={require(`../../images/homepagecar2.png`)}
          alt="Second slide"
          width="100%"
          height="100%"
        />
      </Carousel.Item>

      <Carousel.Item>
      <img
          onClick = {() => navigate('/brand/shoes/10/')}
          src={require(`../../images/homepagecar3.png`)}
          alt="Third slide"
          width="100%"
          height="100%"
        />
      </Carousel.Item>

    </Carousel>
    </Container>
  );
};

export default HomePageCar;
