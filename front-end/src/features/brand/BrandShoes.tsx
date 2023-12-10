import { MenuItem, Pagination, Radio, Select } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { myServer } from "../../endpoints/endpoints";
import { getPagedShoesOfBrandAsync, getShoesAmountOfBrandAsync, getSingleBrandAsync, selectBrandShoes, selectSingleBrand, selectshoesOfBrandAmount } from "./brandSlice";
import './brand.css'
import { Button, Card } from "react-bootstrap";



const BrandShoes = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const shoes = useAppSelector(selectBrandShoes);

    
    const [page, setPage] = useState(1);

    const { id } = useParams();
    


    const brandsAmount = useAppSelector(selectshoesOfBrandAmount);

    const itemsPerPage = 20;

    const totalPages = Math.ceil(brandsAmount / itemsPerPage);

    const [orderBy, setOrderBy] = useState(1);

    const [selectedModels, setSelectedModels] = useState<string[]>(['0']);

    const handleModelSelection = (selectedModel: string) => {
      const index = selectedModels.indexOf(selectedModel);
      if (index === -1) {
        setSelectedModels([...selectedModels, selectedModel]);
      } else {
        const updatedModels = [...selectedModels];
        updatedModels.splice(index, 1);
        setSelectedModels(updatedModels);
      }
    };

    const handleOrderByChange = (event: any) => {
      setOrderBy(event.target.value);
    };


    useEffect(() => {
      if (id !== undefined)
      {
        dispatch(getPagedShoesOfBrandAsync({ id, page, orderBy, models: selectedModels.toString() }));
        dispatch(getShoesAmountOfBrandAsync(id));
        dispatch(getSingleBrandAsync(id));
      }
      
    }, [id, page, orderBy, selectedModels]);

    const singleBrand = useAppSelector(selectSingleBrand);

    const controlProps = (size: string) => ({
      checked: selectedModels.indexOf(size) !== -1,
      onChange: () => handleModelSelection(size),
    });


  return (
    <div>
        

        
        
        

        
        <div >
        <div style = {{direction: "rtl", marginBottom: '1rem'}}>

        <b style = {{fontSize: "1.7rem"}}>
          {singleBrand.name}
          </b><br/>

        <small>
        {singleBrand.description}
        </small>
        
        </div>

      <div>
          <div style = {{position: "absolute"}}>
        <Select value={orderBy} onChange={handleOrderByChange} variant="standard" className="rtl-select">
          <MenuItem value={1} style = {{direction: "rtl"}}>מיון לפי תאריך</MenuItem>
          <MenuItem value={2} style = {{direction: "rtl"}}>מהמחיר הנמוך לגבוה</MenuItem>
          <MenuItem value={3} style = {{direction: "rtl"}}>מהמחיר הגבוה לנמוך</MenuItem>
        </Select>
          </div>
        
        <div style = {{direction: "rtl", marginRight: "20dvh"}}>
        <Pagination
              count={totalPages}
              page={page}
              onChange={(event, newPage) => setPage(newPage)}
              size="small"
            />
        </div>
      </div>
            <br/>

<div style = {{display: "flex", direction: "rtl", position: "absolute", gap: "3rem"}}>
<div style = {{direction: "ltr", textAlign: "right"}}>
      {singleBrand.models.map((model) => (
        <div key={model} style={{ marginBottom: '1rem', width: "110px" }}>
          <label className="radio-label">
            {model}
          </label>
          <input
            {...controlProps(model)}
            type="radio"
            className="black-radio"
            onClick={() => handleModelSelection(model)}
          />
        </div>
      ))}
    </div>
            <br/>

      <div className="map-items">
      {shoes.map((shoe) => (
        <Card key={shoe.id} className = "map-item sharp-border">
          <Card.Body>
          

            {shoe.images.map((image, index) => (
              <div key={index}>
                <img
                  onClick={() => navigate(`/brand/shoe/${shoe.id}`)}
                  style={{ cursor: 'pointer', padding: '30px' }}
                  src={`${myServer}/static/images/${image}`}
                  width="100%"
                  height="100%"
                  alt={`shoe${index + 1}`}
                />
              </div>
            ))}

            <Card.Title>{shoe.name}</Card.Title>
            <Card.Text>
              Price before: {shoe.price_before} <br />
              Real price: {shoe.price}
            </Card.Text>

            <Button onClick={() => navigate(`/brand/shoe/${shoe.id}`)}>
              View Details
            </Button>
          </Card.Body>
        </Card>
      ))}
      </div>
  </div>
  </div>
        


    </div>
  )
}

export default BrandShoes