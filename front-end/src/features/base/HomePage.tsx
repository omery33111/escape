import InstaRec from '../instarec/InstaRec';
import BrandsCar from './BrandsCar';
import ChosenShoes from './ChosenShoes';
import DoubleBox from './DoubleBox';
import HomePageCar from './HomePageCar';
import HomePageCarMobile from './HomePageCarMobile';
import Wall from './Wall';
import WallMobile from './WallMobile';

const HomePage = () => {
  const isTablet = window.innerWidth <= 0 || window.innerWidth <= 1024;

  const isLaptop = window.innerWidth <= 1000 || window.innerWidth <= 1400;

  const isMobile = window.innerWidth <= 768;


  return (
    <div style = {{marginTop: '28px', overflowX : "hidden"}}>

      {isTablet ? (
      <HomePageCarMobile />
      ) : (
        <HomePageCar />
      )}
      
      
      <BrandsCar />

      <div style = {{height: "10dvh"}}/>

      {isMobile ? (
        <WallMobile />
      ) : (
        <Wall />
      )}

      {isMobile && (
        <div style = {{height: "5dvh"}}/>
      )}

        <DoubleBox />

        <div style = {{height: "10dvh"}}/>

        
        <ChosenShoes />

        <div style = {{height: "10dvh"}}/>

          <InstaRec />
    </div>
  )
}

export default HomePage