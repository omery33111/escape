import { faGithub, faInstagram, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import 'bootstrap/dist/css/bootstrap.css';
import { Col, Container, Modal, Row } from 'react-bootstrap';
import './navigators.css';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { getAllBrandsAsync, selectAllBrands } from '../brand/brandSlice';
import { useEffect, useState } from 'react';
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import EmailIcon from '@mui/icons-material/Email';
import SearchIcon from '@mui/icons-material/Search';
import { Autocomplete, TextField, Theme } from '@mui/material';
import { searchShoeAsync, selectAllShoes, selectSearchLoading, selectSearchShoe, setShoeSearch } from '../shoe/shoeSlice';
import { myServer } from '../../endpoints/endpoints';
import { makeStyles } from "@mui/styles";
import CopyrightIcon from '@mui/icons-material/Copyright';


const useStyles = makeStyles((theme: Theme) => ({
  autocompleteRoot: {
    '& .MuiInput-underline:after': {
      borderBottom: '2px solid red',
    },
    '& .MuiInputBase-input': {
      color: 'white',
    },
    '& .MuiAutocomplete-clearIndicator': {
      color: 'white',
    },
  },
}));



const MyFooter = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const classes = useStyles();

  const shoes = useAppSelector(selectAllShoes);
  const searchShoe = useAppSelector(selectSearchShoe);

  const isSearchLoading = useAppSelector(selectSearchLoading);

  const handleSearchInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setShoeSearch(event.target.value));
  };

  useEffect(() => {
    if (searchShoe.trim() !== '') {
      dispatch(searchShoeAsync({ searchQuery: searchShoe }));
    } else {
      dispatch(setShoeSearch(''));
    }
  }, [dispatch, searchShoe]);

  const storedIsLogged = JSON.parse(localStorage.getItem('token') as string);

  const brands = useAppSelector(selectAllBrands);

  useEffect(() => {
    dispatch(getAllBrandsAsync());
  }, [dispatch]);

  const handleInstagramClick = () => {
    window.open('https://www.instagram.com/escapeshoesil/', '_blank');
  };

  const [showModal, setShowModal] = useState(false);

  const handleEmailClick = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const isMobile = window.innerWidth >= 0 && window.innerWidth <= 1024;

  return (
    <div className="wrapper">
      <div className="content">

      </div>

      <footer className="footer">
        <Container style = {{direction: "rtl", justifyContent: "right", textAlign: "right"}}>
        <div style = {{height: "0.3rem"}}/>
          <Row>

            <Col>
                <Col className="mb-4">
                  <b>
                עמודי האתר
                </b>
                </Col>
                <Col className="mb-2" style = {{cursor: "pointer", width: "30%"}} onClick = {() => navigate('/')}>
                עמוד הבית
                </Col>

                {storedIsLogged ? (
                                      <>
                                        <Col className="mb-2" style = {{cursor: "pointer", width: isMobile ? "100%" : "30%"}} onClick = {() => navigate('/profile')}>
                                        החשבון שלי
                                        </Col>
                                        <Col className="mb-2" style = {{cursor: "pointer", width: isMobile ? "100%" : "30%"}} onClick = {() => navigate('/profile/orders')}>
                                        ההזמנות שלי
                                        </Col>
                                      </>
                                        ) : (
                                          <>
                                            <Col className="mb-2" style = {{cursor: "pointer", width: isMobile ? "100%" : "30%"}} onClick = {() => navigate('/authentication/register')}>
                                            הרשמה
                                            </Col>
                                            <Col className="mb-2" style = {{cursor: "pointer", width: isMobile ? "100%" : "30%"}} onClick = {() => navigate('/authentication/login')}>
                                            התחברות
                                            </Col>
                                          </>
                                        )}

                    <Col className="mb-2" style = {{cursor: "pointer", width: isMobile ? "100%" : "30%"}} onClick = {() => navigate('/cart')}>
                    העגלה שלי
                    </Col>

                    <Col className="mb-2" style = {{cursor: "pointer", width: isMobile ? "100%" : "30%"}} onClick = {() => navigate('/cart')}>
                    הרשימה שלי
                    </Col>

                    <Col className="mb-2" style = {{cursor: "pointer", width: isMobile ? "100%" : "30%"}}>
                    תקנון האתר
                    </Col>

                    <Col className="mb-2" style = {{cursor: "pointer", width: isMobile ? "100%" : "40%"}}>
                    מדיניות המשלוח
                    </Col>

                    <Col className="mb-2" style = {{cursor: "pointer", width: isMobile ? "100%" : "30%"}}>
                    אודות
                    </Col>
            </Col>


            <Col>
                <Col className="mb-4">
                  <b>
                  מותגים
                </b>
                </Col>

                {brands.map(brand =>
                <Col key = {brand.id} className="mb-2" style = {{cursor: "pointer", width: isMobile ? "100%" : "30%"}}>
                  <div onClick = {() => navigate(`/brand/shoes/${brand.id}/`)}>
                    {brand.name}
                  </div>
                </Col>)}

            </Col>


            <Col>
            <Col className="mb-4">
                  <b>
                    יצירת קשר
                </b>
                </Col>

                <Col className="mb-2" style = {{cursor: "pointer", display: "flex", alignItems: "center", width: isMobile ? "100%" : "30%"}} onClick = {handleInstagramClick}>
                  <div>
                    <InstagramIcon />
                  </div>&nbsp;&nbsp;&nbsp;
                  <div>
                    אינסטגרם
                  </div>
                  </Col>
                  
                <Col className="mb-2" style = {{cursor: "pointer", display: "flex", alignItems: "center", width: isMobile ? "100%" : "30%"}} onClick = {() => window.location.href = ""}>
                <div>
                    <FacebookIcon />
                  </div>&nbsp;&nbsp;&nbsp;
                  <div>
                  פייסבוק
                  </div>
                </Col>

                <Col className="mb-2" style = {{cursor: "pointer", display: "flex", alignItems: "center", width: isMobile ? "100%" : "30%"}} onClick = {() => window.location.href = ""}>
                <div>
                    <WhatsAppIcon />
                  </div>&nbsp;&nbsp;&nbsp;
                  <div>
                  וואצפ
                  </div>
                </Col>

                <Col className="mb-2" style = {{cursor: "pointer", display: "flex", alignItems: "center", width: isMobile ? "100%" : "50%"}} onClick={handleEmailClick}>
                <div>
                    <EmailIcon />
                  </div>&nbsp;&nbsp;&nbsp;
                  <div>
                  צרו קשר במייל
                  </div>
                </Col>

            </Col>

                {isMobile && (
                  <>
                 <div style = {{height: "1.75rem"}}/>
                  <div className = 'divider-white'/>
                <div style = {{height: "2rem"}}/>
                </>
                  )}

            <Col>
                <b>יש דגם שאתם רוצים ולא מוצאים?</b><div style = {{height: "1rem"}}/>
                שלחו לנו הודעה באינסטגרם, וואצפ או במייל ונשיג עבורכם את הדגם!

                <Col>
                <div style = {{height: "2rem"}}/>

                לחיפוש דגם:
                <div style = {{height: "0.8rem"}}/>

                <div style = {{display: "flex"}}>

            <SearchIcon style = {{position: "relative", right: "-0.7rem", bottom: "-0.2rem", color: "white", cursor: "pointer"}}/>

            
            <Autocomplete
            style = {{width: "13rem"}}
          className={classes.autocompleteRoot}
          freeSolo
          options={shoes.map((shoe) => ({
            id: shoe.id,
            name: shoe.name,
            image: shoe.images[0],
          }))}
          getOptionLabel={(shoe: any) => shoe.name}
          renderOption={(props, shoe) => (
            <li {...props}>

              {isSearchLoading ? (
                <div className="loader" style = {{width: "30px", direction: "rtl"}}/>
              ) : (
                <div
                style={{ display: 'flex', direction: 'rtl', alignItems: "center"}}
                onClick={() => navigate(`/brand/single_shoe/${shoe.id}/`)}
              >
                <img
                style = {{transform: "scaleX(-1)"}}
                  src={`${myServer}/static/images/${shoe.image}`}
                  width="20%"
                  height="auto"
                />
                <p style = {{position: "relative", marginTop: "20px", alignItems: "flex-end", marginRight: "10px"}}>{shoe.name}</p>
              </div>
              )}


            </li>
          )}
          renderInput={(params) => (
            <TextField
              placeholder="חיפוש..."
              variant="standard"
              {...params}
              onChange={handleSearchInputChange}
              value={searchShoe}
              InputLabelProps={{ style: { color: 'black' } }}
            />
          )}
        />

        </div>

        <div style={{ height: "115px", display: "flex", alignItems: "flex-end" }}>
          <p style = {{direction: "rtl", position: "absolute", transform: "translateY(-0.4rem)"}}>
            <CopyrightIcon style = {{fontSize: "1.3rem", marginBottom: "3px"}}/>&nbsp;כל הזכויות שמורות לEscape Shoes
            </p>
          <div>
                        <img
                        style = {{position: "absolute", transform: "translateY(-1.5rem)"}}
                        src={require('../../images/payments2.png')}
                        alt="payments"
                        height="40px"
                        width="350px"/>
          </div>
        </div>

                </Col>
            </Col>
          </Row>

          </Container>

          <Row>
            <Col style = {{direction: "rtl"}}>
            <div style = {{height: "1.5rem"}}/>


            <div className = 'divider-white'/>
            <div style = {{height: "1.1rem"}}/>

            <b style = {{cursor: "pointer", textDecoration: "underline"}}>
              פיתוח ועיצוב אתרים &nbsp; - &nbsp; <b>Omer Yanai</b>
            </b><CopyrightIcon style = {{fontSize: "1.3rem", marginBottom: "3px"}}/>

            {isMobile && (
                  <>
                <div style = {{height: "1rem"}}/>
                <div className = 'divider-white'/>
                </>
                  )}
            </Col>
          </Row>
        
      </footer>

      <Modal show={showModal} onHide={handleCloseModal} style = {{direction: "rtl"}}>
            <Modal.Header>
              <Modal.Title>צרו קשר במייל</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <b>escapeilhelp@gmail.com</b>
            </Modal.Body>
          </Modal>
          
      {/* <p className="text-center">Copyright &copy; {new Date().getFullYear()} Omer Yanai</p> */}
    </div>
  );
};

export default MyFooter;
