import React, {useEffect} from "react";
import Navbar from "./Navbar";
import axios from "axios";


function Home(){
    useEffect(()=>{
        axios.defaults.baseURL = 'http://localhost:5000';
    },[])
    return(
    <>
        <Navbar/>
        
    </>
    )
}

export default Home;