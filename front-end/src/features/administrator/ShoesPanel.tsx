import { Pagination } from '@mui/material';
import { useEffect, useState } from 'react';
import { Button, Container, Modal, Table } from 'react-bootstrap';
import { BsTrash, BsTrashFill } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { myServer } from '../../endpoints/endpoints';
import { Shoe } from '../../models/Shoe';
import { deleteShoeAsync, getPagedShoesAsync, getShoesAmountAsync, selectPagedShoes, selectShoesAmount } from './administratorSlice';

const ShoesPanel = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  
  const shoes = useAppSelector(selectPagedShoes);

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

  const [page, setPage] = useState(1);

  useEffect(() => {
    dispatch(getPagedShoesAsync(page));

    dispatch(getShoesAmountAsync());
  }, [page]);

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

        <div className="append-admin-button">
        <Button onClick = {() => {navigate(`/administrator/brands`)}} variant="warning" >
              NEW BRAND
            </Button>
        <Button onClick = {() => {navigate(`/administrator/post_shoe`)}} variant="warning">
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
                <img alt="shoepic" height = {200} width = {200} src = {`${myServer}/static/images/${shoe.images[0]}`}/><br/>
                  </td>
                <td onClick={() => navigate(`/administrator/put_shoe/${shoe.id}`)} style={{ textAlign: "center", verticalAlign: "middle", height: "100px" }}>{shoe.name}</td>
                <td onClick={() => navigate(`/administrator/put_shoe/${shoe.id}`)} style={{ textAlign: "center", verticalAlign: "middle", height: "100px" }}>{shoe.model}</td>
                <td onClick={() => navigate(`/administrator/put_shoe/${shoe.id}`)} style={{ textAlign: "center", verticalAlign: "middle", height: "100px" }}>{shoe.description}</td>
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