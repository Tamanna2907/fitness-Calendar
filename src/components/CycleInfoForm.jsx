import React, {useState} from "react";
import { useNavigate } from "react-router-dom";
import axios from './axios';

const CycleInfoForm = () =>{
    const navigate = useNavigate();

    const [currentStep, setCurrentStep] = useState(0);
    const [info, setInfo] = useState({
        cycleLength:"",
        periodDuration:"",
        lastPeriodDate:"",
        cycleRegularity:""

    })

    const questions =[
        { question: "What is the average length of your menstrual cycle?", type: "number", name: "cycleLength" },
        { question: "How long does your period usually last?", type: "number", name:"periodDuration"},
        { question: "When did your last period start?", type: "date", name:"lastPeriodDate" },
        { question: "Is your cycle regular or irregular?", type: "radio", options: ["Regular", "Irregular", "Not Sure"], name:"cycleRegularity" },
    ]

    const handleNext =()=>{
        if(currentStep<questions.length-1){
            setCurrentStep(currentStep+1)
        }
    }

    const handlePrevious =()=>{
        if(currentStep>0){
            setCurrentStep(currentStep-1)
        }
    }

    const handleInput =(e) =>{
        let name=e.target.name;
        let value=e.target.value;

        setInfo({
            ...info,
            [name]:value
        })
    }

    const handleSubmit = (e) =>{
        e.preventDefault();

        let data = {cycleLength: info.cycleLength,
            periodDuration: info.periodDuration,
            lastPeriodDate: info.lastPeriodDate,
            cycleRegularity: info.cycleRegularity}

        axios.post('/saveCycleInformation',data)
        .then(function(response){
            alert(response.data)
            navigate('/')
        })
        .catch(function(error){
            console.log(error)
            alert(error,"error")
        })
    }

    return(
        <>
        <section>
            <div className="row">
            <div className="container mainContainer m-5 text-center col-sm-4 offset-sm-4">
                <h3 className="pt-2">Cycle Information</h3>
                <div className="secondContainer p-3 ">
                    <form onSubmit={handleSubmit}>

                    <h4>{questions[currentStep].question}</h4>
                    {questions[currentStep].name==="cycleLength" && (
                        <input type="number" className="form-control mt-3 boxShadow" name="cycleLength" id="cycleLength" placeholder="Enter no. of Days" min={1} onChange={handleInput} value={info.cycleLength} />
                    )}
                    {questions[currentStep].name==="periodDuration" && (
                        <input type="number" className="form-control mt-3 boxShadow" name="periodDuration" id="periodDuration" placeholder="Enter no. of Days" min={1} onChange={handleInput} value={info.periodDuration} />
                    )}
                    {questions[currentStep].name === "lastPeriodDate" && (
                        <input type="date" name="lastPeriodDate" id="lastPeriodDate" className="form-control mt-3 boxShadow" onChange={handleInput} value={info.lastPeriodDate}/>
                    )}
                    {questions[currentStep].name === "cycleRegularity" && (
                        <div className="text-dark p-2">
                            {questions[currentStep].options?.map((option,index)=>(
                                <label key={index}>
                                    <input type="radio" name="cycleRegularity" value={option} onChange={handleInput} checked={info.cycleRegularity===option} /> {option}
                                </label>
                            ))}
                        </div>
                    )}
                    
                    <div className="d-flex justify-content-between">
                    <button type="button" className="btn btn-light mt-3 pt-0 pb-0" onClick={handlePrevious}>Prev</button>
                    {currentStep===questions.length-1 && (
                        <button type="submit" className="btn btn-light mt-3 pt-0 pb-0">Submit</button>
                    )} 
                    <button type="button" className="btn btn-light mt-3 pt-0 pb-0" onClick={handleNext}>Next</button>
                    </div>
                    
                    </form>
                </div>
            </div>
            </div>
        </section>
        </>
    )
}

export default CycleInfoForm;