"use client"
import React, { useState, useEffect, useRef } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

export default function Note(props) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(props.title);
  const [editedContent, setEditedContent] = useState(props.content);
  const noteRef = useRef(null); // Create a ref for the note container

  useEffect(() => {
    function handleClickOutside(event) {
      if (noteRef.current && !noteRef.current.contains(event.target)) {
        setIsEditing(false); // Click was outside the note
      }
    }

    if (isEditing) {
      // Add a short delay before adding the event listener to avoid capturing the initial click
      const timerId = setTimeout(() => {
        document.addEventListener("mousedown", handleClickOutside);
      }, 100); // 100ms should be sufficient, but you can adjust as needed

      return () => {
        clearTimeout(timerId); // Clear the timeout if the effect is cleaned up before the timeout fires
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }
  }, [isEditing]); // This useEffect will run whenever isEditing changes

  // console.log(noteRef.current);
  // console.log(isEditing);
  useEffect(() => {
    setEditedTitle(props.title);
    setEditedContent(props.content);
  }, [props.title, props.content]);

  function handleDelete() {
    props.onDelete(props.id);
    setIsEditing(false);
  }

  function handleEdit() {
    setIsEditing(true);
  }

  function handleSave() {
    props.onUpdate(props.id, editedTitle, editedContent); // Assuming you have an onUpdate prop to handle the updates
    setIsEditing(false);
  }

  return (
    <div className="note" ref={noteRef}>
      {isEditing ? (
        <>
          <input
            value={editedTitle}
            onChange={(e) => setEditedTitle(e.target.value)}
          />

          <textarea
            className="edit-content"
            value={editedContent}
            onChange={(e) => setEditedContent(e.target.value)}
          />

          <button onClick={handleSave}>Save</button>
        </>
      ) : (
        <>
          <h1>{props.title}</h1>
          <p>{props.content}</p>
          <button onClick={handleEdit}>
            <EditIcon />
          </button>
        </>
      )}
      {isEditing ? (
        <button onClick={handleDelete}>
          <DeleteIcon />
        </button>
      ) : null}
    </div>
  );
}
