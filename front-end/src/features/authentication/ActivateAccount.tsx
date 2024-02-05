import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { activateAccountAsync, selectIsError } from './authenticationSlice';
import { AnyAction, ThunkDispatch } from '@reduxjs/toolkit';
import { useAppSelector } from '../../app/hooks';

const ActivateAccount = () => {
  const dispatch = useDispatch<ThunkDispatch<{}, {}, AnyAction>>();
  const location = useLocation();
  const navigate = useNavigate();
  
  useEffect(() => {
    const token = location.pathname.replace('/activate/', '');

    if (token) {
      dispatch(activateAccountAsync(token));
    } else {
      navigate('/');
    }
  }, [dispatch, location.pathname, navigate]);


  const storedIsLogged = JSON.parse(localStorage.getItem('token') as string);

  return (
    <div style = {{justifyContent: "center", textAlign: "center"}}>

        <div style = {{height: "5rem"}}/>
      
      {storedIsLogged ? (

        <div>

        <h1 style = {{direction: 'rtl'}}>החשבון אומת בהצלחה!</h1>

        <div style = {{height: "5rem"}}/>

        <h4 style = {{direction: 'rtl', cursor: "pointer"}} onClick = {() => navigate('/')}>מעבר לעמוד הבית</h4>

        </div>

      ) : (
        <>
        <div style = {{height: "5rem"}}/>

              <h1 style = {{direction: 'rtl', color: "red"}}>חשבון לא אושר.<br/>יש להתחבר לחשבון, ולאחר מכן ללחוץ על הלינק שנשלח במייל</h1>
        </>
      )}

    </div>
  );
}

export default ActivateAccount;
