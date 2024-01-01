import { Autocomplete, Button, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import { useEffect } from 'react';
import { Alert, Col, Container, Row } from 'react-bootstrap';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { logoutAsync } from '../authentication/authenticationSlice';
import AddressManagement from '../shipping/AddressManagement';
import { deleteAddressAsync, selectAddress } from '../shipping/shippingSlice';
import { getProfileAsync, selectMyProfile } from './profileSlice';
import { selectCart } from '../cart/cartSlice';




const Profile = () => {
    const dispatch = useAppDispatch();

   

    useEffect(() => {
        dispatch(getProfileAsync());
      }, [dispatch]);

    const profile = useAppSelector(selectMyProfile)

    const cart = useAppSelector(selectCart)
      

    const handleLogout = () => {
        dispatch(logoutAsync())
    };


    const isTablet = window.innerWidth >= 0 && window.innerWidth <= 1024;

    const isMobile = window.innerWidth <= 768;

    const monthAgoDate = new Date();
    monthAgoDate.setMonth(monthAgoDate.getMonth() - 1);

  return (
    <div style = {{border: "1px solid black", padding: "2rem", borderTop: "none", transform: "translateY(-80px)"}}>
              
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
          <div style={{ fontSize: '1.7rem', textAlign: 'center' }}>
            החשבון שלי
          </div>

          <div style={{ alignSelf: 'flex-end', marginTop: '-32px' }}>
            <b onClick={handleLogout} style={{ color: 'red', cursor: 'pointer' }}>התנתקות</b>
          </div>
      </div>
      
      <div style = {{marginTop: "110px"}}>


      <Container fluid style = {{height: isTablet ? "" : "35dvh"}}>
      <Row>

        <Col md={isTablet ? 12 : 6} xs={{ order: isTablet ? "2" : "1" }}>

          {isTablet && (<div style = {{height: "5rem"}}/>)}
    
              <div style = {{direction: "rtl", marginTop: "-2rem", fontSize: isMobile ? "0.8rem" : "1rem"}}><b>ההזמנות האחרונות שלי (מתאריך {monthAgoDate.toLocaleDateString('he-IL')}):</b></div>

              <div style = {{height: "3rem"}}/>
              {/* REPLACE CART.LENGTH WITH ORDER.LENGTH WHEN DOING ORDER!!!!!!!! IMPORTANT!!!! */}
              {cart.length === 0 && (
                <Alert variant="dark" style = {{direction: "rtl"}}>
                <Alert.Heading>אין הזמנות חדשות</Alert.Heading>
                <b>לא ביצעת הזמנות בחודש האחרון. למעבר לכל ההזמנות, המשך לעיין.</b>
                </Alert>
              )}

        <div style = {{width: isMobile ? "100%" : "55%", transform: "translateY(8rem)"}}>
            <Button style = {{backgroundColor: "black", border: "0px solid black", height: "3rem", width: "100%", borderRadius: "0px", color: "white"}}>
              <b>
            לכל ההזמנות    
            </b>
            </Button>
            </div>
        </Col>
        
        <Col md={isTablet ? 12 : 6} xs={{ order: isTablet ? "1" : "2" }}>

        <div style = {{direction: "rtl", marginTop: "-2rem"}}><b>הפרטים שלי</b></div>

        <br/>

        <div>
          <AddressManagement />
          </div>


        </Col>
      </Row>
      <div style = {{height: "7rem"}}/>
    </Container>

      </div>

      
    </div>
  )
}

export default Profile