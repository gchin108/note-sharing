"use client"
import React, { useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import { Fab } from "@mui/material";
import { Zoom } from "@mui/material";


function CreateArea(props) {
  const [isExpanded, setExpanded] = useState(false);

  const [note, setNote] = useState({
    title: "",
    content: "",
  });

  function handleChange(event) {
    const { name, value } = event.target;

    setNote((prevNote) => {
      return {
        ...prevNote,
        [name]: value,
      };
    });
  }

async function submitNote(e) {
  e.preventDefault();
  try {
    const response = await fetch("api/notes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: note.title,

        content: note.content,
      }),
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
 
    const savedNote = await response.json(); //converts json to js objects
    // console.log(savedNote)
    props.onAdd(savedNote);

    setNote({
      title: "",
      content: "",
    });
  } catch (error) {
    console.error("Error adding note:", error);
  }
}

  function expand() {
    setExpanded(true);
  }

  return (
    <div>
      <form className="create-note" onSubmit={submitNote}>
        {isExpanded && (
          <input
            name="title"
            onChange={handleChange}
            value={note.title}
            placeholder="Title"
          />
        )}

        <textarea
          name="content"
          onClick={expand}
          onChange={handleChange}
          value={note.content}
          placeholder="Take a note..."
          rows={isExpanded ? 3 : 1}
        />
        <Zoom in={isExpanded}>
          <Fab type="submit">
            <AddIcon />
          </Fab>
        </Zoom>
      </form>
    </div>
  );
}

export default CreateArea;
