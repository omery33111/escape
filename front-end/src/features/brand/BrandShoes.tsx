import { MenuItem, Pagination, Select } from "@mui/material";
import { Theme } from "@mui/material/styles"; // Import Theme from correct path
import { makeStyles } from "@mui/styles";
import { useEffect, useRef, useState } from "react";
import { Card } from "react-bootstrap";
import { BiSolidCart, BiSolidCartAdd } from "react-icons/bi";
import { FaRegHeart } from "react-icons/fa";
import { FaHeart } from "react-icons/fa6";
import { GiConverseShoe } from "react-icons/gi";
import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { myServer } from "../../endpoints/endpoints";
import { addProduct, removeProduct, selectCart } from "../cart/cartSlice";
import { addWish, removeWish, selectWishList } from "../wishlist/wishListSlice";
import './brand.css';
import { getPagedShoesOfBrandAsync, getShoesAmountOfBrandAsync, getSingleBrandAsync, selectBrandShoes, selectSingleBrand, selectshoesOfBrandAmount } from "./brandSlice";



const useStyles = makeStyles((theme: Theme) => ({
  rtlSelect: {
    '&.MuiInput-underline:after': {
      borderBottom: '2px solid red',
    },
    '& .MuiSelect-root': {
      color: 'white',
    },
  },
  paginator: {
    "& .MuiPaginationItem-root": {
      color: "#ffffff", // Change the color to white or any desired color
    },
  },
}));



const BrandShoes = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const shoes = useAppSelector(selectBrandShoes);

    const wishlist = useAppSelector(selectWishList);
    const cart = useAppSelector(selectCart);

    
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

    const classes = useStyles();


    const [imageIndexes, setImageIndexes] = useState<number[]>([]);

    const [hoveredItem, setHoveredItem] = useState<number | null>(null);

    
    useEffect(() => {
      setImageIndexes(new Array(shoes.length).fill(0));
    }, [shoes]);
  
    const intervalIdsRef = useRef<NodeJS.Timeout[]>([]);
  
    const handleMouseEnter = (shoeIndex: number) => {
      setHoveredItem(shoeIndex);

      intervalIdsRef.current[shoeIndex] = setTimeout(() => {
        setImageIndexes((prevIndexes) => {
          const newIndexes = [...prevIndexes];
          newIndexes[shoeIndex] = (newIndexes[shoeIndex] + 1) % shoes[shoeIndex].images.length;
          return newIndexes;
        });
        intervalIdsRef.current[shoeIndex] = setInterval(() => {
          setImageIndexes((prevIndexes) => {
            const newIndexes = [...prevIndexes];
            newIndexes[shoeIndex] = (newIndexes[shoeIndex] + 1) % shoes[shoeIndex].images.length;
            return newIndexes;
          });
        }, 600);
      }, 1200);
    };
  
    const handleMouseLeave = (shoeIndex: number) => {
      setHoveredItem(null);
      clearTimeout(intervalIdsRef.current[shoeIndex]); // Clear initial delay timeout
      clearInterval(intervalIdsRef.current[shoeIndex]); // Clear subsequent interval
      setImageIndexes((prevIndexes) => {
        const newIndexes = [...prevIndexes];
        newIndexes[shoeIndex] = 0; // Reset to the first image
        return newIndexes;
      });
    };




  return (
    <div>
        

        
        
        

        
        <div>
        <div style = {{direction: "rtl", marginBottom: '4rem', textAlign: "center"}}>

        <b style = {{fontSize: "1.7rem"}}>
          {singleBrand.name}
          </b><br/>

        <small>
        {singleBrand.description}
        </small>
        
        </div>

      <div style = {{display: "flex", justifyContent: "space-between", backgroundColor: "#1A002E", padding: "15px"}}>
          <div style = {{position: "relative"}}>
          <Select
            value={orderBy}
            onChange={handleOrderByChange}
            variant="standard"
            className={`${classes.rtlSelect} rtl-select`}
            style={{ color: "white" }}
          >
            <MenuItem value={1} style={{ direction: "rtl" }}>
              מיון לפי תאריך
            </MenuItem>
            <MenuItem value={2} style={{ direction: "rtl" }}>
              מהמחיר הנמוך לגבוה
            </MenuItem>
            <MenuItem value={3} style={{ direction: "rtl" }}>
              מהמחיר הגבוה לנמוך
            </MenuItem>
          </Select>
          </div>
        
          <div style = {{ flex: "1", display: "flex", textAlign: "center", justifyContent: "center", position: "relative", bottom: -3, fontSize: "0.8rem", color: "white", flexWrap: 'wrap-reverse' }}>
          {singleBrand.models && singleBrand.models.length > 0 && singleBrand.models.map((model) => (
  <div key={model} style={{ width: String(model).length > 10 ? "210px" : "120px" }}>        
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

        <div style = {{color: "white", position: "relative", top: 3}}>
        <Pagination
        classes={{ ul: classes.paginator }} // Apply the classes to Pagination
        style={{ backgroundColor: "#1A002E" }}
        count={totalPages}
        page={page}
        onChange={(event, newPage) => setPage(newPage)}
        size="small"/>
        </div>
      </div>
            <br/>

<div style = {{display: "flex", direction: "rtl"}}>

            <br/>

            <div className="map-items">
            {shoes.map((shoe, shoeIndex) => (
          <Card key={shoe.id} className="map-item sharp-border">
            <Card.Body>
                <div style={{ padding: "25px" }}>
                <img
                  className="image-container-brand"
                  onMouseEnter={() => handleMouseEnter(shoeIndex)}
                  onMouseLeave={() => handleMouseLeave(shoeIndex)}
                  onClick={() => navigate(`/brand/shoe/${shoe.id}`)}
                  style={{ cursor: "pointer" }}
                  src={`${myServer}/static/images/${shoe.images[imageIndexes[shoeIndex]]}`}
                  width="100%"
                  height="100%"
                />
                </div>

              <div>
                <Card.Text style = {{width: "100%", height: "50px"}}>{shoe.name}</Card.Text>
                <div style={{ display: "flex", justifyContent: "center", gap: `${shoe.price_before ? '2.5dvh' : '0dvh'}` }}>
                <div className={hoveredItem === shoeIndex ? "card-info-hover" : "card-info"}>
                <b>₪{shoe.price}</b>
                </div>
  
  {shoe.price_before ? (
    <div style={{ position: "relative"}}>
      <b>
      ₪{shoe.price_before}
      </b>
      <span
        style={{
          color: "rgba(255, 0, 0, 0.3)", // Red color with 50% transparency
          position: "absolute",
          top: -2,
          bottom: 0,
          right: "1px", // Adjust this value for proper alignment
          fontSize: "25px",
          transform: "rotate(90deg) scaleY(4.1) scaleX(1.3)", // Stretching X horizontally
          display: "inline-block",
        }}
      >
        X
      </span>
    </div>
  ) : (
    ""
  )}
</div>
                </div>
                <hr />
                <div style = {{display: "flex", justifyContent: "space-evenly"}}>
                
                <div style = {{cursor: "pointer", color: "#3C005A", position: "relative", top: "-2px"}}>

                {cart.find((item) => String(item.id) === String(shoe.id))
              ? <BiSolidCart style = {{fontSize: "2rem"}} onClick={() => dispatch(removeProduct({ item: shoe }))}/>
              : <BiSolidCartAdd style = {{fontSize: "2rem"}} onClick={() => dispatch(addProduct({ item: shoe }))}/>}
                
                </div>
                
                <div style = {{cursor: "pointer", color: "#3C005A"}} onClick={() => navigate(`/brand/shoe/${shoe.id}`)}>
                <GiConverseShoe style = {{fontSize: "2rem", position: "relative", right: "-4px", top: "0px"}}/>
                <div style = {{position: "absolute", fontSize: "0.8rem", marginRight: "-30px", marginTop: "-5px"}}>
                לעמוד הנעל!
                </div>
                </div>

                <div style = {{cursor: "pointer", color: "#3C005A"}}>
                {wishlist.find((item) => String(item.id) === String(shoe.id))
              ? <FaHeart style = {{fontSize: "1.6rem", position: "relative", top: '3px'}} onClick={() => dispatch(removeWish({ item: shoe }))}/>
              : <FaRegHeart style = {{fontSize: "1.6rem", position: "relative", top: '3px'}} onClick={() => dispatch(addWish({ item: shoe }))}/>}
                </div>

                </div>
              
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