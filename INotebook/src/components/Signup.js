import React, { useState} from 'react'
import {useNavigate} from "react-router-dom"

export default function Signup(props) {
    let navigate = useNavigate()
    const [credentials, setcredentials] = useState({name : "",email : "",password:"",cpassword : ""})
    const {name,email,password} = credentials;
    const handleSubmit=async (e)=>{
        e.preventDefault();
        
        const response = await fetch("http://localhost:5000/api/auth/createuser",{
            method: 'POST',
            
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({name,email,password})//body ke through username pw go
          });
          const json = await response.json();
          console.log(json);
          if(json.success){
              //save the auth token and redirect
              localStorage.setItem("token",json.authtoken);
              navigate("/")
              props.showAlert("Account created succesfully","success")
          }
          else{
              props.showAlert("User already present","danger")
          }
    }
    const onChange=(e)=>{
        setcredentials({...credentials,[e.target.name] : e.target.value})//we are saying jo bhi change ho rha h name wo uski value ke equal ho jaye
    }
    return (
        <div className="container">
            <form onSubmit={handleSubmit}>
            <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input type="text" className="form-control" id="name" name="name" onChange={onChange} aria-describedby="emailHelp"/>
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="email" name="email" onChange={onChange} aria-describedby="emailHelp"/>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" onChange={onChange} name="password" id="password" minLength={5} required/>
                </div>
                <div className="mb-3">
                    <label htmlFor="cpassword" className="form-label">Confirm password</label>
                    <input type="password" className="form-control" onChange={onChange} name="cpassword" id="cpassword" minLength={5} required/>
                </div>
               
                <button type="submit" className="btn btn-primary">Signup</button>
            </form>
        </div>
    )
}
