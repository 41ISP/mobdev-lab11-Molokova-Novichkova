import React, { useState, useEffect } from "react";
import "./MainPage.css";
import EventModal from "../components/EventModal";

export default function MainPage() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDay, setSelectedDay] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const storedEvents = JSON.parse(localStorage.getItem("calendarEvents")) || [];
    setEvents(storedEvents);
  }, []);

  useEffect(() => {
    localStorage.setItem("calendarEvents", JSON.stringify(events));
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

  const days = Array(startOffset).fill("").concat(Array.from({ length: daysInMonth }, (_, i) => i + 1));

  const handleMonthChange = (e) => {
    setCurrentDate(new Date(year, parseInt(e.target.value), 1));
  };

  const handleYearChange = (e) => {
    setCurrentDate(new Date(parseInt(e.target.value), month, 1));
  };

  const handleDayClick = (day) => {
    if (!day) return;
    setSelectedDay(day === selectedDay ? null : day);
  };

  const handleAddEvent = () => {
    if (!selectedDay) {
      alert("Выберите дату!");
      return;
    }
    setIsModalOpen(true);
  };

  const handleSaveEvent = (event) => {
    const dateKey = `${year}-${month + 1}-${selectedDay}`;
    setEvents([...events, { ...event, date: dateKey }]);
    setIsModalOpen(false);
  };

  const handleDeleteEvent = (event) => {
    setEvents(events.filter(e => e !== event));
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
          {monthNames.map((name, index) => (
            <option key={index} value={index}>{name}</option>
          ))}
        </select>

        <div className="year-select-wrapper">
          <select
            size="5"
            value={year}
            onChange={handleYearChange}
            className="year-select"
          >
            {Array.from({ length: 51 }, (_, i) => year - 25 + i).map((y) => (
              <option key={y} value={y}>{y}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="calendar">
        <div className="weekdays">
          {["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"].map((d, i) => (
            <div
              key={d}
              className={`weekday ${i >= 5 ? "weekend" : ""}`}
            >
              {d}
            </div>
          ))}
        </div>

        <div className="days-grid">
          {days.map((day, i) => {
            const isSelected = day && day === selectedDay;
            const dayOfWeek = (i % 7);
            const isWeekend = day && (dayOfWeek === 5 || dayOfWeek === 6);
            const hasEvents = events.some(e => e.date === `${year}-${month + 1}-${day}`);

            return (
              <div
                key={i}
                className={`day ${isSelected ? "selected" : ""} ${isWeekend ? "weekend" : ""}`}
                onClick={() => handleDayClick(day)}
              >
                {day}
                {hasEvents && <div className="event-dot"></div>}
              </div>
            );
          })}
        </div>
      </div>

      {selectedDay && (
        <div className="event-list">
          <h3>События {selectedDay} {monthNames[month]} {year}</h3>
          {dayEvents.length === 0 ? (
            <p className="no-events">Нет событий</p>
          ) : (
            <ul>
              {dayEvents.map((e, i) => (
                <li key={i}>
                  <span className="event-title">{e.title}</span>
                  <button
                    className="delete-btn"
                    onClick={() => handleDeleteEvent(e)}
                  >
                    🗑
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}

      <EventModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveEvent}
      />
    </div>
  );
}