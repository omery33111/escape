import { useEffect, useState } from 'react'
import { FaSignInAlt } from 'react-icons/fa'
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { useNavigate } from 'react-router-dom';
import { loginAsync, reset, selectIsError, selectIsSuccess } from "./authenticationSlice"
import { Button } from 'react-bootstrap';
import { toast } from 'react-toastify';



const Login = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const { username, password } = formData;

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const isSuccess = useAppSelector(selectIsSuccess);

  const { userName } = useAppSelector((state) => state.authentication);

  useEffect(() =>
  {
      if (isSuccess)
      {
        window.location.href = "/";
      }

      dispatch(reset())

  }, [userName, isSuccess, navigate, dispatch])

  useEffect(() => {
    if (isSuccess) {
      toast.success(`Welcome, ${username}!`, {
        position: 'top-center',
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'dark',
      });
    }
  }, [isSuccess, username]);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const isError = useAppSelector(selectIsError);


   const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const userData = {
      username,
      password,
    };

    const submitTime = new Date().toISOString();
    localStorage.setItem('loginTime', submitTime);

    dispatch(loginAsync(userData));
  };

  useEffect(() => {
    if (isError) {
      toast.error('Wrong information. Try again later.');
    }
  }, [isError]);


  return (
    <div style = {{backgroundColor: "white"}}>
    <div className="container d-flex justify-content-center">
      
  <form className="form-group col-md-6" onSubmit={onSubmit} style = {{direction: "rtl"}}>
  <h1 className="text-center" style = {{color: "black"}}>
  <FaSignInAlt /> התחברות 
    </h1>
    <p className="text-center" style = {{color: "black"}}>הזן פרטי משתמש</p>

    <div className="form-group">
      <input
      style = {{textAlign: "left"}}
        type="text"
        className="form-control"
        id="username"
        name="username"
        value={username}
        placeholder="Username"
        onChange={onChange}
      />
    </div><br/>

    <div className="form-group">
      <input
      style = {{textAlign: "left"}}
        type="password"
        className="form-control"
        id="password"
        name="password"
        value={password}
        placeholder="Password"
        onChange={onChange}
      />
    </div><br/>

    <div className="form-group text-center">
      <Button type="submit" variant = 'warning'>
        התחברות
      </Button><br/><br/>
      <Button style = {{width: "50%"}} onClick = {() => navigate('/authentication/register')} variant = 'dark'>
        הרשמה
      </Button>
    </div>
  </form>
  
</div>
<div style = {{height: 400}}/>
</div>


  )
}

export default Login