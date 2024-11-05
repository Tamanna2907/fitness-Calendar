import React, {useState} from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import '../App.css'

const localizer = momentLocalizer(moment);



function MyCalendar() {

  const [events, setEvents] = useState([]);
 
  const handleSelectSlot =({start}) =>{
    
    const end=addDays(start, 5)

    const newEvent = {
        id:events.length,
        title: 'selected range',
        start,
        end,
        allDay: true,
        selectedDates: generateDateRange(start, end)
      }
      console.log(newEvent,"newEvent")
      setEvents([...events, newEvent]);
  }

  const addDays =(date, days) =>{
    let result = new Date(date);
    result.setDate(result.getDate() + days);
    return result
  }

  const generateDateRange = (start, end) => {
    const dates = new Set();
    let current = new Date(start);
    while (current <= end) {
      dates.add(current.toISOString().split('T')[0]);
      current = addDays(current, 1);
    }
    return dates;
  };

 
  
  const eventPropGetter = () => {
    return {
      className: 'full-box-color',
    };
  };

  return (
    <div style={{ height: 500 }}>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        views={['month', 'week', 'day']}
        defaultView="month"
        style={{ height: '100%' }}
        selectable
        onSelectSlot={handleSelectSlot}
        eventPropGetter={eventPropGetter}
      />
    </div>
  )
}

export default MyCalendar;