import React, { useEffect, useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import { getAllBrandsAsync, getPagedShoesOfBrandAsync, selectAllBrands } from "../brand/brandSlice";
import { Container, Nav, Navbar, Dropdown } from "react-bootstrap";
import './navigators.css';

const BrandNavbar = () => {
  
  const dispatch = useAppDispatch();
  const brands = useAppSelector(selectAllBrands);
  const [selectedBrand, setSelectedBrand] = useState(null);
  const [hoveredItem, setHoveredItem] = useState(null);
  const [page, setPage] = useState(1);
  const [orderBy, setOrderBy] = useState(1);
  let brandTimer: ReturnType<typeof setTimeout>;

  useEffect(() => {
    dispatch(getAllBrandsAsync());
  }, [dispatch]);


  const handleDropdownEnter = (brandId: any) => {
    clearTimeout(brandTimer);
    setSelectedBrand(brandId);
  };

  const handleDropdownLeave = () => {
    brandTimer = setTimeout(() => {
      setSelectedBrand(null);
      setHoveredItem(null);
    }, 300);
  };

  const handleItemHover = (index: any) => {
    setHoveredItem(index);
  };

  const navigate = useNavigate();

  const handleDropdownClick = (brandId: any, selectedModel: string) => {
    const timer = setTimeout(() => {
    dispatch(getPagedShoesOfBrandAsync({
        id: brandId,
        page,
        orderBy,
        models: selectedModel,
      })
    );
  }, 100);
  
    navigate(`/brand/shoes/${brandId}/`);
  };


  


  return (
    <div>
      <br />
      <Navbar bg="dark" data-bs-theme="dark" style={{ padding: '15px 0' }}>
        <Container
          style={{
            justifyContent: 'center',
            display: 'flex',
            textAlign: 'center',
            gap: '40px',
          }}
        >
          {brands.map((brand) => (
            <Dropdown
            
              key={brand.id}
              show={selectedBrand === brand.id}
              onMouseEnter={() => handleDropdownEnter(brand.id)}
              onMouseLeave={handleDropdownLeave}
            >
              <Dropdown.Toggle as={Nav.Link}>
                
              <Link to={`/brand/shoes/${brand.id}/`} style={{ textDecoration: 'none', color: 'white' }}>
                  <b>{brand.name}</b>
                </Link>
              </Dropdown.Toggle>
              <Dropdown.Menu style={{ backgroundColor: 'white', border: "1px solid black" }}>
                {brand.models.map((model, index) => (
                  <Dropdown.Item
                    key={index}
                    style={{
                      color: hoveredItem === index ? 'white' : 'black',
                    }}
                    onMouseEnter={() =>
                      handleItemHover(index)
                    }
                    onClick={() =>
                      handleDropdownClick(brand.id, model)
                    } // Handle the click on the model here
                  >
                    {model}
                  </Dropdown.Item>
                ))}
              </Dropdown.Menu>
            </Dropdown>
          ))}
        </Container>
      </Navbar>
    </div>
  )
}

export default BrandNavbar;
