import { Pagination } from '@mui/material';
import { useEffect, useState } from 'react';
import { Button, Container, Form, Modal, Table } from 'react-bootstrap';
import { BsTrash, BsTrashFill } from 'react-icons/bs';
import { GoSearch } from 'react-icons/go';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { myServer } from '../../endpoints/endpoints';
import { Shoe } from '../../models/Shoe';
import { deleteShoeAsync, getPagedShoesAsync, getShoesAmountAsync, searchShoeAsync, selectPagedShoes, selectShoeSearch, selectShoesAmount, setShoeSearch } from './administratorSlice';



const ShoesPanel = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  
  const shoes = useAppSelector(selectPagedShoes);
  const searchShoe = useAppSelector(selectShoeSearch)

  const handleSearchClick = () => {
    dispatch(searchShoeAsync({ searchQuery: searchShoe }));
  };
  
  const [page, setPage] = useState(1);

  useEffect(() => {
    dispatch(getPagedShoesAsync(page));
    dispatch(getShoesAmountAsync());
  }, [dispatch, page]);

  const [showModal, setShowModal] = useState(false);
  const [selectedShoe, setSelectedShoe] = useState<Shoe | null>(null);

  const handleDeleteClick = (shoe: Shoe) => {
    setSelectedShoe(shoe);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setSelectedShoe(null);
    setShowModal(false);
  };

  const handleDelete = () => {
    if (selectedShoe) {
      if (selectedShoe.id) {
        dispatch(deleteShoeAsync(selectedShoe.id));
      }
      setShowModal(false);
    }
  };


  const shoesAmount = useAppSelector(selectShoesAmount);

  const itemsPerPage = 10;

  const totalPages = Math.ceil(shoesAmount / itemsPerPage);

  const nextPages = [];
  for (let i = page; i <= totalPages && i <= page + 4; i++) {
    nextPages.push(i);
  }


  return (
    <div>
      <Container className="admin-table">
      <div className="pagination-admin">
        <Pagination
              count={totalPages}
              page={page}
              onChange={(event, newPage) => setPage(newPage)}
              size="small"
            />
          </div>
        <h1 style={{ padding: "15px" }}>SHOES</h1>
        <br />
        <br />

        <div className="append-admin-button" style = {{transform: "translateX(27rem) translateY(-1rem)"}}>


        <div style={{ position: "relative", right: "6px", display: "flex", gap: "10px" }}>

        <Form style = {{display: "flex", direction: "rtl", gap: "20px"}}>
          <div>
            <Form.Group controlId="formProductName">
              <Form.Control
                placeholder = 'הזן שם דגם'
                type="text"
                onChange={(event) => dispatch(setShoeSearch(event.target.value))}
                value={searchShoe}/>
            </Form.Group>
            </div>

            <div>
            <Button variant = "" style = {{fontSize: "1.5rem", cursor: "pointer", padding: 0}} onClick={handleSearchClick}>
            <GoSearch/>
            </Button>
            </div>

          </Form>

          </div>
          <Button onClick={() => { navigate(`/administrator/shoes_blacklist`) }} variant="danger">
            BLACKLIST
          </Button>
          <Button onClick={() => { navigate(`/administrator/coupons`) }} variant="info">
            COUPON
          </Button>
          <Button onClick={() => { navigate(`/administrator/brands`) }} variant="warning" >
            NEW BRAND
          </Button>
          <Button onClick={() => { navigate(`/administrator/post_shoe`) }} variant="warning">
            NEW SHOE
          </Button>
        </div>

        <Table striped bordered hover>
          <thead>
            <tr style={{ backgroundColor: "#5A5A5A", color: "white", textAlign: "center", verticalAlign: "middle" }}>
              <th>ID</th>
              <th>תמונה</th>
              <th>שם הנעל</th>
              <th>דגם</th>
              <th>תיאור</th>
              <th>מחיר</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {shoes.slice().reverse().map((shoe) => (
              <tr
                key={shoe.id}
                style={{ cursor: "pointer" }}>
                <td onClick={() => navigate(`/administrator/put_shoe/${shoe.id}`)} style={{ textAlign: "center", verticalAlign: "middle", height: "100px", color: "black" }}>{shoe.id}</td>
                <td onClick={() => navigate(`/administrator/put_shoe/${shoe.id}`)} style={{ textAlign: "center", verticalAlign: "middle", height: "100px", color: "black" }}>
                <img alt="shoepic" height = {200} width = {200} src = {`${myServer}/media/${shoe.images[0]}`}/><br/>
                  </td>
                <td onClick={() => navigate(`/administrator/put_shoe/${shoe.id}`)} style={{ textAlign: "center", verticalAlign: "middle", height: "100px" }}>{shoe.name}</td>
                <td onClick={() => navigate(`/administrator/put_shoe/${shoe.id}`)} style={{ textAlign: "center", verticalAlign: "middle", height: "100px" }}>{shoe.model}</td>
                <td onClick={() => navigate(`/administrator/put_shoe/${shoe.id}`)} style={{ textAlign: "center", verticalAlign: "middle", height: "100px" }}><pre>{shoe.description}</pre></td>
                <td onClick={() => navigate(`/administrator/put_shoe/${shoe.id}`)} style={{ textAlign: "center", verticalAlign: "middle", height: "100px" }}>{shoe.price}</td>
                <td style={{ textAlign: "center", verticalAlign: "middle", height: "100px" }}>
                  <Button
                    variant="danger"
                    style={{borderRadius: "100%"}}
                    onClick={() => handleDeleteClick(shoe)}
                  >
                    <h3><BsTrashFill style={{color: "white"}} /></h3>
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        <div style={{ height: 300 }} />
      </Container>

      <Modal show={showModal} onHide={handleCloseModal} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>
            <BsTrash /> Delete Warning
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete "{selectedShoe?.name}"?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
          <Button variant="danger" onClick={handleDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ShoesPanel;