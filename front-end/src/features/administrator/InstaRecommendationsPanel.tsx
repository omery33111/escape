import { Pagination } from '@mui/material';
import { useEffect, useState } from 'react';
import { Button, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { myServer } from '../../endpoints/endpoints';
import { deleteInstaRecAsync, getInstaRecAmountAsync, getPagedInstaRecsAsync, selectAdminPagedInstaRec, selectInstaRecAmount } from './administratorSlice';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';



const InstaRecommendationsPanel = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  
  const instaRecs = useAppSelector(selectAdminPagedInstaRec);

  const [page, setPage] = useState(1);

  useEffect(() => {
    dispatch(getPagedInstaRecsAsync(page));

    dispatch(getInstaRecAmountAsync());
  }, [page]);

  const itemsAmount = useAppSelector(selectInstaRecAmount);

  const itemsPerPage = 12;

  const totalPages = Math.ceil(itemsAmount / itemsPerPage);

  const nextPages = [];
  for (let i = page; i <= totalPages && i <= page + 4; i++) {
    nextPages.push(i);
  }


  return (
    <div>

            <div>
            <Pagination
              count={totalPages}
              page={page}
              onChange={(event, newPage) => setPage(newPage)}
              size="small"
            />
            
            <div className="append-admin-button">
              
              <Button onClick = {() => {navigate(`/administrator/post_instagram_rec`)}} variant="warning">
                    NEW RECOMMENDATION
              </Button>


            </div>
            </div>


            <div className="admin-insta-recs-map">

              {instaRecs.slice().reverse().map((rec) => (
              <Card key={rec.id} style = {{}}>
              <div>
                  <img
                    style={{ cursor: "pointer" }}
                    src={`${myServer}${rec.image}`}
                    width={"300px"}
                    height={"300px"}
                  />
                  <DeleteForeverIcon style = {{cursor: "pointer", transform: "translateY(1.5rem)", color: "red"}} onClick={() => dispatch(deleteInstaRecAsync(Number(rec.id)))}/>
                  </div>
              </Card>
              ))}
              
     
    </div>
  </div>
  );
};

export default InstaRecommendationsPanel;
