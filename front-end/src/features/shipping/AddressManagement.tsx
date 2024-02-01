import { Autocomplete, Button, FormControl, InputLabel, MenuItem, Select, TextField, Theme } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { Address } from '../../models/Shipping';
import { deleteGuestAddress, getAddressesAmountAsync, getAddressesAsync, getIsraelCitiesAsync, getIsraelStreetsAsync, getNextShippingIDAsync, initGuestAddresses, patchAddressAsync, postAddressAsync, selectAddress, selectAddressesAmount, selectGuestAddresses, selectIsraelCities, selectIsraelStreets, selectNextShippingID } from '../shipping/shippingSlice';
import './shipping.css';
import { makeStyles } from "@mui/styles";
import { Col, Container, Form, Row } from 'react-bootstrap';
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

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const postalCodeRegex = /^\d{7}$/;
  const phoneNumberRegex = /^\d{7}$/;

  const [firstName, setFirstName] = useState('');
  const [lastName, setlastName] = useState('');
  const [searchedCity, setSearchedCity] = useState('');
  const [searchedStreet, setSearchedStreet] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [houseNumber, setHouseNumber] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');

  const [selectedCity, setSelectedCity] = useState<string | null>(null);
  const [selectedStreet, setSelectedStreet] = useState<boolean>(false);

  const [editAddress, setEditAddress] = useState<boolean>(false);

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

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const emailValue = e.target.value;
    setEmail(emailValue);
  };

  const handleCityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchedCity(e.target.value);
    setSelectedCity(e.target.value);
    setSelectedStreet(false);
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
    const input = e.target.value;
    const numericInput = input.replace(/\D/g, '');

    const truncatedInput = numericInput.slice(0, 7);

    setPostalCode(truncatedInput);
  };

  const handlesetHouseNumber = (e: any) => {
    const numericInput = e.target.value.replace(/\D/g, '');
  
    const truncatedInput = numericInput.slice(0, 3);
  
    setHouseNumber(truncatedInput);
  };

  const address = useAppSelector(selectAddress);

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
    formData.append('email', email);
  
    // Save the address to local storage
    const newAddress: Address = {
      first_name: firstName,
      last_name: lastName,
      city: searchedCity,
      address: searchedStreet,
      email: email,
      postal_code: Number(postalCode),
      house_number: Number(houseNumber),
      phone_number: Number(phoneNumberWithPrefix),
      id: String(nextAddressID)
    };
  
    const existingAddresses = JSON.parse(localStorage.getItem('addresses') || '[]');
  
    const updatedAddresses = [...existingAddresses, newAddress];
  
    if (storedIsLogged) {
      if (!address[0]) {
        console.log("Dispatching postAddressAsync");
        dispatch(postAddressAsync(formData));
      }
  
      if (address[0]) {
        console.log("Dispatching patchAddressAsync");
        dispatch(patchAddressAsync({ shippingData: formData, id: Number(address[0].id) }));
        console.log({ shippingData: formData, id: Number(address[0].id) });
      }
    }
  
    if (!storedIsLogged) {
      console.log("Dispatching postAddressAsync (Guest)");
      localStorage.setItem('addresses', JSON.stringify(updatedAddresses));
      dispatch(postAddressAsync(formData));
    }
  
    // Clear the form fields
    setFirstName('');
    setlastName('');
    setSearchedCity('');
    setSearchedStreet('');
    setPostalCode('');
    setHouseNumber('');
    setPhoneNumber('');
    setSelectedCity(null);
    setSelectedStreet(false);
    setSelectedPrefix('');
    setEmail('');
  
    setEditAddress(false);
  };

  
  const localGuestAddress = JSON.parse(localStorage.getItem('addresses') as string);

  const storedIsLogged = JSON.parse(localStorage.getItem('token') as string);

  const addressesAmount = useAppSelector(selectAddressesAmount)

  const allGuestAddresses = useAppSelector(selectGuestAddresses)

  const nextAddressID = useAppSelector(selectNextShippingID)

  useEffect(() => {
    if (storedIsLogged) {
      localStorage.removeItem('addresses');
    }
  }, [storedIsLogged]);


  useEffect(() => {

    if (storedIsLogged)
    {
      dispatch(getAddressesAsync());
    }

    else
    {
      dispatch(initGuestAddresses());
      dispatch(getAddressesAmountAsync());
      dispatch(getNextShippingIDAsync());
    }
    
    }, [dispatch, editAddress]);



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

  const [currentAddressData, setCurrentAddressData] = useState<Address | null>(null);
  
  useEffect(() => {
    if (editAddress && address[0]) {
      // Set the state values based on the current address
      setFirstName(address[0].first_name || '');
      setlastName(address[0].last_name || '');
      setSearchedCity(address[0].city || '');
      setSearchedStreet(address[0].address || '');
      setPostalCode(address[0].postal_code ? address[0].postal_code.toString() : '');
      setHouseNumber(address[0].house_number ? address[0].house_number.toString() : '');
      setPhoneNumber(address[0].phone_number ? address[0].phone_number.toString() : '');
      setEmail(address[0].email || '');

      // Set the selected city and street
      setSelectedCity(address[0].city || null);
      setSelectedStreet(true); // Assuming that the street is always selected in edit mode

      // Set the current address data for further use
      setCurrentAddressData(address[0]);
    }
  }, [editAddress, address]);

  return (
    <div>

      
        <div>

       
          {storedIsLogged ? (
            <div>
                        {editAddress || !address[0] ? (
                            <div>
                            <Form onSubmit={handleSubmit}>
                        
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
                            .filter((street: any) => street.שם_ישוב === selectedCity)
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
                              inputProps={{
                                maxLength: 7,
                                pattern: '[0-9]*',
                              }}
                            />
                              </div>
                        
                              <div style = {{display: "flex", gap: "10px", marginBottom: "1rem"}}>
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

                              <div style = {{display: "flex", gap: "10px"}}>
                              <TextField
                                className={classes.autocompleteAddress}
                                label="כתובת אימייל"
                                type="email"
                                value={email}
                                variant="standard"
                                onChange={handleEmailChange}
                              />


                              <Button
                               style={{ backgroundColor: "#1A002E", position: "relative", borderRadius: "0px", transform: isMobile ? "" : "translateX(-6rem)" }}
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
                                  selectedPrefix === ''}>
                                שמירה
                              </Button>

                            </div>


                        
                          </div>
                        </Form>
                        
                        </div>

) : (

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
    
             <div style = {{display: "flex", gap: "50px", marginBottom: "7px"}}>

            <div style = {{width: "30.9%", marginBottom: "10px"}}>
                <div style = {{position: "absolute", marginTop: "-10px"}}>
                0{address.phone_number}
                </div>
              <hr/>
            </div>

            <div style = {{width: "30.9%", marginBottom: "10px"}}>
                <div style = {{position: "absolute", marginTop: "-10px"}}>
                {address.postal_code}
                </div>
              <hr/>
            </div>

            </div>

             <div style = {{height: "1rem"}}/>
              
              {address.email && (
                             <div style = {{display: "flex", gap: "50px", marginBottom: "7px"}}>
                             <div style = {{width: "30.9%", marginBottom: "10px"}}>
                                 <div style = {{position: "absolute", marginTop: "-10px"}}>
                                 {address.email}
                                 </div>
                               <hr/>
                             </div>
                             </div>
              )}

        
          <Button style = {{backgroundColor: "#1A002E", color: "white", position: "relative", borderRadius: "0px"}} variant="contained" onClick={() => setEditAddress(true)}>
            עריכה
          </Button>
    
          </div>
        )}
    

    </div>

)}
            </div>
          ) : (
            <div>
            {localGuestAddress ? (
                  <div style={{ direction: 'rtl' }}>


                            {localGuestAddress.map((address: any) =>

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
    

             <div style = {{display: "flex", gap: "50px", marginBottom: "7px"}}>

            <div style = {{width: "30.9%", marginBottom: "10px"}}>
                <div style = {{position: "absolute", marginTop: "-10px"}}>
                0{address.phone_number}
                </div>
              <hr/>
            </div>

            <div style = {{width: "30.9%", marginBottom: "10px"}}>
                <div style = {{position: "absolute", marginTop: "-10px"}}>
                {address.postal_code}
                </div>
              <hr/>
            </div>

            </div>

            <div style = {{height: "1rem"}}/>
              
              {address.email && (
                             <div style = {{display: "flex", gap: "50px", marginBottom: "7px"}}>
                             <div style = {{width: "30.9%", marginBottom: "10px"}}>
                                 <div style = {{position: "absolute", marginTop: "-10px"}}>
                                 {address.email}
                                 </div>
                               <hr/>
                             </div>
                             </div>
              )}

        
          <Button style = {{backgroundColor: "#1A002E", color: "white", position: "relative", borderRadius: "0px"}} type="submit" variant="contained" onClick={() => dispatch(deleteGuestAddress({ item: address }))}>
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
    .filter((street: any) => street.שם_ישוב === selectedCity)
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
      inputProps={{
        maxLength: 7,
        pattern: '[0-9]*',
      }}
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
                              <div style = {{height: "1rem"}}/>
                              <div style = {{display: "flex", gap: "10px"}}>
                                <TextField
                                    className={classes.autocompleteAddress}
                                    label="כתובת אימייל"
                                    type="email"
                                    value={email}
                                    variant="standard"
                                    onChange={handleEmailChange}
                                />

                            <Button
                               onClick={() => setEditAddress(false)}
                               style={{ backgroundColor: "#1A002E", position: "relative", borderRadius: "0px", transform: isMobile ? "" : "translateX(-6rem)" }}
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


                        
                          </div>
                        </form>

</div>
)}
            </div>
          )}




</div>


      
    </div>
  );
};

export default AddressManagement;
