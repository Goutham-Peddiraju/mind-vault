import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "https://mind-vault-ng5c.onrender.com/api/notes"; // backend

const tokenConfig = () => ({
  headers: { Authorization: `Bearer ${sessionStorage.getItem("token")}` },
});

export const fetchNotes = createAsyncThunk("notes/fetchNotes", async () => {
  const res = await axios.get(API_URL, tokenConfig());
  return res.data;
});

export const createNote = createAsyncThunk("notes/createNote", async (note) => {
  const res = await axios.post(API_URL, note, tokenConfig());
  return res.data;
});

export const deleteNote = createAsyncThunk("notes/deleteNote", async (id) => {
  await axios.delete(`${API_URL}/${id}`, tokenConfig());
  return id;
});

const notesSlice = createSlice({
  name: "notes",
  initialState: { items: [], loading: false },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchNotes.pending, (state) => { state.loading = true; })
      .addCase(fetchNotes.fulfilled, (state, action) => { state.items = action.payload; state.loading = false; })
      .addCase(createNote.fulfilled, (state, action) => { state.items.push(action.payload); })
      .addCase(deleteNote.fulfilled, (state, action) => { state.items = state.items.filter(note => note._id !== action.payload); });
  }
});

export default notesSlice.reducer;
