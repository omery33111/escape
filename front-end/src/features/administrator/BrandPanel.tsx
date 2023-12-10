import { Pagination } from '@mui/material';
import { useEffect, useState } from 'react';
import { Button, Container, Modal, Table } from 'react-bootstrap';
import { BsTrash, BsTrashFill } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { Brand } from '../../models/Brand';
import { deleteBrandAsync, getBrandsAmountAsync, getPagedBrandsAsync, selectBrandsAmount, selectPagedBrands } from './administratorSlice';

const BrandPanel = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  
  const brands = useAppSelector(selectPagedBrands);

  const [showModal, setShowModal] = useState(false);
  const [selected, setSelected] = useState<Brand | null>(null);

  const handleDeleteClick = (item: Brand) => {
    setSelected(item);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setSelected(null);
    setShowModal(false);
  };

  const handleDelete = () => {
    if (selected) {
      if (selected.id) {
        dispatch(deleteBrandAsync(selected.id));
      }
      setShowModal(false);
    }
  };

  const [page, setPage] = useState(1);

  useEffect(() => {
    dispatch(getPagedBrandsAsync(page));

    dispatch(getBrandsAmountAsync());
  }, [page]);

  const itemsAmount = useAppSelector(selectBrandsAmount);

  const itemsPerPage = 10;

  const totalPages = Math.ceil(itemsAmount / itemsPerPage);

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
        <h1 style={{ padding: "15px" }}>BRANDS</h1>
        <br />
        <br />
        <div className="append-admin-button">
        <Button onClick = {() => {navigate(`/administrator/shoes`)}} variant="warning" >
              NEW SHOE
            </Button>
            <Button onClick = {() => {navigate(`/administrator/post_brand`)}} variant="warning">
              NEW BRAND
            </Button>
            </div>
        <Table striped bordered hover>
          <thead>
            <tr style={{ backgroundColor: "#5A5A5A", color: "white", textAlign: "center", verticalAlign: "middle" }}>
              <th>ID</th>
              <th>שם מותג</th>
              <th>דגמים</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {brands.slice().reverse().map((brand) => (
              <tr
                key={brand.id}
                style={{ cursor: "pointer" }}>
                <td onClick={() => navigate(`/administrator/put_brand/${brand.id}/`)} style={{ textAlign: "center", verticalAlign: "middle", height: "100px", color: "black" }}>{brand.id}</td>
                <td onClick={() => navigate(`/administrator/put_brand/${brand.id}/`)} style={{ textAlign: "center", verticalAlign: "middle", height: "100px" }}>{brand.name}</td>
                <td onClick={() => navigate(`/administrator/put_brand/${brand.id}/`)} style={{ textAlign: "center", verticalAlign: "middle", height: "100px" }}>{brand.models.map((model, index) => (
                                                                                                                                                              <div key={index}>{model}</div>))}
                                                                                                                                                              </td>
                <td style={{ textAlign: "center", verticalAlign: "middle", height: "100px" }}>
                  <Button
                    variant="danger"
                    style={{borderRadius: "100%"}}
                    onClick={() => handleDeleteClick(brand)}
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
        <Modal.Body>Are you sure you want to delete "{selected?.name}"?</Modal.Body>
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

export default BrandPanel;
