import { Pagination } from '@mui/material';
import { useEffect, useState } from 'react';
import { Button, Card, Col, Form, ListGroup, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { getPagedProfilesManagerAsync, getProfilesAmountAsync, searchProfileAsync, selectProfileSearch, selectProfilesAmount, selectProfilesManager, updateSearchProfile } from './administratorSlice';
import { GoSearch } from "react-icons/go";



const ProfileManagerPanel = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const profilesManager = useAppSelector(selectProfilesManager)
    const searchProfile = useAppSelector(selectProfileSearch)

    const handleSearchClick = () => {
      dispatch(searchProfileAsync({ searchQuery: searchProfile }));
    };

    const [page, setPage] = useState(1);

    useEffect(() => {
        dispatch(getPagedProfilesManagerAsync(page));
        dispatch(getProfilesAmountAsync());
    }, [dispatch, page]);

    const isTablet = window.innerWidth >= 0 && window.innerWidth <= 1024;

    function formatDate(dateString: any) {
      const date = new Date(dateString);
      const year = date.getFullYear();
      const month = (date.getMonth() + 1).toString().padStart(2, "0");
      const day = date.getDate().toString().padStart(2, "0");
      const hours = date.getHours().toString().padStart(2, "0");
      const minutes = date.getMinutes().toString().padStart(2, "0");
      return `${year}-${month}-${day}, ${hours}:${minutes}`;
    }

    const isMobile = window.innerWidth <= 768;

    const itemsAmount = useAppSelector(selectProfilesAmount);

    const itemsPerPage = 8;
  
    const totalPages = Math.ceil(itemsAmount / itemsPerPage);
  
    const nextPages = [];
    for (let i = page; i <= totalPages && i <= page + 4; i++) {
      nextPages.push(i);
    }


  return (
    <div>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
            <div style={{ fontSize: '1.7rem', textAlign: 'center' }}>
                כל הפרופילים
            </div>
          </div>



          <div style = {{height: "3rem"}}/>


          <div style = {{display: "flex", justifyContent: "space-between", textAlign: "center"}}>
          
          <Pagination
              count={totalPages}
              page={page}
              onChange={(event, newPage) => setPage(newPage)}
              size="small"
            />

          <Form style = {{display: "flex", direction: "rtl", gap: "20px"}}>
          <div>
            <Form.Group controlId="formProductName">
              <Form.Control
                placeholder = 'הזן שם משתמש'
                type="text"
                onChange={(event) => dispatch(updateSearchProfile(event.target.value))}
                value={searchProfile}/>
            </Form.Group>
            </div>

            <div>
            <Button variant = "" style = {{fontSize: "1.5rem", cursor: "pointer", padding: 0}} onClick={handleSearchClick}>
            <GoSearch/>
            </Button>
            </div>

          </Form>

            </div>

            <div style = {{height: "0.5rem"}}/>
            
            <div>
        {profilesManager.map((profile) => (
          <div key={profile.id}>
            <Card onClick = {() => navigate(`/administrator/user_orders/${profile.id}/`)} style={{ height: "230px", alignItems: "center", justifyContent: "center", display: "flex", borderRadius: 0, boxShadow: "0 0 6px 3px rgba(0, 0, 0, 0.1)", cursor: "pointer" }}>
              <Row style={{ gap: isTablet ? "0px" : "130px" }}>
                <Col className="d-flex align-items-center" style={{ width: "250px" }}>
                  <ListGroup style={{ justifyContent: "center", textAlign: "center" }}>
                    <div>{profile.id}</div>
                  </ListGroup>
                </Col>

                <Col className="d-flex align-items-center">
                  <ListGroup style={{ direction: "rtl", maxWidth: "170px", minWidth: "120px" }}>
                    {profile.shipping_address.map((address: any) => (
                      <ListGroup.Item key={address.id}>
                        {address.first_name} {address.last_name}
                        <br />
                        {address.city}
                        <br />
                        {address.address} {address.house_number}
                        <br />
                        0{address.phone_number}
                      </ListGroup.Item>
                    ))}
                  </ListGroup>
                </Col>
              </Row>

              <div style={{ position: "absolute", left: 10, bottom: 5, fontSize: "0.7rem" }}>
                <b>Date Joined: {formatDate(profile.date)}</b>
              </div>
            </Card>
            <div style={{ height: "3.5rem" }} />
          </div>
        ))}
      </div>

    </div>
  )
}

export default ProfileManagerPanel
