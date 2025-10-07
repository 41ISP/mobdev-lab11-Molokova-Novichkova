import React, {useState} from "react";
import "./MainPage.css";
import EventModal from "../components/EventModal/EventModal";

export default function MainPage() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [events, setEvents] = useState([]); //события

  const monthNames = [
    "Январь", "Февраль", "Март", "Апрель", "Май", "Июнь",
    "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"
  ];

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const getDaysInMonth = (y, m) => new Date(y, m + 1, 0).getDate();
  const daysInMonth = getDaysInMonth(year, month);
  const firstDay = new Date(year, month, 1).getDay();

  const calendarDays = [];
  for (let i = 0; i < (firstDay === 0 ? 6 : firstDay - 1); i++) calendarDays.push("");
  for (let day = 1; day <= daysInMonth; day++) calendarDays.push(day);

  const handlePrevMonth = () => setCurrentDate(new Date(year, month - 1, 1));
  const handleNextMonth = () => setCurrentDate(new Date(year, month + 1, 1));

  const handleCreateEvent = () => setIsModalOpen(true);

  const handleSaveEvent = (event) => {
    setEvents([...events, event]);
    setIsModalOpen(false);
   
    
    console.log("Event saved:", event);
  };

  return (
    <div className="main-page">
      {/* Navbar */}
      <nav className="navbar">
        <h1 className="logo">Мой Календарь</h1>
        <button className="create-event-btn" onClick={handleCreateEvent}>
          + Создать событие
        </button>
      </nav>

      {/* Month Switcher */}
      <header className="header">
        <div className="month-switcher">
          <button onClick={handlePrevMonth}>‹</button>
          <h2>{monthNames[month]} {year}</h2>
          <button onClick={handleNextMonth}>›</button>
        </div>
      </header>

      {/* Calendar */}
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