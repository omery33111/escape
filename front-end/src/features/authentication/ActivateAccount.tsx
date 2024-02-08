import { AnyAction, ThunkDispatch } from '@reduxjs/toolkit';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { activateAccountAsync } from './authenticationSlice';
import { useAppSelector } from '../../app/hooks';
import { getProfileAsync, selectMyProfile } from '../profile/profileSlice';

const ActivateAccount = () => {
  const dispatch = useDispatch<ThunkDispatch<{}, {}, AnyAction>>();
  const location = useLocation();
  const navigate = useNavigate();
  
  const token = location.pathname.split("/activate/")[1];

  const profile = useAppSelector(selectMyProfile)

  useEffect(() => {
    if (token) {
      dispatch(activateAccountAsync(token));
    }

  if (storedIsLogged) {
    dispatch(getProfileAsync());
    if (profile.activated === true)
    {
      navigate('/')
    }
  }
  }, [dispatch, token, profile.activated]);

  const storedIsLogged = JSON.parse(localStorage.getItem('token') as string);

  return (
    <div style={{ justifyContent: "center", textAlign: "center" }}>

      <div style={{ height: "8rem" }} />

      {storedIsLogged ? (

        <div>

          <h1 style={{ direction: 'rtl' }}>יש להמשיך תהליך אימות באימייל</h1>

        </div>

      ) : (
        <>
          <div style={{ height: "5rem" }} />

          <h1 style={{ direction: 'rtl', color: "red" }}>חשבון לא אושר.<br />יש להתחבר לחשבון, ולאחר מכן ללחוץ על הלינק שנשלח במייל</h1>
        </>
      )}

    </div>
  );
}

export default ActivateAccount;
