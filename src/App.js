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


function App() {
  return (
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
        </Route>
        
      </Routes>
    </BrowserRouter>
    
  );
}

export default App;
