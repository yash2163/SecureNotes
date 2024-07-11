// import NoteContext from "./noteContext";
// import { useState } from "react";

// const NoteState = (props) => {
//   const host = "http://localhost:5001";
//   const notesInitial = [];
//   const [notes, setNotes] = useState(notesInitial);

//   // Get all Notes
//   const getNotes = async () => {
//     // API Call
//     const response = await fetch(`${host}/api/notes/fetchallnotes`, {
//       method: "GET",
//       headers: {
//         "Content-Type": "application/json",
//         "auth-token":
//           "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjEzMWRjNWUzZTQwMzdjZDQ3MzRhMDY2In0sImlhdCI6MTYzMDY2OTU5Nn0.hJS0hx6I7ROugkqjL2CjrJuefA3pJi-IU5yGUbRHI4Q",
//       },
//     });
//     const json = await response.json();
//     setNotes(json);
//   };

//   // Add a Note
//   const addNote = async (title, description, tag) => {
//     // TODO: API Call
//     // API Call
//     const response = await fetch(`${host}/api/notes/addnote`, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         authtoken:
//           "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjY4OTQ4MWE5OGQ1MWEwZGZlZjIzZmJlIn0sImlhdCI6MTcyMDI3MjkyMn0.nPz2GETnF225y-xkgEZDIjkOAHQVX9qF30xovBsnuPw",
//       },
//       body: JSON.stringify({ title, description, tag }),
//     });

//     const note = await response.json();
//     setNotes(notes.concat(note));
//   };

//   // Delete a Note
//   const deleteNote = async (id) => {
//     // API Call
//     const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
//       method: "DELETE",
//       headers: {
//         "Content-Type": "application/json",
//         "auth-token":
//           "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjEzMWRjNWUzZTQwMzdjZDQ3MzRhMDY2In0sImlhdCI6MTYzMDY2OTU5Nn0.hJS0hx6I7ROugkqjL2CjrJuefA3pJi-IU5yGUbRHI4Q",
//       },
//     });
//     const json = response.json();
//     const newNotes = notes.filter((note) => {
//       return note._id !== id;
//     });
//     setNotes(newNotes);
//   };

//   // Edit a Note
//   const editNote = async (id, title, description, tag) => {
//     // API Call
//     const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
//       method: "PUT",
//       headers: {
//         "Content-Type": "application/json",
//         "auth-token":
//           "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjEzMWRjNWUzZTQwMzdjZDQ3MzRhMDY2In0sImlhdCI6MTYzMDY2OTU5Nn0.hJS0hx6I7ROugkqjL2CjrJuefA3pJi-IU5yGUbRHI4Q",
//       },
//       body: JSON.stringify({ title, description, tag }),
//     });
//     const json = await response.json();

//     let newNotes = JSON.parse(JSON.stringify(notes));
//     // Logic to edit in client
//     for (let index = 0; index < newNotes.length; index++) {
//       const element = newNotes[index];
//       if (element._id === id) {
//         newNotes[index].title = title;
//         newNotes[index].description = description;
//         newNotes[index].tag = tag;
//         break;
//       }
//     }
//     setNotes(newNotes);
//   };

//   return (
//     <NoteContext.Provider
//       value={{ notes, addNote, deleteNote, editNote, getNotes }}
//     >
//       {props.children}
//     </NoteContext.Provider>
//   );
// };
// export default NoteState;

import React, { useContext, useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props) => {
  const host = "http://localhost:5001";
  const notesInitial = [];
  const [notes, setNotes] = useState(notesInitial);

  // Fetch auth token from wherever it's stored in your app
  const authToken = localStorage.getItem("token");
  // const authToken =
  //   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjY4OTQ4MWE5OGQ1MWEwZGZlZjIzZmJlIn0sImlhdCI6MTcyMDI3MjkyMn0.nPz2GETnF225y-xkgEZDIjkOAHQVX9qF30xovBsnuPw";

  // Get all Notes
  const getNotes = async () => {
    try {
      const response = await fetch(`${host}/api/notes/fetchallnotes`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "auth-token": authToken,
        },
      });
      const json = await response.json();
      setNotes(json);
    } catch (error) {
      console.error("Error fetching notes:", error.message);
    }
  };

  // Add a Note
  const addNote = async (title, description, tag) => {
    try {
      const response = await fetch(`${host}/api/notes/addnote`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": authToken,
        },
        body: JSON.stringify({ title, description, tag }),
      });

      const note = await response.json();
      setNotes([...notes, note]); // Update notes array with new note
    } catch (error) {
      console.error("Error adding note:", error.message);
    }
  };

  // Delete a Note
  const deleteNote = async (id) => {
    try {
      const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "auth-token": authToken,
        },
      });
      if (response.ok) {
        const updatedNotes = notes.filter((note) => note._id !== id);
        setNotes(updatedNotes);
      } else {
        console.error("Failed to delete note.");
      }
    } catch (error) {
      console.error("Error deleting note:", error.message);
    }
  };

  // Edit a Note
  const editNote = async (id, title, description, tag) => {
    try {
      const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "auth-token": authToken,
        },
        body: JSON.stringify({ title, description, tag }),
      });
      const updatedNote = await response.json();

      // Update notes array with edited note
      const updatedNotes = notes.map((note) =>
        note._id === id ? { ...note, title, description, tag } : note
      );
      setNotes(updatedNotes);
    } catch (error) {
      console.error("Error updating note:", error.message);
    }
  };

  return (
    <NoteContext.Provider
      value={{ notes, addNote, deleteNote, editNote, getNotes }}
    >
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
