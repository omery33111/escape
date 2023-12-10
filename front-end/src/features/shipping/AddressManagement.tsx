import { Autocomplete, Button, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { Address } from '../../models/Shipping';
import { deleteAddressAsync, getAddressesAsync, getIsraelCitiesAsync, getIsraelStreetsAsync, postAddressAsync, selectAddress, selectIsraelCities, selectIsraelStreets } from '../shipping/shippingSlice';
import './shipping.css';



const AddressManagement = () => {
  const dispatch = useAppDispatch();

  const [firstName, setFirstName] = useState('');
  const [lastName, setlastName] = useState('');
  const [searchedCity, setSearchedCity] = useState('');
  const [searchedStreet, setSearchedStreet] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [houseNumber, setHouseNumber] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  useEffect(() => {
    if (searchedCity.length >= 1) {
      dispatch(getIsraelCitiesAsync(searchedCity));
    }

    if (searchedStreet.length >= 1) {
      dispatch(getIsraelStreetsAsync(searchedStreet));
    }
  }, [dispatch, searchedCity, searchedStreet]);

  const israelCities = useAppSelector(selectIsraelCities);
  const israelStreets = useAppSelector(selectIsraelStreets);

  const handleCityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchedCity(e.target.value);

    setSelectedCity(true)
  };

  const handleStreetChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchedStreet(e.target.value);

    setSelectedStreet(true)
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

  const handlePrefixChange = (event: any) => {
    setSelectedPrefix(event.target.value); // Update selected prefix
  };


  const [selectedCity, setSelectedCity] = useState<boolean>(false);
  const [selectedStreet, setSelectedStreet] = useState<boolean>(false);


  const handleSetPhoneNumber = (event: any) => {
    const input = event.target.value;
    // Remove non-numeric characters
    const numericInput = input.replace(/\D/g, '');

    // Ensure the length is not more than 7
    const truncatedInput = numericInput.slice(0, 7);

    // Update state with the formatted phone number
    setPhoneNumber(truncatedInput);
  };


  return (
    <div>


        <div>

        

        </div>

            {address.length > 0 ? (
                <div>
                    {address.map((address) =>
                    <div key = {address.id}>

                    {address.first_name}<br/>
                    {address.last_name}<br/>
                    {address.city}<br/>
                    {address.address} {address.house_number}<br/>
                    {address.postal_code}<br/>
                    0{address.phone_number}<br/>

                    <Button
                    variant="contained"
                    onClick={() => address.id && dispatch(deleteAddressAsync(address.id))}>
                    <h3 style={{color: "white"}}>ערוך</h3>
                  </Button>

                    </div>
                    )}
                </div>
            ) : (
                <form onSubmit={handleSubmit}>

                <div style={{ width: '100%', direction: 'rtl' }}>

                
                <TextField
                    label="שם פרטי"
                    type="text"
                    value={firstName}
                    onChange={handleFirstName}
                    
                  />

                <TextField
                    label="שם משפחה"
                    type="text"
                    value={lastName}
                    onChange={handleLastName}
                  />

<div style = {{width: "15%"}}>
<Autocomplete
  className="rtl-autocomplete"
  options={israelCities.map((city: any) => city.שם_ישוב)}
  autoHighlight
  onChange={(event, newValue) => {
    setSearchedCity(newValue);
    setSearchedStreet(''); // Reset searchedStreet when city changes to prevent potential issues
  }}
  disableClearable={true}
  renderInput={(params) => (
    <TextField
      {...params}
      label="עיר מגורים"
      onChange={handleCityChange}
      value={searchedCity}
      inputProps={{
        ...params.inputProps,
      }}
    />
  )}
/>

<Autocomplete
  className='rtl-autocomplete'
  options={searchedCity ? israelStreets.filter((street: any) => street.שם_ישוב === searchedCity).map((street: any) => street.שם_רחוב) : []}
  disableClearable={true}
  autoHighlight
  renderInput={(params) => (
    <TextField
      {...params}
      label="שם רחוב"
      onChange={handleStreetChange}
      value={searchedStreet}
      inputProps={{
        ...params.inputProps,
      }}
    />
  )}
/>



                    <TextField
                    label="מספר בית"
                    type="number"
                    value={houseNumber}
                    onChange={handlesetHouseNumber}
                  />
        
                
                <TextField
                    label="מיקוד"
                    type="number"
                    value={postalCode}
                    onChange={handlePostalCodeChange}
                  />

              <div style = {{display: "flex"}}>
              <TextField
      label="מספר טלפון"
      type="text"
      value={phoneNumber}
      onChange={handleSetPhoneNumber}
      inputProps={{
        maxLength: 7,
      }}
    />
    
                <FormControl style = {{width: "35%"}}>
                  <InputLabel>קידומת</InputLabel>
                  <Select
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
    </div>
        
                  <Button type="submit" variant="contained" color="primary" disabled = {!searchedCity || !searchedStreet || !houseNumber || !postalCode || phoneNumber.length < 7}>
                    שמור
                  </Button>
                </div>
              </form>
            )}
      
    </div>
  );
};

export default AddressManagement;
