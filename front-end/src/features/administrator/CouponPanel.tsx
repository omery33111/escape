import { useEffect, useState } from 'react';
import { Button, Container, Modal, Table } from 'react-bootstrap';
import { BsTrash, BsTrashFill } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { deleteCouponAsync, getCouponsAsync, selectCoupons } from './administratorSlice';
import { Coupon } from '../../models/Coupon';

const CouponPanel = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  
  const coupons = useAppSelector(selectCoupons);

  const [showModal, setShowModal] = useState(false);
  const [selected, setSelected] = useState<Coupon | null>(null);

  const handleDeleteClick = (item: Coupon) => {
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
        dispatch(deleteCouponAsync(selected.id));
      }
      setShowModal(false);
    }
  };

  const [page, setPage] = useState(1);

  useEffect(() => {
    dispatch(getCouponsAsync());
  }, []);

  return (
    <div>
      <Container className="admin-table">
      <div className="pagination-admin">
          </div>
        <h1 style={{ padding: "15px" }}>COUPONS</h1>
        <br />
        <br />
        <div className="append-admin-button">
        <Button onClick = {() => {navigate(`/administrator/post_coupon`)}} variant="warning" >
              NEW COUPON
            </Button>
            </div>
        <Table striped bordered hover>
          <thead>
            <tr style={{ backgroundColor: "#5A5A5A", color: "white", textAlign: "center", verticalAlign: "middle" }}>
              <th>ID</th>
              <th>קוד קופון</th>
              <th>אחוזי הנחה</th>
              <th>חד פעמי / רב שימושי</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {coupons.slice().reverse().map((coupon) => (
              <tr
                key={coupon.id}
                style={{ cursor: "pointer" }}>
                <td onClick={() => navigate(`/administrator/put_coupon/${coupon.id}/`)} style={{ textAlign: "center", verticalAlign: "middle", height: "100px", color: "black" }}>{coupon.id}</td>
                <td onClick={() => navigate(`/administrator/put_coupon/${coupon.id}/`)} style={{ textAlign: "center", verticalAlign: "middle", height: "100px" }}>{coupon.name}</td>
                <td onClick={() => navigate(`/administrator/put_coupon/${coupon.id}/`)} style={{ textAlign: "center", verticalAlign: "middle", height: "100px" }}>{coupon.discount}%</td>
                <td onClick={() => navigate(`/administrator/put_coupon/${coupon.id}/`)} style={{ textAlign: "center", verticalAlign: "middle", height: "100px" }}>{coupon.one_time ? ("חד פעמי") : ("רב שימושי")}</td>
                <td style={{ textAlign: "center", verticalAlign: "middle", height: "100px" }}>
                  <Button
                    variant="danger"
                    style={{borderRadius: "100%"}}
                    onClick={() => handleDeleteClick(coupon)}
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

export default CouponPanel;
