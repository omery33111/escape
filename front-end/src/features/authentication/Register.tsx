import { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { AiOutlineUser } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { registerAsync, reset } from "./authenticationSlice";



const Register = () => {
    const [formData, setFormData] = useState
    ({
        username: "",
        password: "",
        password2: "",
        email: ""
    })
    const { username, password, password2, email } = formData


    const navigate = useNavigate()
    const dispatch = useAppDispatch()

    const {isSuccess} = useAppSelector((state) => state.authentication)

    useEffect(() =>
    {
        if (isSuccess)
        {
            navigate("/authentication/login")
        }
        
        dispatch(reset())
    }, [isSuccess, navigate, dispatch])
    


    const onChange = (event: any) => {setFormData((PreviousState) => ({ ...PreviousState, [event.target.name]: event.target.value}))}

    const onSubmit = (event: any) => {
      event.preventDefault();
  
      const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
      
      if (!passwordRegex.test(password)) {
          toast.error("Password must be at least 8 characters long and contain at least one digit, one lowercase letter and one uppercase letter.");
      } else if (password !== password2) {
          toast.error("Passwords do not match.");
      } else {
          const userData = {
              username,
              email,
              password
          };
  
          dispatch(registerAsync(userData))
              .catch((error) => {
                  toast.error(error.message);
              });
      }
  }

    return (
        <div className="container d-flex justify-content-center">
          <form className="form-group col-md-6" onSubmit={onSubmit} style = {{direction: "rtl"}}>
            <h1 className="text-center">
            <AiOutlineUser /> הרשמה 
            </h1>
              <br />      
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                id="username"
                name="username"
                value={username}
                placeholder="הזן שם משתמש"
                onChange={onChange}
              />
            </div><br/>
      
            <div className="form-group">
              <input
                type="password"
                className="form-control"
                id="password"
                name="password"
                value={password}
                placeholder="סיסמה"
                onChange={onChange}
              />
            </div><br/>
      
            <div className="form-group">
              <input
                type="password"
                className="form-control"
                id="password2"
                name="password2"
                value={password2}
                placeholder="וידוא סיסמה"
                onChange={onChange}
              />
            </div><br/>
      
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                id="email"
                name="email"
                value={email}
                placeholder="כתובת אימייל"
                onChange={onChange}
              />
            </div><br/>
      
            <div className="form-group text-center">
              <Button type="submit" className="btn btn-dark">
                הירשמות
              </Button>
            </div>
            <div style = {{height: "300px"}} />
          </form>
        </div>
      )
}



export default Register