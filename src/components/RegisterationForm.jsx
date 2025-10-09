import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "./axios";
import { showToast } from "./ToastifyContainer";

const RegistrationForm = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);

  // Registration State
  const [user, setUser] = useState({
    username: "",
    email: "",
    phone: "",
    password: "",
    cycleLength: "",
    periodDuration: "",
    lastPeriodDate: "",
    cycleRegularity: "",
  });

  const handleInput = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  // Move to next step without saving to backend
  const handleNext = (e) => {
    e.preventDefault();
    setStep(2);
  };

  // Handle Complete Registration (Basic Info + Cycle Info)
  const handleCompleteRegistration = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/auth/registration", user);
      showToast.success("Registration successful");
      navigate("/");
    } catch (error) {
      showToast.error("Registration failed");
      console.log(error);
    }
  };

  return (
    <section>
      <div className="row">
        <div className="container mainContainer m-5 text-center col-sm-4 offset-sm-4">
          {step === 1 ? (
            // Registration Form
            <>
              <h3 className="pt-2">Register Yourself</h3>
              <div className="secondContainer p-3">
                <form onSubmit={handleNext}>
                  <input type="text" name="username" className="form-control mt-3" placeholder="Enter Your Name" value={user.username} onChange={handleInput} required />
                  <input type="email" name="email" className="form-control mt-3" placeholder="Enter your Email" value={user.email} onChange={handleInput} required />
                  <input type="text" name="phone" className="form-control mt-3" placeholder="Enter your Phone" value={user.phone} onChange={handleInput} required />
                  <input type="password" name="password" className="form-control mt-3" placeholder="Enter your Password" value={user.password} onChange={handleInput} required />
                  <button type="submit" className="btn btn-light mt-3">Next</button>
                </form>
              </div>
            </>
          ) : (
            // Cycle Information Form
            <>
              <h1 className="pt-2">Cycle Information</h1>
              <div className="secondContainer p-3 text-left">
                <form onSubmit={handleCompleteRegistration}>
                    <h3 className="text-bold">Please provide the following information :</h3>

                    <label htmlFor="cycleLength">What is your normal Cycle Length?</label>
                    <input type="number" name="cycleLength" id="cycleLength" className="form-control mt-3" placeholder="Cycle Length (Days)" min={1} value={user.cycleLength} onChange={handleInput} required />

                    <label htmlFor="periodDuration">What is your Period Duration?</label>
                    <input type="number" name="periodDuration" id="periodDuration" className="form-control mt-3" placeholder="Period Duration (Days)" min={1} value={user.periodDuration} onChange={handleInput} required />

                    <label htmlFor="lastPeriodDate">When was your Last Period Started?</label>
                    <input type="date" name="lastPeriodDate" id="lastPeriodDate" className="form-control mt-3" value={user.lastPeriodDate} onChange={handleInput} required />
                    
                    <label>How is Your Cycle?</label>
                    <div className="text-dark p-2">
                        <label><input type="radio" name="cycleRegularity" value="Regular" onChange={handleInput} checked={user.cycleRegularity === "Regular"} /> Regular</label>
                        <label><input type="radio" name="cycleRegularity" value="Irregular" onChange={handleInput} checked={user.cycleRegularity === "Irregular"} /> Irregular</label>
                        <label><input type="radio" name="cycleRegularity" value="Not Sure" onChange={handleInput} checked={user.cycleRegularity === "Not Sure"} /> Not Sure</label>
                    </div>
                    <button type="submit" className="btn btn-light mt-3">Submit</button>
                </form>
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default RegistrationForm;
