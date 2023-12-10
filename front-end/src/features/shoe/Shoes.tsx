import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { getAllShoesAsync, selectAllShoes } from "./shoeSlice";
import { useEffect } from "react";
import { myServer } from "../../endpoints/endpoints";




const Shoes = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const shoes = useAppSelector(selectAllShoes);


    useEffect(() => {
        dispatch(getAllShoesAsync());
    }, [dispatch]);

  return (
    <div>
        
        <div>

        {shoes.map((shoe) => (
          <div key={shoe.id}>

            <p>shoe.name: {shoe.name}</p>
            <p>shoe.description: {shoe.description}</p>
            <p>shoe.price_before: {shoe.price_before}</p>
            <p>shoe.price: {shoe.price}</p>
            <p>shoe.sizes: {shoe.sizes}</p>
            {shoe.images.map((image, index) => (

                                <div key={index} style={{ width: "20%" }}>
                                    <img
                                        style={{ border: '1px solid #000000' }}
                                        src={`${myServer}/static/images/${image}`}
                                        width="100%"
                                        height="100%"
                                        alt={`shoe${index + 1}`}
                                    />
                                </div>

                            ))}


            <br/>
            <br/>

          </div>
        ))}

        </div>

    </div>
  )
}

export default Shoes