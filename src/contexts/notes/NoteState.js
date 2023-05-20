import { useState } from "react";
import NoteContaxt from "./NoteContaxt";

const NoteState = (props) => {
  const host = "https://inotebook-api-kdj0.onrender.com";

  const [notes, setNotes] = useState([]);

  const [loading, setLoading] = useState(false);

  const getNote = async () => {
    setLoading(true);
    const response = await fetch(`${host}/api/notes/fetchAllNotes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
    });
    const data = await response.json();
    setNotes(data.note);
    setLoading(false);
  };

  const addNote = async (title, description, tag) => {
    setLoading(true);
    const response = await fetch(`${host}/api/notes/addNote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
      body: JSON.stringify({ title, description, tag }),
    });
    const data = await response.json();
    setNotes(notes.concat(data.note));
    setLoading(false);
  };

  const deleteNote = async (id) => {
    setLoading(true);
    const response = await fetch(`${host}/api/notes/deleteNote/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
    });
    await response.json();

    const note = notes.filter((note) => {
      return note._id !== id;
    });

    setNotes(note);
    setLoading(false);
  };

  const editNote = async (id, title, descirption, tag) => {
    setLoading(true);
    const response = await fetch(`${host}/api/notes/updateNote/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
      body: JSON.stringify({ title, descirption, tag }),
    });
    await response.json();

    const newNote = JSON.parse(JSON.stringify(notes));

    for (let index = 0; index < newNote.length; index++) {
      const element = newNote[index];
      if (element._id === id) {
        newNote[index].title = title;
        newNote[index].description = descirption;
        newNote[index].tag = tag;
        break;
      }
    }
    setNotes(newNote);
    setLoading(false);
  };

  return (
    <NoteContaxt.Provider
      value={{
        notes,
        setNotes,
        addNote,
        deleteNote,
        editNote,
        getNote,
        loading,
      }}
    >
      {props.children}
    </NoteContaxt.Provider>
  );
};

export default NoteState;
