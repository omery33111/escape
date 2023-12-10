import React, { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { getSingleShoeAsync, selectSingleShoe } from './shoeSlice';
import { myServer } from '../../endpoints/endpoints';

const ShoePage = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const shoe = useAppSelector(selectSingleShoe);

    const { id } = useParams();

    useEffect(() => {
        if (id !== undefined)
        {   
            dispatch(getSingleShoeAsync(id));
        }
    }, [dispatch, id]);
    
  return (
    <div>
        
        <p>name: {shoe.name}</p>
            <p>description: {shoe.description}</p>
            <p>price before: {shoe.price_before}</p>
            <p>real price: {shoe.price}</p>
            
            {shoe.sizes.map((size, index) => (

<div key={index} style={{ width: "20%" }}>
    {size}
</div>

))}





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


    </div>
  )
}

export default ShoePage