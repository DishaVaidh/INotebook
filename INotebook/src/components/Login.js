import React, { useState} from 'react'
import {useNavigate} from "react-router-dom"
export default function Login(props) {
    const [credentials, setcredentials] = useState({email:"",password:""})
    let navigate = useNavigate()
    const handleSubmit=async (e)=>{
        e.preventDefault();
        
        const response = await fetch("http://localhost:5000/api/auth/login",{
            method: 'POST',
            
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({email:credentials.email,password:credentials.password})//body ke through username pw go
          });
          const json = await response.json();
          console.log(json);
          if(json.success){
              //save the auth token and redirect
              localStorage.setItem("token",json.authtoken);
              navigate("/")
              props.showAlert("Login successfully","success")
          }
          else{
            props.showAlert("Invalid credentials","danger")
          }
    }

    const onChange=(e)=>{
        setcredentials({...credentials,[e.target.name] : e.target.value})//we are saying jo bhi change ho rha h name wo uski value ke equal ho jaye
    }

    return (
        <div>
            <form  onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="email" name="email" value={credentials.email} onChange={onChange} aria-describedby="emailHelp"/>
                    <div id="emailHelp" className ="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="paassword" className="form-label">Password</label>
                    <input type="password" className="form-control" id="password" value={credentials.password} onChange={onChange} name="password"/>
                </div>
               
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}
