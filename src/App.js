import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Dashboard from './components/Dashboard';
import Calender from './components/Calender';
import Log from './components/Log';
import Notes from './components/Notes';
import Chart from './components/Chart';
import Home from './components/Home';
import RegistrationForm from './components/RegisterationForm';
import Login from './components/Login';
import { Logout } from './components/Logout';
import CycleInfoForm from './components/CycleInfoForm';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <div>
      <ToastContainer />
    <BrowserRouter>

      <Routes>
        <Route path="/" element={<Home />}>
          <Route index element={< Dashboard />}></Route>
          <Route path="/Calender" element={<Calender />}></Route>
          <Route path="/Log" element={<Log />}></Route>
          <Route path="/Notes" element={<Notes />}></Route>
          <Route path="/Chart" element={<Chart />}></Route>
          <Route path="/RegistrationForm" element={<RegistrationForm />}></Route>
          <Route path="/Login" element={<Login />}></Route>
          <Route path="/Logout" element={<Logout />}></Route>
          <Route path="/cycleInfoForm" element={<CycleInfoForm />} />
        </Route>
        
      </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
