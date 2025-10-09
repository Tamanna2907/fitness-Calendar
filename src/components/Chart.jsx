import React, { useState, useEffect } from 'react';
import { Calendar, TrendingUp, Activity, Clock, BarChart3, Target, AlertCircle, Heart } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';
import { useAuth } from '../store/auth';
import axios from "./axios";

const Chart = () => {
  const [selectedTimeframe, setSelectedTimeframe] = useState('6months');
  const [cycleData, setCycleData] = useState([]);
const { userId } = useAuth();

  useEffect(() => {
    console.log("Inside useEffect. userId =", userId);

    const getMonthlyCycleSummary = async () => {
 console.log("Fetching monthly cycle summary for userId:", userId);
        try{
            const response = await axios.get(`/cycleLog/getMonthlyCycleSummary/${userId}`);
            console.log("Response from API:", response.data);
            const logs = response.data;
            console.log("Fetched logs:", logs);
            setCycleData(logs);
        }catch(error){
            console.error("Error fetching logs:", error);
            
        }
        
    }

    if (userId) {
        getMonthlyCycleSummary();
    }
  }, [userId]);


  // Sample data - in a real app, this would come from user's tracked data
//   const cycleData = [
//     { month: 'Jan', cycleLength: 28, periodLength: 5, symptoms: 3 },
//     { month: 'Feb', cycleLength: 30, periodLength: 4, symptoms: 2 },
//     { month: 'Mar', cycleLength: 29, periodLength: 5, symptoms: 4 },
//     { month: 'Apr', cycleLength: 27, periodLength: 4, symptoms: 2 },
//     { month: 'May', cycleLength: 28, periodLength: 5, symptoms: 3 },
//     { month: 'Jun', cycleLength: 29, periodLength: 4, symptoms: 1 }
//   ];

  const symptomData = [
    { name: 'Cramps', value: 35, color: '#ef4444' },
    { name: 'Mood Changes', value: 25, color: '#f97316' },
    { name: 'Headaches', value: 20, color: '#eab308' },
    { name: 'Bloating', value: 15, color: '#22c55e' },
    { name: 'Fatigue', value: 5, color: '#3b82f6' }
  ];

  const moodData = [
    { day: 'Day 1', mood: 3 },
    { day: 'Day 5', mood: 4 },
    { day: 'Day 10', mood: 5 },
    { day: 'Day 14', mood: 4 },
    { day: 'Day 21', mood: 3 },
    { day: 'Day 28', mood: 4 }
  ];

  const averages = {
    cycleLength: 28.5,
    periodLength: 4.5,
    nextPeriod: '2024-07-15',
    fertility: '2024-07-01'
  };

  const InsightCard = ({ icon: Icon, title, value, subtitle, trend, trendColor = 'text-green-500' }) => (
    <div className="bg-white rounded-lg shadow-sm border p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-pink-100 rounded-lg">
            <Icon className="w-5 h-5 text-pink-600" />
          </div>
          <h3 className="font-semibold text-gray-800">{title}</h3>
        </div>
        {trend && (
          <span className={`text-sm font-medium ${trendColor}`}>
            {trend}
          </span>
        )}
      </div>
      <div className="space-y-1">
        <p className="text-2xl font-bold text-gray-900">{value}</p>
        {subtitle && <p className="text-sm text-gray-600">{subtitle}</p>}
      </div>
    </div>
  );

  const PredictionCard = ({ title, date, description, type }) => {
    const bgColor = type === 'period' ? 'bg-red-50 border-red-200' : 'bg-green-50 border-green-200';
    const iconColor = type === 'period' ? 'text-red-600' : 'text-green-600';
    
    return (
      <div className={`${bgColor} border rounded-lg p-4`}>
        <div className="flex items-center space-x-3 mb-2">
          <Calendar className={`w-5 h-5 ${iconColor}`} />
          <h4 className="font-semibold text-gray-800">{title}</h4>
        </div>
        <p className="text-lg font-bold text-gray-900 mb-1">{date}</p>
        <p className="text-sm text-gray-600">{description}</p>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Your Cycle Insights</h1>
          <p className="text-gray-600">Understand your patterns and stay informed about your health</p>
          
          {/* Timeframe Selector */}
          <div className="flex space-x-2 mt-4">
            {['3months', '6months', '1year'].map((timeframe) => (
              <button
                key={timeframe}
                onClick={() => setSelectedTimeframe(timeframe)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  selectedTimeframe === timeframe
                    ? 'bg-pink-600 text-white'
                    : 'bg-white text-gray-600 hover:bg-gray-100'
                }`}
              >
                {timeframe === '3months' && '3 Months'}
                {timeframe === '6months' && '6 Months'}
                {timeframe === '1year' && '1 Year'}
              </button>
            ))}
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <InsightCard
            icon={Clock}
            title="Avg Cycle Length"
            value={`${averages.cycleLength} days`}
            subtitle="Normal range: 21-35 days"
            trend="+0.5 days"
          />
          <InsightCard
            icon={Activity}
            title="Avg Period Length"
            value={`${averages.periodLength} days`}
            subtitle="Normal range: 3-7 days"
            trend="Stable"
          />
          <InsightCard
            icon={Target}
            title="Cycle Regularity"
            value="92%"
            subtitle="Very consistent"
            trend="+3%"
          />
          <InsightCard
            icon={Heart}
            title="Overall Health"
            value="Good"
            subtitle="Based on logged symptoms"
            trend="Stable"
          />
        </div>

        {/* Predictions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <PredictionCard
            title="Next Period"
            date="July 15, 2024"
            description="Expected to start in 7 days"
            type="period"
          />
          <PredictionCard
            title="Fertile Window"
            date="July 1-6, 2024"
            description="Peak fertility expected"
            type="fertility"
          />
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Cycle Length Trend */}
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <div className="flex items-center space-x-3 mb-6">
              <TrendingUp className="w-5 h-5 text-pink-600" />
              <h3 className="font-semibold text-gray-800">Cycle Length Trends</h3>
            </div>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={cycleData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
                <XAxis dataKey="month" stroke="#6b7280" />
                <YAxis stroke="#6b7280" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'white', 
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px'
                  }}
                />
                <Line 
                  type="monotone" 
                  dataKey="cycleLength" 
                  stroke="#ec4899" 
                  strokeWidth={3}
                  dot={{ fill: '#ec4899', strokeWidth: 2, r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Symptom Distribution */}
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <div className="flex items-center space-x-3 mb-6">
              <BarChart3 className="w-5 h-5 text-pink-600" />
              <h3 className="font-semibold text-gray-800">Common Symptoms</h3>
            </div>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={symptomData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {symptomData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="grid grid-cols-2 gap-2 mt-4">
              {symptomData.map((item, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <div 
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: item.color }}
                  />
                  <span className="text-sm text-gray-600">{item.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Additional Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Period Length Comparison */}
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <div className="flex items-center space-x-3 mb-6">
              <BarChart3 className="w-5 h-5 text-pink-600" />
              <h3 className="font-semibold text-gray-800">Period Length Over Time</h3>
            </div>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={cycleData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
                <XAxis dataKey="month" stroke="#6b7280" />
                <YAxis stroke="#6b7280" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'white', 
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px'
                  }}
                />
                <Bar dataKey="periodLength" fill="#ec4899" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Mood Patterns */}
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <div className="flex items-center space-x-3 mb-6">
              <Heart className="w-5 h-5 text-pink-600" />
              <h3 className="font-semibold text-gray-800">Mood Throughout Cycle</h3>
            </div>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={moodData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
                <XAxis dataKey="day" stroke="#6b7280" />
                <YAxis domain={[1, 5]} stroke="#6b7280" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'white', 
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px'
                  }}
                />
                <Line 
                  type="monotone" 
                  dataKey="mood" 
                  stroke="#3b82f6" 
                  strokeWidth={3}
                  dot={{ fill: '#3b82f6', strokeWidth: 2, r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
            <div className="mt-4 text-sm text-gray-600">
              Scale: 1 (Poor) to 5 (Excellent)
            </div>
          </div>
        </div>

        
      </div>
    </div>
  );
};

export default Chart;