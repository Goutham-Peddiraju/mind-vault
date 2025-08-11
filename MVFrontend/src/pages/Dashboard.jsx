import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchNotes, createNote, deleteNote } from "../redux/notesSlice";
import NoteCard from "../components/NoteCard";
import NoteEditor from "../components/NoteEditor";
import Navbar from "../components/Navbar";
import { useNavigate} from "react-router-dom";

export default function Dashboard() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const notes = useSelector((state) => state.notes.items);
  const loading = useSelector((state) => state.notes.loading);
  const [editorData, setEditorData] = useState({ title: "", content: "" });

  useEffect(() => {
   
    dispatch(fetchNotes());
  }, [dispatch, navigate]);

  const handleSave = () => {
    if (editorData.content.trim()) {
      dispatch(createNote({ title: editorData.title, content: editorData.content }));
      setEditorData("");
    } else {
      alert("Note content cannot be empty!");
    }
  };

  const handleDelete = (id) => {
    if (window.confirm("Delete this note?")) {
      dispatch(deleteNote(id));
    }
  };

  return (
    <>
      <Navbar />
      <div className="container1" >
        <h2 style={{ marginBottom: "15px", marginLeft:"10px" }}> My Notes</h2>
        <NoteEditor data={editorData} setData={setEditorData} onSave={handleSave} />
         
          <div className="notes-grid" >
            {notes.map((note) => (
              <NoteCard key={note._id} note={note} onDelete={() => handleDelete(note._id)} />
            ))}
          </div>
        
      </div>
    </>
  );
}
