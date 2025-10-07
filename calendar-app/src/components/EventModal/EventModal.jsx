import React, {useState} from "react";
import "./EventModal.css";

export default function EventModal({ isOpen, onClose, onSave }) {
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");

  const handleSave = () => {
    if (!title || !date) {
      alert("Введите название события и дату!");
      return;
    }
    onSave({ title, date });
    setTitle("");
    setDate("");
  };

  if (!isOpen) return null;

  return (
    <div className="modal-backdrop">
      <div className="modal">
        <h2>Создать событие</h2>
        <input
          type="text"
          placeholder="Название события"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
        <div className="modal-buttons">
          <button onClick={handleSave}>Сохранить</button>
          <button onClick={onClose}>Отмена</button>
        </div>
      </div>
    </div>
  );
}