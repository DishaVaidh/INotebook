
import noteContext from "../context/notes/noteContext"
import React, { useContext, useEffect, useRef, useState } from 'react'
import Noteitem from "./Noteitem";
import AddNote from "./AddNote";
export default function Notes(props) {
    const context = useContext(noteContext)
    const { notes, getallnotes, editNote } = context;
    const [note, setnote] = useState({id : "",etitle : "", edescription : "", etag : "default"})
    useEffect(() => {
        getallnotes();
    })
    const updateNote = (currentNote) => {
        ref.current.click();
        setnote({id:currentNote._id, etitle : currentNote.title, edescription : currentNote.description, etag:currentNote.tag})
        
    }
    const refclose = useRef(null)
    const handleClick=(e)=>{
        e.preventDefault();
        editNote(note.id,note.etitle,note.edescription,note.etag)
        refclose.current.click();
        props.showAlert("Updated successfully","success")
    }

    const onChange=(e)=>{
        setnote({...note,[e.target.name] : e.target.value})//we are saying jo bhi change ho rha h name wo uski value ke equal ho jaye
    }

    const ref = useRef(null)
    
  
    return (
        <>
            <AddNote showAlert={props.showAlert} />

            <button type="button" className="btn btn-primary d-none" ref={ref} data-bs-toggle="modal" data-bs-target="#exampleModal">
                Launch demo modal
            </button>

            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Edit Note</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form className="my-3">
                                <div className="mb-3">
                                    <label htmlFor="etitle" className="form-label">Title</label>
                                    <input type="text" className="form-control" id="etitle" value={note.etitle} name="etitle" aria-describedby="emailHelp" onChange={onChange} minLength={5} required/>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="edescription" className="form-label">Description</label>
                                    <input type="text" className="form-control" id="edescription" value={note.edescription} name="edescription" onChange={onChange} minLength={5} required />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="etag" className="form-label">Tag</label>
                                    <input type="text" className="form-control" id="etag" value={note.etag} name="etag" onChange={onChange} minLength={5} required />
                                </div>

                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" ref={refclose} className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button disabled={note.etitle.length<5 || note.edescription.length<5} type="button" onClick={handleClick} className="btn btn-primary">Update note</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row my-3">
                <h1>Your notes</h1>
                <div className="container">
                {notes.length===0&&"No notes to dissplay"}
                </div>
                {notes.map((note) => {
                    return <Noteitem key={note._id} note={note} updateNote={updateNote} showAlert={props.showAlert} />
                })}
            </div>
        </>
    )
}
