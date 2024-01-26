import React, { useEffect, useState } from 'react';
import { getWallShoesAsync, selectAllShoes, selectSingleShoeLoading, selectWallLoading } from '../shoe/shoeSlice';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { useNavigate } from 'react-router-dom';
import { myServer } from '../../endpoints/endpoints';
import Container from 'react-bootstrap/Container';

const Wall: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const shoes = useAppSelector(selectAllShoes);
  
  const isLoading = useAppSelector(selectWallLoading);

  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch(getWallShoesAsync());
    }, 100);
  }, [dispatch]);

  // Function to split the array into chunks of specified size for an 8 x 5 grid
  const chunkArray = (arr: any, size: number): any[] =>
    Array.from({ length: size }, (_, index) =>
      arr.slice(index * Math.ceil(arr.length / size), (index + 1) * Math.ceil(arr.length / size))
    );

    const [hoveredShoe, setHoveredShoe] = useState<number | null>(null);

    const isMobile = window.innerWidth <= 768;
    const isTablet = window.innerWidth <= 0 || window.innerWidth <= 1024;


  return (
    <Container style={{ justifyContent: 'center', textAlign: 'center', height: "80dvh" }}>
            <hr/>
            <div style = {{height: "3dvh"}}/>
            <b style={{ fontSize: '2rem' }}>הפופולריות ביותר</b>
            <div style = {{height: "3dvh"}}/>

            {isLoading ? (
          <div style = {{height: "59dvh", display: "flex", justifyContent: "center", alignItems: "center",
          borderLeft: '2px solid black',
          borderRight: '2px solid black',
          borderBottom: '2px solid black'}}>
          <div className="loader" />
        </div>
        ) : (
          <div className = "wall-hir">


          {shoes &&
            chunkArray(shoes as any, 5).map((row: any, rowIndex: number) =>
              row.map((shoe: any, colIndex: number) => (
                <div key={`${rowIndex}-${colIndex}`} style={{ position: 'relative' }}>
                  <img
                    onMouseEnter={() => setHoveredShoe(shoe.id)}
                    onMouseLeave={() => setHoveredShoe(null)}
                    onClick={() => navigate(`/brand/single_shoe/${shoe.id}`)}
                    style={{ cursor: 'pointer', marginBottom: isTablet ? "20px" : '0px'}}
                    src={`${myServer}/static/images/${shoe.images[0]}`}
                    width={isTablet ? "70px" : '105px'}
                    height={isTablet ? "70px" : '105px'}
                    alt={`Shoe ${shoe.id}`}
                  />
                  {hoveredShoe === shoe.id && (
                    <div
                      style={{
                        width: "400px",
                        fontSize: "0.7rem",
                        zIndex: 1,
                        position: 'absolute',
                        top: '95px',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        backgroundColor: 'rgba(255, 255, 255, 0.9)',
                      }}>
                      {shoe.name}
                    </div>
                  )}
                </div>
              ))
            )}
        </div>
        )}


      
      <div style = {{height: "2.4rem"}}/>
      <div className = "divider"/>


    </Container>
  );
};

export default Wall;
