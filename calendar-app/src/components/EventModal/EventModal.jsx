import React, {useState, useEffect} from "react";
import "./EventModal.css";

export default function EventModal({ isOpen, onClose, onSave }) {
  const [title, setTitle] = useState("");
 

 useEffect(() => {
    if (isOpen) setTitle("");
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="modal-backdrop">
      <div className="modal">
        <h2>Новое событие</h2>
        <input
          type="text"
          placeholder="Введите название события"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <div className="modal-buttons">
          <button
            onClick={() => {
              if (title.trim() === "") {
                alert("Введите название!");
                return;
              }
              onSave({ title });
            }}
          >
            Сохранить
          </button>
          <button onClick={onClose}>Отмена</button>
        </div>
      </div>
    </div>
  );
}