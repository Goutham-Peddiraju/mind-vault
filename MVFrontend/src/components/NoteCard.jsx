import React from "react";

export default function NoteCard({ note, onDelete }) {
  return (
    <div className="note-card" >
      <h3>{note.title}</h3>
         <div dangerouslySetInnerHTML={{ __html: note.content }} />
      <button className="delete-btn" onClick={onDelete}>Delete</button>
    </div>
  );
}
