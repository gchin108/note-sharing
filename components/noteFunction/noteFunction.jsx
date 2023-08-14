"use client";
import React, { useState, useEffect } from "react";
import Note from "../note/note";
import CreateArea from "../createArea/createArea";
import axios from "axios";
import { useRouter } from "next/navigation";

function App() {
  const [notes, setNotes] = useState([]);

  function addNote(newNote) {
    // No API call here. Just update the local state.
    setNotes((prevNotes) => [...prevNotes, newNote]);
  }

  useEffect(() => {
    axios
      .get("/api/notes")
      .then((res) => setNotes(res.data))
      .catch((err) => console.error(err));
  }, []);

  // useEffect(() => {
  //   console.log("Notes changed:", notes);
  // }, [notes]);

  async function deleteNote(noteId) {
    // console.log(noteId)
    try {
      await fetch(`/api/notes`, {
        method: "DELETE",
        body:JSON.stringify({
          _id:noteId,
        })
      });

      // get all notes except the deleted one
      const filteredNotes = notes.filter((item) => item._id !== noteId);

      setNotes(filteredNotes);
    } catch (error) {
      console.log(error);
    }
  }

  async function updateNote(id, title, content) {
    // console.log("id: " + id, "title: " + title, "content: " + content);
    try {
      //sending prompt data to server
      const response = await fetch(`/api/notes`, {
        method: "PATCH",
        body: JSON.stringify({
          _id: id,
          title: title,

          content: content,
        }),
      });
      if (response.ok) {
        // Update the local state
        setNotes((prevNotes) => {
          return prevNotes.map((note) => {
            if (note._id === id) {
              return { ...note, title: title, content: content };
            } else {
              return note;
            }
          });
        });
      } else {
        console.log("Failed to update note on server");
      }
    } catch (err) {
      console.log("Error on frontend while send patch request:", err.message);
    }
  }

  return (
    <div>
      <CreateArea onAdd={addNote} />
      {notes.map((noteItem, index) => {
        return (
          <Note
            key={index}
            id={noteItem._id}
            title={noteItem.title}
            content={noteItem.content}
            onDelete={deleteNote}
            onUpdate={updateNote}
          />
        );
      })}
    </div>
  );
}

export default App;
