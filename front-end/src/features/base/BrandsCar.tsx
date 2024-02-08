import React, { useEffect, useRef } from 'react';
import Swiper from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import './base.css';
import { useNavigate } from 'react-router-dom';

const BrandsCar = () => {
  const navigate = useNavigate();

  const swiperRef = useRef<HTMLDivElement>(null);
  let mySwiper: Swiper | null = null;
  let lastScrollTop = 0;

  const handleScroll = () => {
    if (mySwiper && swiperRef.current) {
      const currentScrollTop = window.scrollY || document.documentElement.scrollTop;

      if (currentScrollTop > lastScrollTop) {
        // Scrolling down
        mySwiper.slidePrev();
      } else {
        // Scrolling up
        mySwiper.slideNext();
      }
      lastScrollTop = currentScrollTop <= 0 ? 0 : currentScrollTop;
    }
  };

  useEffect(() => {
    let slideInterval: NodeJS.Timeout;

    if (swiperRef.current) {
      mySwiper = new Swiper(swiperRef.current, {
        slidesPerView: isMobile ? 4 : 7,
        spaceBetween: 0,
        loop: true,
        effect: 'slide',
        speed: 1000,
        grabCursor: true,
      });

      // Set interval for slidePrev() every 2.5 seconds
      slideInterval = setInterval(() => {
        if (mySwiper) {
          mySwiper.slidePrev();
        }
      }, 2500);
    }

    window.addEventListener('scroll', handleScroll);

    return () => {
      if (mySwiper) {
        mySwiper.destroy();
      }
      window.removeEventListener('scroll', handleScroll);

      // Clear the interval on component unmount
      clearInterval(slideInterval);
    };
  }, [mySwiper]);

  const handleLogoClick = (index: number) => {
    switch (index) {
      case 0:
        navigate('/brand/shoes/8/');
        break;
      case 1:
        navigate('/brand/shoes/9/');
        break;
      case 2:
        navigate('/brand/shoes/16/');
        break;
      case 3:
        navigate('/brand/shoes/15/');
        break;
      case 4:
        navigate('/brand/shoes/10/');
        break;
      case 5:
        navigate('/brand/shoes/5/');
        break;
      case 6:
        navigate('/brand/shoes/13/');
        break;
      case 7:
        navigate('/brand/shoes/7/');
        break;
      case 8:
        navigate('/brand/shoes/14/');
        break;
      case 9:
        navigate('/brand/shoes/3/');
        break;
      default:
        // For logo11.png
        break;
    }
  };

  const logos = [
    'logo1.png',
    'logo2.png',
    'logo3.png',
    'logo4.png',
    'logo5.png',
    'logo6.png',
    'logo7.png',
    'logo8.png',
    'logo9.png',
    'logo10.png',
    'logo11.png',
  ];

  const isMobile = window.innerWidth <= 768;
  const isTablet = window.innerWidth <= 0 || window.innerWidth <= 1024;

  return (
    <div>
      <div style={{ height: '4vh' }} />
      <div style={{ justifyContent: 'center', textAlign: 'center' }}>
        <b style={{ fontSize: '2rem' }}>מותגים מובחרים</b>
        <div ref={swiperRef} style={{ transition: 'transform 2s ease-in-out' }}>
          <div className="swiper-wrapper" style={{ width: isTablet ? '510px' : '' }}>
            {logos.map((logo, index) => (
              <div key={index} className="swiper-slide">
                <img
                  src={require(`../../images/${logo}`)}
                  alt={`instagramlogo${index + 1}`}
                  width={isTablet ? '80px' : '200px'}
                  height={isTablet ? '80px' : '200px'}
                  onClick={() => handleLogoClick(index)}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BrandsCar;
