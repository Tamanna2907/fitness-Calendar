import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, ChevronRight, Plus, Edit, Trash2, Bell, BarChart2, Heart, Moon, Droplets, Activity } from 'lucide-react';
import { useAuth } from '../store/auth';
import axios from "./axios";

// Custom theme colors - based on pink primary color
const THEME = {
  primary: 'rgb(236, 72, 153)', // Pink
  primaryLight: 'rgba(236, 72, 153, 0.1)',
  primaryDark: '#d61c80',
  secondary: '#8b5cf6', // Purple
  light: '#fff9fb',
  dark: '#4a2040',
  success: '#10b981',
  warning: '#f59e0b',
  danger: '#ef4444',
  info: '#3b82f6'
};

function Dashboard() {
  const navigate = useNavigate();
  const [cycleData, setCycleData] = useState([]);
  const [averageCycleLength, setAverageCycleLength] = useState(28);
  const [nextPeriodDate, setNextPeriodDate] = useState(null);
  const [lastPeriod, setLastPeriod] = useState(null);
  const [currentPhase, setCurrentPhase] = useState("");
  const [phaseProgress, setPhaseProgress] = useState(0);
  const { userId } = useAuth();
  // Mock data - in a real app, this would come from your database/storage
  useEffect(() => {

    const fetchLogHistory = async () => {

        try{
            const response = await axios.get(`/cycleLog/getCycleLogHistory/${userId}`);
            const logs = response.data;
            setCycleData(logs);
            console.log("Fetched logs:", logs);
        }catch(error){
            console.error("Error fetching logs:", error);
            
        }
        
    }

    

    const cycleInfo = async () => {
        try {
            const response = await axios.get(`/cycleLog/cycleInfo/${userId}`);
            const logs = response.data;
    
            const lastPeriod = new Date(logs[0].cycleInfo.lastPeriodDate);
            setLastPeriod(lastPeriod);
       
            const nextPeriod = new Date(lastPeriod);
            nextPeriod.setDate(nextPeriod.getDate() + logs[0].cycleInfo.cycleLength);
            console.log("Next period date:", nextPeriod);
            
            setNextPeriodDate(nextPeriod);
        } catch (error) {
            console.error("Error fetching cycle log:", error);
        }
    }
    
    
    
    // Calculate next period
   
    
    // Calculate current phase and progress
    const phase = getCyclePhase();
    setCurrentPhase(phase);
    
    // Set phase progress (simplified)
    const progress = {
      "Menstrual": 70,
      "Follicular": 30,
      "Ovulation": 85,
      "Luteal": 45
    };
    if (userId) {
        fetchLogHistory();
        cycleInfo();
    }
    setPhaseProgress(progress[phase] || 0);
  }, [userId]);
  
  const goToCalendar = () => {
    navigate("/Calender");
  };
  
  const goToAddLog = () => {
    navigate("/Log");
  };
  
  const goToCharts = () => {
    navigate("/Chart");
  };
  
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };
  
  const getCyclePhase = () => {
    // Simplified phase detection - in real app would be more sophisticated
    const today = new Date();
    const daysSinceLastPeriod = Math.floor((today - lastPeriod) / (1000 * 60 * 60 * 24));
    
    if (daysSinceLastPeriod < 5) return "Menstrual";
    if (daysSinceLastPeriod < 14) return "Follicular";
    if (daysSinceLastPeriod < 16) return "Ovulation";
    return "Luteal";
  };
  
  const getPhaseIcon = (phase) => {
    switch(phase) {
      case "Menstrual": return <Droplets size={20} />;
      case "Follicular": return <Activity size={20} />;
      case "Ovulation": return <Heart size={20} />;
      case "Luteal": return <Moon size={20} />;
      default: return <Activity size={20} />;
    }
  };
  
  const getTipForPhase = () => {
    const phase = getCyclePhase();
    const tips = {
      "Menstrual": "Remember to stay hydrated and rest if needed.",
      "Follicular": "Your energy is rising! Good time for starting new projects.",
      "Ovulation": "You may feel more social and confident during this phase.",
      "Luteal": "Focus on self-care as your body prepares for your next cycle."
    };
    return tips[phase] || "Track your symptoms regularly for better predictions.";
  };
  
  const handleDeleteLog = (id) => {
    setCycleData(cycleData.filter(log => log.id !== id));
  };
  
  const handleEditLog = (id) => {
    navigate(`/EditLog/${id}`);
  };
  
  const handleViewDetails = (id) => {
    navigate(`/LogDetails/${id}`);
  };

  // Badge colors for flow levels
  const getFlowBadgeColor = (flow) => {
    switch(flow) {
      case 'Heavy': return 'bg-danger';
      case 'Medium': return 'bg-warning';
      case 'Light': return 'bg-info';
      default: return 'bg-secondary';
    }
  };

  // Get the number of days until next period
  const getDaysUntilNextPeriod = () => {
    if (!nextPeriodDate) return "?";
    const today = new Date();
    const days = Math.round((nextPeriodDate - today) / (1000 * 60 * 60 * 24));
    return days;
  };

  return (
    <div className="container-fluid px-0">
      {/* Header Section with Gradient */}
      <div 
        className="py-4 px-3 mb-4" 
        style={{ 
          background: `linear-gradient(135deg, ${THEME.primary} 0%, ${THEME.secondary} 100%)`,
          borderRadius: '0 0 20px 20px'
        }}
      >
        <div className="container">
          <div className="d-flex justify-content-between align-items-center">
            <h1 className="text-white mb-0 fs-3 fw-bold">Bloom</h1>
            <button className="btn btn-sm px-3 py-2" style={{ 
              backgroundColor: 'rgba(255, 255, 255, 0.2)', 
              border: 'none', 
              color: 'white',
              borderRadius: '50px' 
            }}>
              <Bell size={18} />
            </button>
          </div>
          <p className="text-white-50 mb-0 mt-1">Your personal period companion</p>
        </div>
      </div>

      <div className="container mb-4">
        {/* Next Period Countdown Card */}
        <div className="card shadow-sm mb-4" style={{ borderRadius: '16px', border: 'none' }}>
          <div className="card-body">
            <div className="row align-items-center">
              <div className="col-auto">
                <div style={{ 
                  backgroundColor: THEME.primaryLight, 
                  borderRadius: '50%', 
                  width: '60px', 
                  height: '60px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <Calendar size={30} style={{ color: THEME.primary }} />
                </div>
              </div>
              <div className="col">
                <h6 className="mb-1">Next period in</h6>
                <div className="d-flex align-items-baseline">
                  <span className="display-6 fw-bold me-2" style={{ color: THEME.primary }}>{getDaysUntilNextPeriod()}</span>
                  <span className="text-muted">days</span>
                </div>
                <p className="text-muted small mb-0">Expected on {nextPeriodDate ? formatDate(nextPeriodDate) : "..."}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Cycle Phase & Quick Actions */}
        <div className="row g-3 mb-4">
          {/* Current Phase Card */}
          <div className="col-md-6">
            <div className="card shadow-sm h-100" style={{ borderRadius: '16px', border: 'none' }}>
              <div className="card-body">
                <div className="d-flex align-items-center mb-3">
                  <div style={{ 
                    backgroundColor: THEME.primaryLight, 
                    borderRadius: '50%', 
                    width: '40px', 
                    height: '40px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginRight: '12px'
                  }}>
                    {getPhaseIcon(currentPhase)}
                  </div>
                  <div>
                    <h6 className="mb-0">{currentPhase} Phase</h6>
                    <p className="text-muted small mb-0">Day 15 of cycle</p>
                  </div>
                </div>
                
                <p className="mb-3 small" style={{ color: THEME.dark }}>{getTipForPhase()}</p>
                
                <div className="progress" style={{ height: "6px", borderRadius: "3px" }}>
                  <div 
                    className="progress-bar" 
                    role="progressbar" 
                    style={{ 
                      width: `${phaseProgress}%`, 
                      backgroundColor: THEME.primary 
                    }}
                    aria-valuenow={phaseProgress} 
                    aria-valuemin="0" 
                    aria-valuemax="100"
                  ></div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Quick Actions Card */}
          <div className="col-md-6">
            <div className="card shadow-sm h-100" style={{ borderRadius: '16px', border: 'none' }}>
              <div className="card-body">
                <h6 className="mb-3">Quick Actions</h6>
                <div className="row g-2">
                  <div className="col-6">
                    <button 
                      className="btn w-100 py-3 text-white" 
                      style={{ 
                        backgroundColor: THEME.primary, 
                        borderRadius: '12px',
                        boxShadow: '0 4px 6px rgba(236, 72, 153, 0.2)'
                      }} 
                      onClick={goToAddLog}
                    >
                      <Plus size={20} className="mb-1" />
                      <div className="small">Log Period</div>
                    </button>
                  </div>
                  <div className="col-6">
                    <button 
                      className="btn w-100 py-3" 
                      style={{ 
                        backgroundColor: THEME.primaryLight, 
                        color: THEME.primary,
                        borderRadius: '12px'
                      }} 
                      onClick={goToCalendar}
                    >
                      <Calendar size={20} className="mb-1" />
                      <div className="small">Calendar</div>
                    </button>
                  </div>
                  <div className="col-6">
                    <button 
                      className="btn w-100 py-3" 
                      style={{ 
                        backgroundColor: THEME.primaryLight, 
                        color: THEME.primary,
                        borderRadius: '12px'
                      }} 
                      onClick={goToCharts}
                    >
                      <BarChart2 size={20} className="mb-1" />
                      <div className="small">Insights</div>
                    </button>
                  </div>
                  <div className="col-6">
                    <button 
                      className="btn w-100 py-3" 
                      style={{ 
                        backgroundColor: THEME.primaryLight, 
                        color: THEME.primary,
                        borderRadius: '12px'
                      }}
                    >
                      <Bell size={20} className="mb-1" />
                      <div className="small">Reminders</div>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Cycle Insights Preview */}
        <div className="card shadow-sm mb-4" style={{ borderRadius: '16px', border: 'none' }}>
          <div className="card-body">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h5 className="mb-0">Cycle Insights</h5>
              <button 
                className="btn btn-sm" 
                style={{ 
                  backgroundColor: THEME.primaryLight, 
                  color: THEME.primary,
                  borderRadius: '8px'
                }} 
                onClick={goToCharts}
              >
                View All
              </button>
            </div>
            
            <div className="row g-3">
              <div className="col-6 col-md-4">
                <div className="card h-100" style={{ 
                  border: `1px solid ${THEME.primaryLight}`, 
                  borderRadius: '12px'
                }}>
                  <div className="card-body text-center py-3">
                    <h6 className="text-muted mb-2" style={{ fontSize: '0.8rem' }}>Avg Cycle Length</h6>
                    <p className="display-6 mb-0" style={{ color: THEME.primary }}>{averageCycleLength}</p>
                    <p className="text-muted" style={{ fontSize: '0.8rem' }}>days</p>
                  </div>
                </div>
              </div>
              <div className="col-6 col-md-4">
                <div className="card h-100" style={{ 
                  border: `1px solid ${THEME.primaryLight}`, 
                  borderRadius: '12px'
                }}>
                  <div className="card-body text-center py-3">
                    <h6 className="text-muted mb-2" style={{ fontSize: '0.8rem' }}>Common Symptom</h6>
                    <p className="display-6 mb-0" style={{ color: THEME.primary }}>Cramps</p>
                    <p className="text-muted" style={{ fontSize: '0.8rem' }}>in 66% of cycles</p>
                  </div>
                </div>
              </div>
              <div className="col-12 col-md-4">
                <div className="card h-100" style={{ 
                  border: `1px solid ${THEME.primaryLight}`, 
                  borderRadius: '12px'
                }}>
                  <div className="card-body text-center py-3">
                    <h6 className="text-muted mb-2" style={{ fontSize: '0.8rem' }}>Period Duration</h6>
                    <p className="display-6 mb-0" style={{ color: THEME.primary }}>5</p>
                    <p className="text-muted" style={{ fontSize: '0.8rem' }}>days</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Past Cycles Section */}
        <div className="card shadow-sm mb-4" style={{ borderRadius: '16px', border: 'none' }}>
          <div className="card-body">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h5 className="mb-0">Past Cycles</h5>
              <span className="badge text-bg-light border">{cycleData.length} cycles</span>
            </div>
            
            {cycleData.length > 0 ? (
              <div>
                {/* Mobile view cards */}
                <div className="d-md-none">
                  {cycleData.map(cycle => {
                    const startDate = new Date(cycle.startDate);
                    const endDate = new Date(cycle.endDate);
                    const duration = Math.round((endDate - startDate) / (1000 * 60 * 60 * 24)) + 1;
                    
                    return (
                      <div 
                        key={cycle._id} 
                        className="card mb-3" 
                        style={{ 
                          borderRadius: '12px', 
                          border: `1px solid ${THEME.primaryLight}`
                        }}
                      >
                        <div className="card-body p-3">
                          <div className="d-flex justify-content-between mb-2">
                            <div>
                              <h6 className="mb-0">{formatDate(cycle.startDate)}</h6>
                              <p className="text-muted small mb-0">
                                {duration} days · <span className={`badge ${getFlowBadgeColor(cycle.flow)}`}>{cycle.flow}</span>
                              </p>
                            </div>
                            <div className="dropdown">
                              <button 
                                className="btn btn-sm" 
                                type="button" 
                                style={{ 
                                  backgroundColor: THEME.primaryLight, 
                                  color: THEME.primary,
                                  borderRadius: '8px'
                                }}
                                onClick={() => handleViewDetails(cycle._id)}
                              >
                                Details
                              </button>
                            </div>
                          </div>
                          
                          <div>
                            <p className="mb-1 small">Symptoms:</p>
                            <div>
                              {cycle.symptoms.map((symptom, idx) => (
                                <span 
                                  key={idx} 
                                  className="badge me-1 mb-1" 
                                  style={{ 
                                    backgroundColor: THEME.primaryLight, 
                                    color: THEME.primary 
                                  }}
                                >
                                  {symptom}
                                </span>
                              ))}
                            </div>
                          </div>
                          
                          <div className="d-flex justify-content-end mt-3 pt-2 border-top">
                            <button 
                              className="btn btn-sm me-2" 
                              style={{ 
                                backgroundColor: THEME.primaryLight, 
                                color: THEME.primary,
                                borderRadius: '8px'
                              }}
                              onClick={() => handleEditLog(cycle._id)}
                            >
                              <Edit size={14} className="me-1" /> Edit
                            </button>
                           
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              
                {/* Desktop view table */}
                <div className="d-none d-md-block">
                  <div className="table-responsive">
                    <table className="table table-hover" style={{ borderCollapse: 'separate', borderSpacing: '0 8px' }}>
                      <thead>
                        <tr>
                          <th>Period Dates</th>
                          <th>Duration</th>
                          <th>Flow</th>
                          <th>Symptoms</th>
                          <th>Mood</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {cycleData.map(cycle => {
                          const startDate = new Date(cycle.startDate);
                          const endDate = new Date(cycle.endDate);
                          const duration = Math.round((endDate - startDate) / (1000 * 60 * 60 * 24)) + 1;
                          
                          return (
                            <tr key={cycle._id} style={{ backgroundColor: 'white', boxShadow: '0 2px 4px rgba(0,0,0,0.05)', borderRadius: '12px' }}>
                              <td className="align-middle">{formatDate(cycle.startDate)} - {formatDate(cycle.endDate)}</td>
                              <td className="align-middle">{duration} days</td>
                              <td className="align-middle">
                                <span className={`badge ${getFlowBadgeColor(cycle.flow)}`}>
                                  {cycle.flow}
                                </span>
                              </td>
                              <td className="align-middle">
                                {cycle.symptoms.map((symptom, idx) => (
                                  <span 
                                    key={idx} 
                                    className="badge me-1" 
                                    style={{ 
                                      backgroundColor: THEME.primaryLight, 
                                      color: THEME.primary 
                                    }}
                                  >
                                    {symptom}
                                  </span>
                                ))}
                              </td>
                              <td className="align-middle">{cycle.mood}</td>
                              <td className="align-middle">
                                <div className="btn-group btn-group-sm">
                                  <button 
                                    className="btn" 
                                    style={{ backgroundColor: THEME.light, color: THEME.dark, border: 'none' }}
                                    onClick={() => handleViewDetails(cycle._id)}
                                  >
                                    View
                                  </button>
                                  <button 
                                    className="btn" 
                                    style={{ backgroundColor: THEME.primaryLight, color: THEME.primary, border: 'none' }}
                                    onClick={() => handleEditLog(cycle._id)}
                                  >
                                    <Edit size={14} />
                                  </button>
                                  <button 
                                    className="btn" 
                                    style={{ backgroundColor: 'rgba(239, 68, 68, 0.1)', color: THEME.danger, border: 'none' }}
                                    onClick={() => handleDeleteLog(cycle._id)}
                                  >
                                    <Trash2 size={14} />
                                  </button>
                                </div>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-5">
                <div style={{ 
                  backgroundColor: THEME.primaryLight, 
                  borderRadius: '50%', 
                  width: '60px', 
                  height: '60px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 16px auto'
                }}>
                  <Calendar size={30} style={{ color: THEME.primary }} />
                </div>
                <p className="text-muted mb-3">No cycle data recorded yet.</p>
                <button 
                  className="btn text-white" 
                  style={{ 
                    backgroundColor: THEME.primary,
                    borderRadius: '50px',
                    padding: '10px 24px'
                  }} 
                  onClick={goToAddLog}
                >
                  <Plus size={18} className="me-1" /> Add Your First Log
                </button>
              </div>
            )}
            
            {cycleData.length > 0 && (
              <div className="d-flex justify-content-center mt-3">
                <button 
                  className="btn text-white" 
                  style={{ 
                    backgroundColor: THEME.primary,
                    borderRadius: '50px',
                    padding: '10px 24px',
                    boxShadow: '0 4px 6px rgba(236, 72, 153, 0.2)'
                  }} 
                  onClick={goToAddLog}
                >
                  <Plus size={18} className="me-2" /> Add New Log
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;