import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Swiper from 'swiper';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { myServer } from '../../endpoints/endpoints';
import '../../index.css';
import './instaRec.css';
import { getAllInstaRecsAsync, selectInstaRecs } from './instarecSlice';
import { Container } from 'react-bootstrap';
import InstagramIcon from '@mui/icons-material/Instagram';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';



const InstaRec = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const instaRecs = useAppSelector(selectInstaRecs);

  useEffect(() => {
    dispatch(getAllInstaRecsAsync());
  }, []);

  const swiperRef = useRef<HTMLDivElement>(null);
  const swiperInstance = useRef<Swiper | null>(null);

  useEffect(() => {
    if (swiperRef.current) {
      swiperInstance.current = new Swiper(swiperRef.current, {
        slidesPerView: isMobile ? 3 : 5,
        spaceBetween: 0,
        loop: true,
        effect: 'slide',
        speed: 1000,
        grabCursor: false,
        allowTouchMove: false,
      });
    }

    const intervalId = setInterval(() => {
      goToPrevPage();
    }, 2000);

    return () => {
      if (swiperInstance.current) {
        swiperInstance.current.destroy();
        clearInterval(intervalId);
      }
    };
  }, []);

  const goToNextPage = () => {
    if (swiperInstance.current) {
      swiperInstance.current.slideNext();
    }
  };

  const goToPrevPage = () => {
    if (swiperInstance.current) {
      swiperInstance.current.slidePrev();
    }
  };

  const isMobile = window.innerWidth <= 768;
  const isTablet = window.innerWidth <= 0 || window.innerWidth <= 1024;
  const isComputer = window.innerWidth > 1024 && !('ontouchstart' in window);


  const handleInstagramClick = () => {
    window.open('https://www.instagram.com/escapeshoesil/', '_blank');
  };


  return (
    <Container>

      {isTablet ? (
                <div>
                <div style={{ justifyContent: "center", textAlign: 'center' }}>
          
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <div className = "divider" />
                  <b style={{ fontSize: "2rem", padding: '0 15px' }}>INSTAGRAM</b>
                  <div className = "divider" />
                </div>
          
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <div className = "divider"/>
                  <div style={{ fontSize: "1.3rem", padding: '0 30px' }}>FOLLOW US - <b><InstagramIcon />escapeil_</b></div>
                  <br/>
                  <br/>
                  <div className = "divider"/>
                </div>
          
              </div>
    </div>
      ) : (
        <div>
                  <br/>
                  <div style={{ justifyContent: "center", textAlign: 'center' }}>
            
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <div className = "divider"/>
                    <b style={{ fontSize: "2rem", padding: '0 45px' }}>INSTAGRAM</b>
                    <div className = "divider"/>
                  </div>
            
                  <br/>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <div className = "divider" style = {{marginLeft: "25rem", marginRight: "1rem"}}/>
                    <div style={{ fontSize: "1.3rem", padding: '0 10px', cursor: "pointer" }}>FOLLOW US - <b><InstagramIcon />escapeil_</b></div>
                    <div className = "divider" style = {{marginRight: "25rem", marginLeft: "1rem"}}/>
                  </div>
                  <br/>
                  <br/>
            
                </div>
      </div>
      )}


    <div ref={swiperRef}>
    <IoIosArrowBack className="brand-arrow1" style = {{color: "black", fontSize: "2rem", zIndex: 50, position: "absolute", transform: isMobile ? "translateY(2.1rem)" : "translateY(6.7rem)"}} onClick={goToNextPage} />


            {isComputer && (
                            <img
                            className = "rec-img"
                            style = {{position: "absolute", zIndex: 10, left: 0, transform: "translateY(-8rem)"}}
                            src={require('../../images/Screenshot_1.png')}
                            alt="sidecontainer2"
                            height="403px"
                            width="303px"
                          />
                          
            )}


      <div className="swiper-wrapper" style={{ display: 'flex', cursor: "pointer", justifyContent: "center", textAlign: "center" }}>
        {instaRecs.map((instaRec, index) => (
          <div
          onClick = {handleInstagramClick}
            key={index}
            className={`swiper-slide`}
            style={{ height: isTablet ? "120px" : '250px', width: isTablet ? "120px" : '250px' }}>
            <img
            className = 'image-effect'
              style={{ cursor: 'pointer' }}
              src={`${myServer}${instaRec.image}`}
              alt={`instaRec-${index}`}
              width={isTablet ? "100px" : '250px'}
              height={isTablet ? "100px" : '250px'}
            />
          </div>
        ))}
      </div>


          {isComputer && (
                  <img
                  className = "rec-img"
                  style = {{position: "absolute", zIndex: 10, right: 0, transform: "translateY(-23.62rem)"}}
                  src={require('../../images/Screenshot_1.png')}
                  alt="sidecontainer1"
                  height="403px"
                  width="303px"
                />
          )}

    </div>
    <br/>
    <div className = "divider"/>

  </Container>
  );
};

export default InstaRec;
