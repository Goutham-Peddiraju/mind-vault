import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createNote } from "../redux/notesSlice"; // adjust path as needed
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

export default function NoteEditor() {
  const dispatch = useDispatch();
  const [editorData, setEditorData] = useState({
    title: "",
    content: "",
  });

  const handleSave = () => {
    const token = sessionStorage.getItem("token");
    if (!token) {
      alert("Please login first!");
      return;
    }

    const plainText = editorData.content.replace(/<[^>]+>/g, "").trim();

    if (!editorData.title.trim() && !plainText) {
      alert("Note content cannot be empty!");
      return;
    }

    dispatch(
      createNote({
        title: editorData.title.trim(),
        content: editorData.content.trim(),
      })
    );

    // Reset form
    setEditorData({ title: "", content: "" });
  };

  const modules = {
    toolbar: [
      [{ font: [] }, { size: [] }],
      ["bold", "italic", "underline", "strike"],
      [{ color: [] }, { background: [] }],
      [{ list: "ordered" }, { list: "bullet" }],
      ["link"],
      ["clean"],
    ],
  };

  const formats = [
    "font",
    "size",
    "bold",
    "italic",
    "underline",
    "strike",
    "color",
    "background",
    "list",
    "bullet",
    "link",
  ];

  return (
    <div className="note-editor">
      <input
        type="text"
        placeholder="Enter title"
        value={editorData.title}
        onChange={(e) => setEditorData({ ...editorData, title: e.target.value })}
        style={{
          width: "100%",
          padding: "10px",
          marginBottom: "10px",
          fontSize: "16px",
          borderRadius: "5px",
          border: "1px solid #ccc",
        }}
      />

      <div
        style={{
          resize: "vertical",
          overflow: "auto",
          minHeight: "200px",
          maxHeight: "600px",
          border: "1px solid #ccc",
          borderRadius: "8px",
          padding: "5px",
          marginBottom: "20px",
        }}
      >
        <ReactQuill
          theme="snow"
          value={editorData.content}
          onChange={(val) => setEditorData({ ...editorData, content: val })}
          modules={modules}
          formats={formats}
          style={{
            height: "100%",
            minHeight: "150px",
            border: "none",
          }}
          placeholder="Write your note here..."
        />
      </div>

      <button className="btn" onClick={handleSave}>
        Save Note
      </button>
    </div>
  );
}
