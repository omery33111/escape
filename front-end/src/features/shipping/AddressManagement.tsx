import { Autocomplete, Button, FormControl, InputLabel, MenuItem, Select, TextField, Theme } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { Address } from '../../models/Shipping';
import { deleteAddressAsync, getAddressesAsync, getIsraelCitiesAsync, getIsraelStreetsAsync, postAddressAsync, selectAddress, selectIsraelCities, selectIsraelStreets } from '../shipping/shippingSlice';
import './shipping.css';
import { makeStyles } from "@mui/styles";
import { Col, Container, Row } from 'react-bootstrap';
import Shipping from './Shipping';



const useStyles = makeStyles((theme: Theme) => ({
  autocompleteAddress: {
    '& .MuiInput-underline:after': {
      borderBottom: '2px solid #663399',
    },
    '& .MuiInputBase-input': {
      color: 'black',
      textAlign: 'right',
    },
    '& .MuiAutocomplete-clearIndicator': {
      color: 'white', // Clear button color
    },
    '& .MuiAutocomplete-popupIndicator': {
      color: 'white', // Arrow icon color
    },
  },
  

  rtlSelect: {
    '&.MuiInput-underline:after': {
      borderBottom: '2px solid #663399',
    },
    '& .MuiSelect-root': {
      color: 'white',
    },
  },
}));



const AddressManagement = () => {
  const dispatch = useAppDispatch();
  const classes = useStyles();

  const [firstName, setFirstName] = useState('');
  const [lastName, setlastName] = useState('');
  const [searchedCity, setSearchedCity] = useState('');
  const [searchedStreet, setSearchedStreet] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [houseNumber, setHouseNumber] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  const [selectedCity, setSelectedCity] = useState<string | null>(null);
  const [selectedStreet, setSelectedStreet] = useState<boolean>(false);

  useEffect(() => {
    if (searchedCity.trim() !== '') {
      dispatch(getIsraelCitiesAsync(searchedCity));
    } else {
      setSearchedCity('')
    }
  }, [dispatch, searchedCity]);

  useEffect(() => {
    if (searchedStreet.trim() !== '') {
      dispatch(getIsraelStreetsAsync(searchedStreet));
    } else {
      setSearchedStreet('')
    }
  }, [dispatch, searchedStreet]);

  const israelCities = useAppSelector(selectIsraelCities);
  const israelStreets = useAppSelector(selectIsraelStreets);

  const handleCityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchedCity(e.target.value);
    setSelectedCity(e.target.value); // קביעת העיר שנבחרה
    setSelectedStreet(false); // איפוס הסטטוס של הרחובות כאשר משנים את העיר
  };

  const handleStreetChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchedStreet(e.target.value);
  };

  const handleFirstName = (e: any) => {
    setFirstName(e.target.value);
  };

  const handleLastName = (e: any) => {
    setlastName(e.target.value);
  };

  const handlePostalCodeChange = (e: any) => {
    setPostalCode(e.target.value);
  };

  const handlesetHouseNumber = (e: any) => {
    setHouseNumber(e.target.value);
  };


  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const phoneNumberWithPrefix = `${selectedPrefix}${phoneNumber}`;

    const formData: any = new FormData();
    formData.append('first_name', firstName);
    formData.append('last_name', lastName);
    formData.append('city', searchedCity);
    formData.append('address', searchedStreet);
    formData.append('postal_code', postalCode);
    formData.append('house_number', houseNumber);
    formData.append('phone_number', phoneNumberWithPrefix);


    dispatch(postAddressAsync(formData));

  };

  const address = useAppSelector(selectAddress);
  
  useEffect(() => {
    dispatch(getAddressesAsync());
    }, [dispatch]);


  const [selectedPrefix, setSelectedPrefix] = useState('');

  const [isCity, setIsCity] = useState<boolean>(false);

  const handlePrefixChange = (event: any) => {
    setSelectedPrefix(event.target.value); // Update selected prefix
  };

  const handleCitySelection = (event: React.ChangeEvent<{}>, value: string | null) => {
    if (value) {
      setSelectedCity(value); // Set the selected city when an option is selected
      setIsCity(true)
    }
  };



  const handleSetPhoneNumber = (event: any) => {
    const input = event.target.value;
    // Remove non-numeric characters
    const numericInput = input.replace(/\D/g, '');

    // Ensure the length is not more than 7
    const truncatedInput = numericInput.slice(0, 7);

    // Update state with the formatted phone number
    setPhoneNumber(truncatedInput);
  };

  const isTablet = window.innerWidth >= 0 && window.innerWidth <= 1024;

  const isMobile = window.innerWidth <= 768;


  return (
    <div>

      
        <div>


{address.length > 0 ? (
        <div style={{ direction: 'rtl' }}>

                  {address.map((address) =>

        <div key = {address.id} style = {{transform: "translateY(31px)"}}>
    
        <div style = {{display: "flex", gap: "50px", marginBottom: "31px"}}>

       <div style = {{width: "30.9%"}}>
        <div style = {{position: "absolute", marginTop: "-10px"}}>
        {address.first_name}
        </div>
        <hr/>
       </div>
    
       <div style = {{width: "30.9%"}}>
        <div style = {{position: "absolute", marginTop: "-10px"}}>
        {address.last_name}
        </div>
        <hr/>
       </div>
          </div>
    
        




          <div style = {{display: "flex", gap: "50px", marginBottom: "7px"}}>


    
        

                    <div style = {{width: "30.9%"}}>
                  <div style = {{position: "absolute", marginTop: "-10px"}}>
                  {address.city}
                  </div>
                  <hr/>
                </div>

                <div style = {{width: "30.9%"}}>
                  <div style = {{position: "absolute", marginTop: "-10px"}}>
                  {address.address} {address.house_number}
                  </div>
                  <hr/>
                </div>

             </div>
             <br/>
    

            <div style = {{width: "30.9%", marginBottom: "10px"}}>
                <div style = {{position: "absolute", marginTop: "-25px"}}>
                0{address.phone_number}
                </div>
              <hr/>
            </div>
        
          <Button style = {{backgroundColor: "#1A002E", color: "white", position: "relative", transform: "translateY(5.1rem)", borderRadius: "0px"}} type="submit" variant="contained" onClick={() => address.id && dispatch(deleteAddressAsync(address.id))}>
            עריכה
          </Button>
    
          </div>
        )}
    

    </div>
) : (
  <div>
    <form onSubmit={handleSubmit}>

    <div style={{ direction: 'rtl' }}>
    
    <div style = {{display: "flex", gap: "50px", marginBottom: "1rem"}}>
      
    <TextField
      className={classes.autocompleteAddress}
        label="שם פרטי"
        type="text"
        value={firstName}
        variant="standard"
        onChange={handleFirstName}
      />

    <TextField
      className={classes.autocompleteAddress}
        label="שם משפחה"
        type="text"
        value={lastName}
        variant="standard"
        onChange={handleLastName}
      />
      </div>

    
      <div style={{ display: "flex", gap: "50px", marginBottom: "1rem", width: "100%" }}>
  <Autocomplete
  freeSolo
  style = {{width: "12.3rem"}}
    className={classes.autocompleteAddress}
    options={israelCities.map((city: any) => city.שם_ישוב)}
    autoHighlight
    onChange={handleCitySelection}
    disableClearable={true}
    renderInput={(params) => (
      <TextField
        className={classes.autocompleteAddress}
        {...params}
        label="עיר מגורים"
        variant="standard"
        onChange={handleCityChange}
        value={searchedCity}
      />
    )}
  />

<Autocomplete
freeSolo
  style={{ position: "relative", right: isTablet ? "0px" : "-5px", width: "12.3rem" }}
  className={classes.autocompleteAddress}
  options={israelStreets
    .filter((street: any) => street.שם_ישוב === selectedCity) // השינוי כאן: שימוש במשתנה selectedCity במקום searchedCity
    .map((street: any) => street.שם_רחוב)}
  disableClearable={true}
  autoHighlight
  renderInput={(params) => (
    <TextField
      {...params}
      className={classes.autocompleteAddress}
      label="שם רחוב"
      variant="standard"
      onChange={handleStreetChange}
      value={searchedStreet}
      inputProps={{
        ...params.inputProps,
      }}
    />
  )}
  disabled={!isCity}
  />
</div>

  <div style = {{display: "flex", gap: "50px", marginBottom: "1rem"}}>
        <TextField
        className={classes.autocompleteAddress}
        label="מספר בית"
        type="number"
        value={houseNumber}
        variant="standard"
        onChange={handlesetHouseNumber}
      />

    
    <TextField
    className={classes.autocompleteAddress}
        label="מיקוד"
        type="number"
        value={postalCode}
        variant="standard"
        onChange={handlePostalCodeChange}
      />
      </div>

      <div style = {{display: "flex", gap: "10px"}}>
            <TextField
            className={classes.autocompleteAddress}
    label="מספר טלפון"
    type="text"
    variant="standard"
    value={phoneNumber}
    onChange={handleSetPhoneNumber}
    inputProps={{
      maxLength: 7,
    }}
  />

    <FormControl style = {{width: "20%", top: "-2px"}}>
      <InputLabel>קידומת</InputLabel>
      <Select
      className={`${classes.rtlSelect} rtl-select-shipping`}
      variant="standard"
        value={selectedPrefix}
        onChange={handlePrefixChange}
      >
        <MenuItem value="">קידומת</MenuItem>
        <MenuItem value="050">050</MenuItem>
        <MenuItem value="051">051</MenuItem>
        <MenuItem value="052">052</MenuItem>
        <MenuItem value="053">053</MenuItem>
        <MenuItem value="054">054</MenuItem>
        <MenuItem value="055">055</MenuItem>
        <MenuItem value="058">058</MenuItem>
      </Select>
    </FormControl>
    </div>
    
    <Button
  style={{ backgroundColor: "#1A002E", position: "relative", transform: "translateY(2rem)", borderRadius: "0px" }}
  type="submit"
  variant="contained"
  disabled={
    firstName === '' ||
    lastName === '' ||
    selectedCity === '' ||
    searchedStreet === '' ||
    postalCode === '' ||
    houseNumber === '' ||
    phoneNumber.length < 7 ||
    selectedPrefix === ''
  }
>
  שמירה
</Button>




  </div>
</form>

</div>
)}



</div>


      
    </div>
  );
};

export default AddressManagement;
