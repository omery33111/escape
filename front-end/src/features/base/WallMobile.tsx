import React, { useEffect, useState } from 'react';
import { getWallShoesAsync, selectAllShoes, selectWallLoading } from '../shoe/shoeSlice';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { useNavigate } from 'react-router-dom';
import { myServer } from '../../endpoints/endpoints';
import Container from 'react-bootstrap/Container';

const WallMobile: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const shoes = useAppSelector(selectAllShoes);

  const isLoading = useAppSelector(selectWallLoading);

  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch(getWallShoesAsync());
    }, 100);
  }, [dispatch]);

  // Function to split the array into chunks of specified size for a 6 x 5 grid
  const chunkArray = (arr: any, rows: number, cols: number): any[] => {
    const chunkedArray = [];

    for (let i = 0; i < rows; i++) {
      const row = arr.slice(i * cols, (i + 1) * cols);
      chunkedArray.push(row);
    }

    return chunkedArray;
  };

  const [hoveredShoe, setHoveredShoe] = useState<number | null>(null);

  return (
    <Container style={{ justifyContent: 'center', textAlign: 'center', height: '60dvh' }}>
      <div style={{ height: '5vh' }} />
      <b style={{ fontSize: '2rem' }}>הפופולריות ביותר</b>
      <div style={{ height: '2vh' }} />

      {isLoading ? (
        <div style={{ height: '59dvh', display: 'flex', justifyContent: 'center', alignItems: 'center', borderLeft: '2px solid black', borderRight: '2px solid black', borderBottom: '2px solid black' }}>
          <div className="loader" />
        </div>
      ) : (
        <div className="wall-hir">
          {chunkArray(shoes as any, 6, 5).map((row: any, rowIndex: number) =>
            row.map((shoe: any, colIndex: number) => (
              <div key={`${rowIndex}-${colIndex}`} style={{ position: 'relative' }}>
                <img
                  onMouseEnter={() => setHoveredShoe(shoe.id)}
                  onMouseLeave={() => setHoveredShoe(null)}
                  onClick={() => navigate(`/brand/single_shoe/${shoe.id}`)}
                  style={{ cursor: 'pointer', margin: '-3px' }}
                  src={`${myServer}/media/${shoe.images[0]}`}
                  width={'55px'}
                  height={'55px'}
                  alt={`Shoe ${shoe.id}`}
                />
                {hoveredShoe === shoe.id && (
                  <div
                    style={{
                      width: 'fit-content',
                      fontSize: '0.7rem',
                      zIndex: 1,
                      position: 'absolute',
                      top: '75px',
                      left: '50%',
                      transform: 'translateX(-50%)',
                      backgroundColor: 'rgba(255, 255, 255, 0.9)',
                      padding: '5px',
                      borderRadius: '5px',
                    }}
                  >
                    {shoe.name}
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      )}

    </Container>
  );
};

export default WallMobile;
