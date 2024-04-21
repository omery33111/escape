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
import { getPagedShoesOfBrandAsync, getShoesAmountOfBrandAsync, getSingleBrandAsync, selectBrandLoading, selectBrandPages, selectBrandShoes, selectSingleBrand, selectshoesOfBrandAmount } from "./brandSlice";
import { Shoe } from "../../models/Shoe";



const isMobile = window.innerWidth <= 768;


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
      color: "#ffffff",
      fontSize: isMobile ? "0.7rem" : "1rem",
    },

    "& .MuiPaginationItem-icon": {
      fontSize: isMobile ? "0.7rem" : "1rem",
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
    
    const isLoading = useAppSelector(selectBrandLoading);


    const brandsAmount = useAppSelector(selectshoesOfBrandAmount);

    console.log(brandsAmount)

    const itemsPerPage = 32;

    const totalPages = Math.ceil(brandsAmount / itemsPerPage);


    const [orderBy, setOrderBy] = useState(1);

    const [selectedModels, setSelectedModels] = useState(['בחר דגם']);

    
    useEffect(() => {
      setSelectedModels(['בחר דגם']);
    }, [id]);


const handleModelSelection = (selectedModel: string) => {
    if (selectedModels.includes(selectedModel)) {
        // If already selected, remove it
        setSelectedModels(['0']);
    } else {
        // If not selected, set it as the only selected model
        setSelectedModels([selectedModel]);
    }
};



    useEffect(() => {
      if (id !== undefined) {
        
        if (selectedModels.length === 1 && selectedModels[0] === 'בחר דגם') {
          dispatch(getPagedShoesOfBrandAsync({
            id, page, orderBy,
            models: "0"
          }));
        } else {
          dispatch(getPagedShoesOfBrandAsync({ 
            id, page, orderBy, 
            models: selectedModels.toString() 
          }));
        }

        dispatch(getShoesAmountOfBrandAsync(id));
        dispatch(getSingleBrandAsync(id));
      }
      
    }, [id, page, orderBy, selectedModels]);


    const singleBrand = useAppSelector(selectSingleBrand);

    const numberOfPages = useAppSelector(selectBrandPages);

    const handleOrderByChange = (event: any) => {
      setOrderBy(event.target.value);
    };


    const controlProps = (size: string) => ({
      checked: selectedModels[0] === size,
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


    const [isHovered, setIsHovered] = useState<number | null>(null);

    
    const [heartClicked, setHeartClicked] = useState<number>(-1);

    const [cartClicked, setCartClicked] = useState<number>(-1);


  return (
    <div>
        

        
        

        
        <div>

        <div style = {{direction: "rtl", marginBottom: '4rem', textAlign: "right"}}>
        
        <div style = {{color: "#700000", fontSize: "0.7rem", display: "flex", cursor: "pointer", margin: "10px 0px", width: "15rem" }}>

          <div onClick = {() => navigate("/")}>
          דף הבית
          </div>

          &nbsp;/&nbsp;

          <div onClick = {() => navigate(`/brand/shoes/${id}/`)}>
          {singleBrand.name}
          </div>

        </div>

        <div style = {{fontSize: "2.3rem"}}>
          {singleBrand.name}
          </div><br/>

        <pre>
        {singleBrand.description}
        </pre>
        
        </div>

      <div style = {{display: "flex", justifyContent: "space-between", backgroundColor: "#1A002E", padding: "15px"}}>
          <div style = {{position: "relative"}}>
          <Select
            value={orderBy}
            onChange={handleOrderByChange}
            variant="standard"
            className={`${classes.rtlSelect} rtl-select`}
            style={{ color: "white", fontSize: isMobile ? "0.6rem" : "1rem" }}>
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
        
          {isMobile ? (
          <div style={{ position: 'absolute', transform: 'translateX(8rem)' }}>
            <Select
              multiple
              value={selectedModels}
              onChange={(event) => setSelectedModels(event.target.value as string[])}
              variant="standard"
              className={`${classes.rtlSelect} rtl-select`}
              style={{ color: 'white', fontSize: isMobile ? '0.6rem' : '1rem' }}
              renderValue={(selected) => (
                <div>
                  {(selected as string[]).includes('בחר דגם') ? 'בחר דגם' : (selected as string[]).join(', ')}
                </div>
              )}
            >
              {singleBrand.models &&
                singleBrand.models.length > 0 &&
                singleBrand.models.map((model) => (
                  <MenuItem
                    key={model}
                    value={model}
                    style={{ direction: 'rtl', fontWeight: selectedModels.includes(model) ? 'bold' : 'normal' }}
                  >
                    {model}
                  </MenuItem>
                ))}
            </Select>
          </div>
        ) : (
          
          <div style={{ flex: '1', display: 'flex', textAlign: 'center', justifyContent: 'center', position: 'relative', bottom: -3, fontSize: '0.8rem', color: 'white', flexWrap: 'wrap-reverse' }}>
      {singleBrand.models.length <= 0 && (
                <div>
                  
                <label className="radio-label">
                {Number(id) == 2 ? ("כל המוצרים") : ("כל הנעליים")}
                    
                        <span> ({brandsAmount})</span>
                </label>
                    <input
                    type="radio"
                    className="black-radio"
                  />
                </div>
      )}

      {singleBrand.models && singleBrand.models.length > 0 && singleBrand.models.map((model) => (
        <div key={model} style={{ width: String(model).length > 10 ? '210px' : '120px' }}>
        <label className="radio-label">
            {model}
            {singleBrand.model_counts && singleBrand.model_counts[model] && (
                <span> ({singleBrand.model_counts[model]})</span>
            )}
        </label>
            <input
            {...controlProps(model)}
            type="radio"
            className="black-radio"
            onClick={() => {
              setPage(1);
              handleModelSelection(model);
            }}
          />
        </div>
      ))}
      
          </div>
        )}

        <div style = {{color: "white", position: "relative", top: 3}}>
        <Pagination
        classes={{ ul: classes.paginator }}
        style={{ backgroundColor: "#1A002E", width: isMobile ? "110%" : "100%" }}
        count={numberOfPages}
        page={page}
        onChange={(event, newPage) => setPage(newPage)}
        size="small"/>
        </div>
      </div>
      <div style = {{height: "23px"}}/>

<div style = {{display: "flex", direction: "rtl"}}>



            <div className="brand-map-items">
            {shoes.map((shoe, shoeIndex) => (
          <Card key={shoe.id} className="sharp-border-brand">

              {shoe.out_of && (
                              <b style = {{color: "#1A002E", position: "absolute", right: 10, top: 7}}>
                                אזל המלאי
                              </b>
              )}


            {isLoading ? (
                      <div style = {{height: "35dvh", display: "flex", justifyContent: "center", alignItems: "center"}}>
                      <div className="loader" />
                    </div>
            ) : (
              <Card.Body>
              <div>
              <img
                className="image-container-brand"
                onMouseEnter={() => handleMouseEnter(shoeIndex)}
                onMouseLeave={() => handleMouseLeave(shoeIndex)}
                onClick={() => navigate(`/brand/single_shoe/${shoe.id}`)}
                style={{ cursor: "pointer" }}
                src={`${myServer}/media/${shoe.images[imageIndexes[shoeIndex]]}`}
                width={isMobile ? `150px` : `225px`}
                height={isMobile ? `150px` : `225px`}

              />
              </div>

            <div>
              <Card.Text style = {{width: "100%", height: "90px", cursor: "pointer"}} onClick={() => navigate(`/brand/single_shoe/${shoe.id}`)}>{shoe.name}</Card.Text>
              <div style={{ display: "flex", justifyContent: "center", gap: `${shoe.price_before != 0 ? `${isMobile ? "1.2dvh" : "2.5dvh"}` : '0dvh'}` }}>
              <div>
              
              <b style = {{fontSize: "1.1rem"}}>₪{shoe.price}</b>

              </div>

{shoe.price_before != 0 ? (
  <div style={{ position: "relative", top: "1px"}}>
    <b className = "removed-price">

    ₪{shoe.price_before}
    </b>
  </div>
) : (
  ""
)}
</div>
              </div>
              <hr />
              <div style = {{display: "flex", justifyContent: "space-evenly"}}>
              
              <div style = {{cursor: "pointer", color: "black", position: "relative", top: "-2px"}}>

              {cart.find((item) => String(item.id) === String(shoe.id))
            ? <BiSolidCart style = {{fontSize: "2rem"}} onClick={() => { dispatch(removeProduct({ item: shoe })); setCartClicked(-1);}}/>
            : <BiSolidCartAdd style = {{fontSize: "2rem"}} onClick={() => { dispatch(addProduct({ item: shoe })); setCartClicked(shoeIndex);}}/>}

<BiSolidCart
  className={cartClicked === shoeIndex ? "slide-up" : ""}
  style={{
    fontSize: cartClicked === shoeIndex ? "2rem" : "0rem",
    position: "absolute",
    marginRight: '-32px',
    marginTop: '-0px',
  }}
  onClick={() => {
    setCartClicked(shoeIndex);
  }}
/>
              
              </div>
              
              <div onMouseEnter={() => setIsHovered(shoeIndex)} onMouseLeave={() => setIsHovered(null)} style = {{cursor: "pointer", color: "black"}} onClick={() => navigate(`/brand/single_shoe/${shoe.id}`)}>
              <GiConverseShoe style = {{fontSize: "2rem", position: "relative", right: "-4px", top: "0px"}}/>
              {isHovered === shoeIndex && (
  <div style={{ position: "absolute", fontSize: "0.8rem", marginRight: "-18px", marginTop: "-5px" }}>
    לעמוד הנעל
  </div>
)}
              </div>

              <div style = {{cursor: "pointer", color: "black"}}>
              {wishlist.find((item) => String(item.id) === String(shoe.id))
            ? <FaHeart style = {{fontSize: "1.6rem", position: "relative", top: '3px', color: "#1A002E"}} onClick={() => { dispatch(removeWish({ item: shoe })); setHeartClicked(-1);}}/>
            : <div>
              <FaRegHeart style = {{fontSize: "1.6rem", position: "relative", top: '3px'}} onClick={() => { dispatch(addWish({ item: shoe })); setHeartClicked(shoeIndex); }}/>
              </div>}

              <FaHeart
  className={heartClicked === shoeIndex ? "slide-up" : ""}
  style={{
    fontSize: heartClicked === shoeIndex ? "1.6rem" : "0rem",
    position: "absolute",
    marginRight: '-26px',
    marginTop: '-0px',
    color: "#1A002E",
  }}
  onClick={() => {
    setHeartClicked(shoeIndex);
  }}
/>


              </div>

              </div>
            
          </Card.Body>
            )}

          </Card>
        ))}
      </div>
    </div>
    
  </div>

  <div style={{ direction: "rtl" }}>
  <div style={{ color: "white", position: "relative", top: "23px" }}>
    <Pagination
      classes={{ ul: classes.paginator }}
      style={{
        backgroundColor: "#1A002E",
        width: numberOfPages <= 1 ? "5.5rem" :
               numberOfPages === 2 ? "7.4rem" :
               numberOfPages === 3 ? "9.3rem" :
               numberOfPages === 4 ? "11.1rem" :
               numberOfPages === 5 ? "12.5rem" :
               numberOfPages === 6 ? "14.2rem" : "16rem",
        direction: "ltr"
      }}
      count={numberOfPages}
      page={page}
      onChange={(event, newPage) => setPage(newPage)}
      size="small"
    />
  </div>
</div>


    </div>
  )
}

export default BrandShoes