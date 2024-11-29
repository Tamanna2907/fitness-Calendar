import React from "react";
import "../css/registerationForm.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from './axios';
import {showToast} from './ToastifyContainer';
import { useAuth } from "../store/auth";


function RegisterationForm(){

const navigate = useNavigate()

const [user , setUser] =useState({
    username:"",
    email:"",
    phone:"",
    password:""
});

const {storeTokenInLS} = useAuth();


const handleInput=(e)=>{
    let name= e.target.name;
    let value=e.target.value;

    setUser({
        ...user,
        [name]:value,
    })
}

const handleSubmit= async (e)=>{
    e.preventDefault();

    axios.post('/registration', {
        username:user.username,
        email:user.email,
        phone:user.phone,
        password:user.password

    })
      .then(function (response) {
        let token = response.data.token;
        storeTokenInLS(token)
        showToast.success('registration successful')
        navigate('/cycleInfoForm', {
            state:{
                userId: response.data.userId
            }
        })
      })
      .catch(function (error) {
        showToast.error(error.response.data.message)
      });
}


    return(
        <>
        <section>
            <div className="row">
            <div className="container mainContainer m-5 text-center col-sm-4 offset-sm-4">
                <h3 className="pt-2 ">Register Yourself</h3>
                <div className="secondContainer p-3 ">
                    <form onSubmit={handleSubmit}>
                    <input type="text" className="username form-control mt-3 boxShadow" name="username" id="userName" placeholder="Enter Your Name" value={user.username} onChange={handleInput} />

                    <input type="email" name="email" className="form-control mt-3 boxShadow" id="email" placeholder="Enter your mail Id" value={user.email} onChange={handleInput} />

                    <input type="text" className="form-control mt-3 boxShadow" id="phone" name="phone" placeholder="Enter your mobile no." value={user.phone} onChange={handleInput}/>

                    <input type="password" className="form-control mt-3 boxShadow" name="password" id="password" placeholder="Enter your Password" value={user.password} onChange={handleInput}/>

                    <button type="submit" className="btn btn-light mt-3">Submit</button>
                    </form>
                </div>
            </div>
            </div>
            <div>
      
    </div>
        </section>
        </>
    )
}

export default RegisterationForm;