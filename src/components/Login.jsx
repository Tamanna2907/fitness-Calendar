import React from "react";
import "../css/registerationForm.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "./axios";
import {showToast} from './ToastifyContainer';
import { useAuth } from "../store/auth";

function Login(){

    const [email, setEmail]=useState("");
    const [password, setPassword]=useState("");

    const {storeTokenInLS} = useAuth();
    const navigate = useNavigate();
    // const {user} = useAuth();

    // if(user){
    //     console.log(user,"in log in page userrrr")
    // }

    const handleEmail=(event)=>{
        setEmail(event.target.value);
    }

    const handlePassword=(event)=>{
        setPassword(event.target.value)
    }

    const handleSubmit=async (e)=>{

        e.preventDefault();


        axios.post('/api/loginForm', {
            email:email,
            password:password
        })

        .then(async function (response){
            let token = response.data.token;
            storeTokenInLS(token)
            // const res_data = await response.data;
            showToast.success('Login Successful')
            navigate('/')
        })
        .catch(async function(error){
            showToast.error(error.response.data.message || "Login failed")
        })
    }

    return(
        <>
         <section>
            <div className="row">
            <div className="container mainContainer m-5 text-center col-sm-4 offset-sm-4">
                <h3 className="pt-2">Login</h3>
                <div className="secondContainer p-3 ">
                    
                    <input type="email" className="email form-control mt-3 boxShadow" name="email" id="email" placeholder="Enter Your E-Mail" value={email} onChange={handleEmail}  />


                    <input type="password" className="form-control mt-3 boxShadow" name="password" id="password" placeholder="Enter your Password" value={password} onChange={handlePassword}/>

                    <button type="submit" className="btn btn-light mt-3" onClick={handleSubmit}>Submit</button>
                    
                </div>
            </div>
            </div>
        </section>
        </>
    )
};

export default Login;