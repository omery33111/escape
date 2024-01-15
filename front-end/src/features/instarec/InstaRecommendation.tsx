import { useEffect, useRef, useState } from 'react';
import { Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Swiper from 'swiper';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { myServer } from '../../endpoints/endpoints';
import { getCarInstaRecsAsync, getInstaRecCarAmountAsync, selectInstaRecs, selectInstaRecsCarAmount } from './instarecSlice';
import '../../index.css';
import './instaRec.css';



const InstaRecommendation = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const instaRecs = useAppSelector(selectInstaRecs);

  const [page, setPage] = useState(1);

  useEffect(() => {
    dispatch(getCarInstaRecsAsync(page));

    dispatch(getInstaRecCarAmountAsync());
  }, [page]);

  const itemsAmount = useAppSelector(selectInstaRecsCarAmount);

  const itemsPerPage = 5;

  const totalPages = Math.ceil(itemsAmount / itemsPerPage);

  const nextPages = [];
  for (let i = page; i <= totalPages && i <= page + 4; i++) {
    nextPages.push(i);
  }

  const swiperRef = useRef<HTMLDivElement>(null);

  let mySwiper: Swiper | null = null;

  useEffect(() => {
    if (swiperRef.current && !mySwiper) {
      mySwiper = new Swiper(swiperRef.current, {
        slidesPerView: isMobile ? 3 : 5,
        grabCursor: true,
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
      });
    }
  }, []);



  const goToNextPage = () => {
    let nextPage = page + 1;

    if (nextPage > totalPages) {
      nextPage = 1;
    }

    setPage(nextPage);
    
    if (mySwiper) {
      mySwiper.slideTo(nextPage - 1);
    }
  };

  const goToPrevPage = () => {
    if (page > 1) {
      setPage(page - 1);
      if (mySwiper) {
        mySwiper.slidePrev();
      }
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      goToNextPage();
    }, 3000);

    return () => clearInterval(interval);
  }, [goToNextPage]);

  const isMobile = window.innerWidth <= 768;
  const isTablet = window.innerWidth <= 0 || window.innerWidth <= 1024;


  const handleInstagramClick = () => {
    window.open('https://www.instagram.com/escapeil_/', '_blank');
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
      <div className="swiper-wrapper" style={{ display: 'flex', cursor: "pointer", justifyContent: "center", textAlign: "center" }}>
        {page > 1 && (
          <div className="swiper-button-prev" onClick={goToPrevPage} style = {{color: "#1A002E"}}/>
        )}

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
              width={isTablet ? "105px" : '250px'}
              height={isTablet ? "105px" : '250px'}
            />
          </div>
        ))}

        {page < totalPages && (
          <div className="swiper-button-next" onClick={goToNextPage} style = {{color: "#1A002E"}}/>
        )}
      </div>
    </div>
    <br/>
    <div className = "divider"/>
  </Container>
  );
};

export default InstaRecommendation;
