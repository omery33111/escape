import React, { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { getIsraelCitiesAsync, getIsraelStreetsAsync, selectIsraelCities, selectIsraelStreets } from './shippingSlice';
import { Autocomplete, TextField } from '@mui/material';

const Shipping = () => {
    const dispatch = useAppDispatch();

    const israelCities = useAppSelector(selectIsraelCities);
    const israelStreets = useAppSelector(selectIsraelStreets);

    const [searchedCity, setSearchedCity] = useState('');
    const [searchedStreet, setSearchedStreet] = useState('');


    useEffect(() => {
          dispatch(getIsraelCitiesAsync(searchedCity));
          dispatch(getIsraelStreetsAsync(searchedStreet));
      }, [dispatch, searchedCity, searchedStreet]);
    

  const handleCityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchedCity(e.target.value);
  };
  

  

  return (
    <div>
          <Autocomplete
    freeSolo
    options={israelCities.map((city: any) => city.שם_ישוב)}
    autoHighlight
    onChange={(event, newValue) => {
      setSearchedCity(newValue);
      setSearchedStreet('');
    }}
    disableClearable={true}
    renderInput={(params) => (
      <TextField
        {...params}
        label="עיר מגורים"
        variant="standard"
        onChange={handleCityChange}
        value={searchedCity}
        inputProps={{
          ...params.inputProps,
          style: { width: "100%" }
        }}
      />
    )}
  />
    </div>
  )
}

export default Shipping