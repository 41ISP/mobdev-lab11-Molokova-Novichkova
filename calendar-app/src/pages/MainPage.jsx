import React, {useEffect, useState} from "react";
import "./MainPage.css";
import EventModal from "../components/EventModal/EventModal";

export default function MainPage() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDay, setSelectedDay] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [events, setEvents] = useState([]); //события

  useEffect(() => {
  const storedEvents = JSON.parse(localStorage.getItem("calendarEvents")) || [];
  setEvents(storedEvents);
  }, []);
  
  useEffect(() => {
  localStorage.setItem("calendarEvents",JSON.stringify(events));
  }, [events]);

  const monthNames = [
    "Январь", "Февраль", "Март", "Апрель", "Май", "Июнь",
    "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"
  ];

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDay = new Date(year, month, 1).getDay();
  const startOffset = firstDay === 0 ? 6 : firstDay - 1;
  const days = Array(startOffset).fill("").concat(Array.from({length:daysInMonth}, (_, i) => i+1));
  const handleMonthChange = (e) => {
  setCurrentDate(new Date(year, parseInt(e.target.value), 1));
  }; 
  const handleYearChange = (e) => {
  setCurrentDate(new Date(parseInt(e.target.value), month, 1));
  }; 

  const handleDayClick = (day) => {
    if (!day) return;
  setCurrentDay(day === selectedDay ? null : day);
  }; 

  const handleAddEvent = () => {
    if (!selectedDay) {
    alert ("Выберите дату!");
    return;
    }
    setIsModalOpen(true);
  }; 
    const handleSaveEvent = (event) => {
    const dateKey = `${year}-${month + 1}-${selectedDay}`;
    setEvents([...events, {...event, date:dateKey}]);
    setIsModalOpen(false);
    };

    const selectedDateKey = selectedDay ? `${year}-${month + 1}-${selectedDay}` : null;
    const dayEvents = events.filter(e => e.date === selectedDateKey);

  return (
    <div className="main-page">
      <nav className="navbar">
        <h1 className="logo">Мой Календарь</h1>
        <button onClick={handleAddEvent}>+ Событие</button>
      </nav>

        <div className="controls">
          <select value={month} onChange={handleMonthChange}>
          {monthNames.map((name,index) => (
          <option key={index} value={index}>{name}</option>
          ))}
          </select>

    
      <div className="calendar">
        <div className="weekdays">
          {["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"].map((day, index) => (
            <div key={index} className="weekday">{day}</div>
          ))}
        </div>

        <div className="days-grid">
          {calendarDays.map((day, index) => {
            const dayEvents = events.filter(
              e => e.date === `${year}-${String(month+1).padStart(2,"0")}-${String(day).padStart(2,"0")}`
            );
            return (
              <div
                key={index}
                className={`day ${day === new Date().getDate() && month === new Date().getMonth() && year === new Date().getFullYear() ? "today" : ""}`}
              >
                {day}
                {dayEvents.length > 0 && <div className="event-dot"></div>}
              </div>
            );
          })}
        </div>
      </div>

      {/* Event Modal */}
      <EventModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveEvent}
      />
    </div>
  );
}