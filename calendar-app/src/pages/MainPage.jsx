import { useEffect, useState } from "react";
import "./MainPage";


const MainPage = () => {
  const [events, setEvents] = useState([]);
  const [selectedDay, setSelectedDay] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [error, setError] = useState(null);

  const monthNames = [
    "Январь", "Февраль", "Март", "Апрель", "Май", "Июнь",
    "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"
  ];

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDay = new Date(year, month, 1).getDay();
  const startOffset = firstDay === 0 ? 6 : firstDay - 1;
  const days = Array(startOffset).fill("").concat(
    Array.from({ length: daysInMonth }, (_, i) => i + 1)
  );

  useEffect(() => {
    const loadEvents = async () => {
      try {
        const data = await getEvents();
        setEvents(data.items || []);
      } catch (err) {
        setError("Ошибка при загрузке событий Google Calendar");
        console.error(err);
      }
    };
    loadEvents();
  }, []);

  const handleAddEvent = async (title) => {
    if (!selectedDay) return alert("Выбери день!");
    const date = `${year}-${String(month + 1).padStart(2, "0")}-${String(selectedDay).padStart(2, "0")}`;

    try {
      const newEvent = await addEvent(title, date);
      setEvents([...events, newEvent]);
      setIsModalOpen(false);
    } catch (err) {
      console.error(err);
      alert("Не удалось добавить событие!");
    }
  };

  const handleDeleteEvent = async (id) => {
    try {
      await deleteEvent(id);
      setEvents(events.filter(e => e.id !== id));
    } catch {
      alert("Ошибка при удалении события!");
    }
  };

  const dayEvents = events.filter(e => {
    const d = e.start?.date || e.start?.dateTime?.split("T")[0];
    return d === `${year}-${String(month + 1).padStart(2, "0")}-${String(selectedDay).padStart(2, "0")}`;
  });

  return (
    <div className="container">
      <h1>📅 Мой Google-Календарь</h1>

      {error && <p className="error">{error}</p>}

      <div className="calendar-controls">
        <select
          value={month}
          onChange={(e) => setCurrentDate(new Date(year, e.target.value, 1))}
        >
          {monthNames.map((m, i) => (
            <option key={i} value={i}>{m}</option>
          ))}
        </select>

        <input
          type="number"
          value={year}
          onChange={(e) => setCurrentDate(new Date(+e.target.value, month, 1))}
        />
      </div>

      <div className="calendar-grid">
        {["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"].map(d => (
          <div key={d} className="weekday">{d}</div>
        ))}

        {days.map((day, i) => {
          const hasEvent = events.some(e =>
            (e.start?.date || e.start?.dateTime?.split("T")[0]) ===
            `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`
          );
          const isWeekend = (i % 7 === 5 || i % 7 === 6);
          return (
            <div
              key={i}
              onClick={() => day && setSelectedDay(day)}
              className={`day ${isWeekend ? "weekend" : ""} ${day === selectedDay ? "selected" : ""}`}
            >
              {day}
              {hasEvent && <div className="dot"></div>}
            </div>
          );
        })}
      </div>

      {selectedDay && (
        <div className="event-list">
          <h3>События {selectedDay} {monthNames[month]} {year}</h3>
          {dayEvents.length === 0 && <p>Нет событий</p>}
          {dayEvents.map(e => (
            <div key={e.id} className="event-item">
              <span>{e.summary}</span>
              <button onClick={() => handleDeleteEvent(e.id)}>🗑</button>
            </div>
          ))}
          <button onClick={() => setIsModalOpen(true)}>+ Добавить событие</button>
        </div>
      )}

      <EventModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleAddEvent}
      />
    </div>
  );
};

export default MainPage;
