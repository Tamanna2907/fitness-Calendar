import React from 'react';
import { useNavigate } from 'react-router-dom';

function Dashboard(){

    const Navigate= useNavigate()
    const goToCalender=()=>{
        Navigate("/Calender")
    }


    return(
        <>
        <div className='container signatureBg mt-3 rounded text-white'>
            <div className='content'>
                <h1 className='pt-3'>YOUR PERSONAL FITNESS TRACKER</h1>

                <div className="row mt-5">
                    <div className="col-3 bg-white h_170 m-2 rounded"></div>
                    <div className="col-3 bg-white h_170 m-2 rounded"></div>
                    <div className="col-3 bg-white h_170 m-2 rounded"></div>
                </div>

                <div className='text-start'>
                    <button className='btn btn-light' onClick={()=>{goToCalender()}}>Calender</button>
                </div>
            </div>

        </div>


        </>
    )
}

export default Dashboard;