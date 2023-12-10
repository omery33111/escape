import { useEffect } from "react";
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import { getAllBrandsAsync, selectAllBrands } from "../brand/brandSlice";
import { Container, Nav, Navbar } from "react-bootstrap";
import './navigators.css';



const BrandNavbar = () => {
    const dispatch = useAppDispatch()

    const brands = useAppSelector(selectAllBrands);


    useEffect(() => {
        dispatch(getAllBrandsAsync());
      }, [dispatch]);

  return (
    <div>
        <Navbar bg="dark" data-bs-theme="dark">

            <Container style = {{justifyContent: "center", display: "flex", textAlign: "center", gap: "40px"}}>

            {brands.map((brand) => (
            <div key={brand.id}>
              <Nav>
                <Nav.Link as={Link} to={`/brand/shoes/${brand.id}/`}>
                  <b>{brand.name}</b>
                </Nav.Link>
              </Nav>
            </div>
          ))}

            </Container>

            </Navbar>
    </div>
  )
}

export default BrandNavbar