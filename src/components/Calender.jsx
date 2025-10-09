import React, { useState, useRef, useEffect } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import axios from "./axios";
import { useAuth } from "../store/auth";
import { showToast } from "./ToastifyContainer";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "../App.css";
import "../css/calendar.css";
const localizer = momentLocalizer(moment);

function MyCalendar() {
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const modalRef = useRef(null);
  const { userId } = useAuth();

  const handleSelectSlot =async ({ start }) => {

    const end = addDays(start, 5);
    const selectedDates = Array.from(generateDateRange(start, end)); 

    const newEvent = {
      id: events.length,
      title: "Menses Days",
      start,
      end,
      allDay: true,
      selectedDates,
    };
    setEvents([...events, newEvent]);

    try {
      await axios.post("/cycleLog/saveCycleLog", { userId, start, end, selectedDates });
      showToast.success("Cycle log saved successfully!");
    } catch (error) {
      showToast.error("Failed to save cycle log");
      console.error(error);
    }
  };

  const addDays = (date, days) => {
    let result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
  };

  const generateDateRange = (start, end) => {
    const dates = new Set();
    let current = new Date(start);
    while (current <= end) {
      dates.add(current.toISOString().split("T")[0]);
      current = addDays(current, 1);
    }
    return dates;
  };

  const handleEventClick = (event) => {
    setSelectedEvent(event);
  };

  const handleUpdateEvent = () => {
    setEvents(
      events.map((event) =>
        event.id === selectedEvent.id
          ? {
              ...event,
              start: selectedEvent.start,
              end: selectedEvent.end,
              selectedDates: generateDateRange(selectedEvent.start, selectedEvent.end),
            }
          : event
      )
    );
    setSelectedEvent(null);
  };

  useEffect(() => {
    function handleClickOutside(event) {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setSelectedEvent(null);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div style={{ height: 500 }}>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor={(event) => addDays(event.end, 0)}
        views={["month", "week", "day"]}
        defaultView="month"
        style={{ height: "100%", maxWidth: "100%" }}
        selectable
        onSelectSlot={handleSelectSlot}
        onSelectEvent={handleEventClick}
      />

      {selectedEvent && (
        <div className="modal-overlay">
          <div ref={modalRef} className="modal-container">
            <h3>Edit Period Range</h3>
            <label>Start Date:</label>
            <input
              type="date"
              value={moment(selectedEvent.start).format("YYYY-MM-DD")}
              onChange={(e) => setSelectedEvent({ ...selectedEvent, start: new Date(e.target.value) })}
            />
            <label>End Date:</label>
            <input
              type="date"
              value={moment(selectedEvent.end).format("YYYY-MM-DD")}
              onChange={(e) => setSelectedEvent({ ...selectedEvent, end: new Date(e.target.value) })}
            />
            <div className="modal-buttons">
              <button className="btn-update" onClick={handleUpdateEvent}>
                Update
              </button>
              <button className="btn-cancel" onClick={() => setSelectedEvent(null)}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default MyCalendar;
