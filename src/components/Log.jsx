import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useAuth } from '../store/auth';
import axios from "./axios";
import {showToast} from './ToastifyContainer';


const Log = () => {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [selectedDates, setSelectedDates] = useState([new Date()]);
  const [flowIntensity, setFlowIntensity] = useState('medium');
  const [logId, setLogId] = useState(null);
  const { userId } = useAuth();
  
  console.log("User ID from Auth:", userId);
  const { register, handleSubmit,setValue, formState: { errors } } = useForm();

  useEffect(() => {
    const fetchLatestLog = async () => {
      try {
        const response = await axios.get(`/cycleLog/getCycleLog/${userId}`);
        const logs = response.data;
  
        if (logs.length > 0) {
          const latestLog = logs[0];
  
          const parsedStart = new Date(latestLog.startDate);
          setStartDate(isNaN(parsedStart) ? null : parsedStart);
  
          const parsedEnd = new Date(latestLog.endDate);
          setEndDate(isNaN(parsedEnd) ? null : parsedEnd);
  
          setSelectedDates(
            latestLog.selectedDates?.map(date => new Date(date)) || []
          );
          setFlowIntensity(latestLog.flowIntensity);
          setSelectedSymptoms(latestLog.symptoms || []);
          setValue("mood", latestLog.mood || "");
          setValue("notes", latestLog.notes || "");
          setLogId(latestLog._id);
        } else {
          showToast.info("No previous logs found");
        }
      } catch (error) {
        console.error("Error fetching logs:", error);
        showToast.error("Failed to load previous log");
      }
    };
  
    if (userId) {
      fetchLatestLog();
    }
  }, [userId]);
  
  
  // Common symptoms list
  const commonSymptoms = [
    'Cramps', 'Headache', 'Bloating', 'Fatigue', 
    'Acne', 'Mood swings', 'Insomnia', 'Breast tenderness'
  ];
  
  const [selectedSymptoms, setSelectedSymptoms] = useState([]);
  
  const toggleSymptom = (symptom) => {
    if (selectedSymptoms.includes(symptom)) {
      setSelectedSymptoms(selectedSymptoms.filter(s => s !== symptom));
    } else {
      setSelectedSymptoms([...selectedSymptoms, symptom]);
    }
  };
  
  // Handle period date range selection
  const handleDateChange = (dates) => {
    const [start, end] = dates;
  
    if (start instanceof Date && !isNaN(start)) {
      setStartDate(start);
    } else {
      setStartDate(null);
    }
  
    if (end instanceof Date && !isNaN(end)) {
      setEndDate(end);
    } else {
      setEndDate(null);
    }
  
    if (start && end) {
      const dateArray = [];
      let currentDate = new Date(start);
      while (currentDate <= end) {
        dateArray.push(new Date(currentDate));
        currentDate.setDate(currentDate.getDate() + 1);
      }
      setSelectedDates(dateArray);
    }
  };
  
  
  const submitForm = async(data) => {
    const periodData = {
      userId,
      startDate,
      endDate,
      selectedDates,
      symptoms: selectedSymptoms,
      notes: data.notes,
      flowIntensity,
      mood: data.mood,
      createdAt: new Date()
    };
    
    // You'll need to define this function or pass it as a prop
    console.log('Submitting period data:', periodData);
    // onSubmit(periodData);

    try {
      if (logId) {
        // Update
        await axios.put(`/cycleLog/updateCycleLog/${logId}`, periodData);
        showToast.success("Log updated successfully!");
      } else {
        // Create new
        await axios.post("/cycleLog/saveFullCycleLog", { periodData });
        showToast.success("Log saved successfully!");
      }
      } catch (error) {
        showToast.error(error.message || "Failed to save cycle log");
        console.error(error);
      }
  };



  
  
  return (
    <div className="bg-gray-50 min-h-screen p-4">
      <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden">
        {/* Header */}
        <div className="bg-pink-500 p-4">
          <h1 className="text-white text-xl font-bold">Menstrual Health Companion</h1>
        </div>
        
        <form onSubmit={handleSubmit(submitForm)} className="p-6 space-y-6">
          {/* Page Title */}
          <h2 className="text-2xl font-bold text-gray-800">Log Your Period</h2>
          
          {/* Date Selection */}
          <div className="space-y-2">
            <label className="block text-gray-700 font-medium">Period Dates</label>
            <div className="border border-gray-300 rounded-md p-2">
              <DatePicker
                selected={startDate}
                onChange={handleDateChange}
                startDate={startDate}
                endDate={endDate}
                selectsRange
                inline
                className="w-full"
              />
            </div>
            <div className="flex justify-between text-sm text-gray-600">
              <span>Start: {startDate ? startDate.toLocaleDateString() : 'Not selected'}</span>
              <span>End: {endDate ? endDate.toLocaleDateString() : 'Not selected'}</span>
            </div>
            {errors.dates && <p className="text-red-500 text-sm">Please select period dates</p>}
          </div>
          
          {/* Flow Intensity */}
          <div className="space-y-2">
            <label className="block text-gray-700 font-medium">Flow Intensity</label>
            <div className="flex rounded-lg bg-gray-100 p-1">
              <button
                type="button"
                className={`flex-1 py-2 px-4 rounded-lg text-center ${
                  flowIntensity === 'light' 
                    ? 'bg-pink-500 text-white' 
                    : 'bg-gray-100 text-gray-700'
                }`}
                onClick={() => setFlowIntensity('light')}
              >
                Light
              </button>
              <button
                type="button"
                className={`flex-1 py-2 px-4 rounded-lg text-center ${
                  flowIntensity === 'medium' 
                    ? 'bg-pink-500 text-white' 
                    : 'bg-gray-100 text-gray-700'
                }`}
                onClick={() => setFlowIntensity('medium')}
              >
                Medium
              </button>
              <button
                type="button"
                className={`flex-1 py-2 px-4 rounded-lg text-center ${
                  flowIntensity === 'heavy' 
                    ? 'bg-pink-500 text-white' 
                    : 'bg-gray-100 text-gray-700'
                }`}
                onClick={() => setFlowIntensity('heavy')}
              >
                Heavy
              </button>
            </div>
          </div>
          
          {/* Symptoms */}
          <div className="space-y-2">
            <label className="block text-gray-700 font-medium">Symptoms</label>
            <div className="grid grid-cols-2 gap-2 md:grid-cols-3">
              {commonSymptoms.map((symptom) => (
                <button
                  key={symptom}
                  type="button"
                  className={`py-2 px-3 rounded-full text-sm font-medium ${
                    selectedSymptoms.includes(symptom)
                      ? 'bg-pink-500 text-white'
                      : 'bg-gray-100 text-gray-700 border border-gray-200'
                  }`}
                  onClick={() => toggleSymptom(symptom)}
                >
                  {symptom}
                </button>
              ))}
            </div>
          </div>
          
          {/* Mood Tracking */}
          <div className="space-y-2">
            <label htmlFor="mood" className="block text-gray-700 font-medium">
              Mood
            </label>
            <select
              id="mood"
              className="w-full p-2 border border-gray-300 rounded-md"
              {...register("mood")}
            >
              <option value="">Select mood...</option>
              <option value="happy">Happy</option>
              <option value="sad">Sad</option>
              <option value="sensitive">Sensitive</option>
              <option value="irritable">Irritable</option>
              <option value="anxious">Anxious</option>
              <option value="calm">Calm</option>
            </select>
          </div>
          
          {/* Notes */}
          <div className="space-y-2">
            <label htmlFor="notes" className="block text-gray-700 font-medium">
              Notes
            </label>
            <textarea
              id="notes"
              rows="3"
              className="w-full p-2 border border-gray-300 rounded-md"
              placeholder="Add any additional notes here..."
              {...register("notes")}
            ></textarea>
          </div>
          
          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-pink-500 text-white py-3 px-4 rounded-lg font-medium hover:bg-pink-600 transition duration-300"
          >
            Save Period Log
          </button>
        </form>
      </div>
    </div>
  );
};

export default Log;