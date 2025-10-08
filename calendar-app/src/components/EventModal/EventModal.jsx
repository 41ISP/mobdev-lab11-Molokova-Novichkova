import React, { useState, useEffect, useRef } from "react";
import "./EventModal.css";

export default function EventModal({ isOpen, onClose, onSave }) {
  const [title, setTitle] = useState("");
  const inputRef = useRef(null);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus(); // автофокус при открытии
    }
  }, [isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title.trim() === "") return;
    onSave({ title });
    setTitle("");
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal"
        onClick={(e) => e.stopPropagation()}
      >
        <h2>Добавить событие</h2>
        <form onSubmit={handleSubmit}>
          <input
            ref={inputRef}
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Название события..."
          />
          <div className="modal-buttons">
            <button type="submit">Сохранить</button>
            <button type="button" onClick={onClose}>Отмена</button>
          </div>
        </form>
      </div>
    </div>
  );
}