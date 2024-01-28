import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Swiper from 'swiper';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { myServer } from '../../endpoints/endpoints';
import '../../index.css';
import './instaRec.css';
import { getAllInstaRecsAsync, selectInstaRecs } from './instarecSlice';
import { Container } from 'react-bootstrap';



const InstaRec = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const instaRecs = useAppSelector(selectInstaRecs);

  useEffect(() => {
    dispatch(getAllInstaRecsAsync());
  }, []);

  const swiperRef = useRef<HTMLDivElement>(null);
  let mySwiper: Swiper | null = null;

  useEffect(() => {
    if (swiperRef.current) {
      mySwiper = new Swiper(swiperRef.current, {
        slidesPerView: isMobile ? 3 : 5,
        spaceBetween: 0,
        loop: true,
        effect: 'slide',
        speed: 1000,
        grabCursor: true,
      });
  
      const intervalId = setInterval(() => {
        goToNextPage();
      }, 100);
  
      return () => {
        if (mySwiper) {
          mySwiper.destroy();
        }
        clearInterval(intervalId);
      };
    }
  }, [mySwiper]);

  const goToNextPage = () => {
    if (mySwiper) {
      mySwiper.slideNext();
    }
  };

  const goToPrevPage = () => {
    if (mySwiper) {
      mySwiper.slidePrev();
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
                  <div style={{ fontSize: "1.3rem", padding: '0 30px' }}>FOLLOW US - <b>escapeil_</b></div>
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
                    <div style={{ fontSize: "1.3rem", padding: '0 10px', cursor: "pointer" }} onClick={goToPrevPage}>FOLLOW US - <b>escapeil_</b></div>
                    <div className = "divider" style = {{marginRight: "25rem", marginLeft: "1rem"}}/>
                  </div>
                  <br/>
                  <br/>
            
                </div>
      </div>
      )}


    <div ref={swiperRef}>

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
