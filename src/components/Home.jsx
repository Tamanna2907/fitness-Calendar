import React, {useEffect} from "react";
import Navbar from "./Navbar";
import axios from "axios";


function Home(){
    useEffect(()=>{
        axios.defaults.baseURL = 'http://localhost:4000';
    },[])
    return(
    <>
        <Navbar/>
        
    </>
    )
}

export default Home;