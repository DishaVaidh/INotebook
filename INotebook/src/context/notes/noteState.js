import React from "react";
import noteContext from "./noteContext";
import { useState } from "react";
const NoteState = (props) => {
  const host = "http://localhost:5000"
  const notesInitial = []
  
  const [notes, setnotes] = useState(notesInitial)
  //get all notes
   const getallnotes =async () => {
    //api call
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: 'GET',
      
      headers: {
        'Content-Type': 'application/json',
        "auth-token" : "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjFhMzdjOGQ4ZTg5YzBlZGVlNjY0NGI1In0sImlhdCI6MTYzODE5NjUwMX0.IrH5s7403WJVfdjtQU6EZ03db49DYQh6-GCQFXOARdA"
      },
  
    });
    const json = await response.json();
  
    setnotes(json)
  }

  //add a note
  const addNote =async (title,description,tag) => {
    //api call
    const response = await fetch(`${host}/api/notes/addnote`, {
      method: 'POST',
      
      headers: {
        'Content-Type': 'application/json',
        "auth-token" : "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjFhMzdjOGQ4ZTg5YzBlZGVlNjY0NGI1In0sImlhdCI6MTYzODE5NjUwMX0.IrH5s7403WJVfdjtQU6EZ03db49DYQh6-GCQFXOARdA"
      },
      body: JSON.stringify({title,description,tag}) // body data type must match "Content-Type" header
    });
    const json = response.json(); 
    const note=json
    setnotes(notes.concat(note))
  }

  //delete a note
  const deleteNote = async (id) => {
    //api call
    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: 'DELETE',
      
      headers: {
        'Content-Type': 'application/json',
        "auth-token" : "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjFhMzdjOGQ4ZTg5YzBlZGVlNjY0NGI1In0sImlhdCI6MTYzODE5NjUwMX0.IrH5s7403WJVfdjtQU6EZ03db49DYQh6-GCQFXOARdA"
      },//auth token is not hardcoded see 73 vd.It is user specific and stored in localstorage 
     
    });

    const newNotes = notes.filter((note)=>{
      return note._id!==id
    })
    setnotes(newNotes)
  }


  //edit a note
  const editNote = async(id, title, description, tag) => {
    // api call
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: 'PUT',
      
      headers: {
        'Content-Type': 'application/json',
        "auth-token" : "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjFhMzdjOGQ4ZTg5YzBlZGVlNjY0NGI1In0sImlhdCI6MTYzODE5NjUwMX0.IrH5s7403WJVfdjtQU6EZ03db49DYQh6-GCQFXOARdA"
      },
      body: JSON.stringify({title,description,tag}) // body data type must match "Content-Type" header
    });
    const json = await response.json(); // parses JSON response into native JavaScript objects
    
    let newNotes = JSON.parse(JSON.stringify(notes))
    //logic to edit
    for (let index = 0; index < newNotes.length; index++) {
      const element = newNotes[index];
      if(element._id===id){
        newNotes[index].title=title
        newNotes[index].description=description
        newNotes[index].tag=tag
        break;
      }
   //after change 1 time break
    }
    setnotes(newNotes)
  }

  return (
    <noteContext.Provider value={{ notes, addNote, deleteNote, editNote, getallnotes }}>
      {props.children}
    </noteContext.Provider>
  )
}

export default NoteState;