import React,{useContext,useState} from 'react'
import noteContext from "../context/notes/noteContext"
export default function AddNote(props) {
    const context = useContext(noteContext)
    const {addNote} = context;
    const [note, setnote] = useState({title : "",description : "",tag : "default"})

    const handleClick=(e)=>{
        e.preventDefault();
        addNote(note.title,note.description,note.tag);
        setnote({title : "",description : "",tag : ""})
        props.showAlert("Added successfully","success")
    }

    const onChange=(e)=>{
        setnote({...note,[e.target.name] : e.target.value})//we are saying jo bhi change ho rha h name wo uski value ke equal ho jaye
    }
    return (
        <div className="container my-3">
        <h1>Add a note</h1>
        <form className = "my-3">
            <div className="mb-3">
                <label htmlFor="title" className="form-label">Title</label>
                <input type="text" className="form-control" id="title" name="title" value={note.title} aria-describedby="emailHelp" onChange={onChange} minLength={5} required/>
            </div>
            <div className="mb-3">
                <label htmlFor="description" className="form-label">Description</label>
                <input type="text" className="form-control" id="description" value={note.description} name="description" onChange={onChange} minLength={5} required/>
            </div>
            <div className="mb-3">
                <label htmlFor="tag" className="form-label">Tag</label>
                <input type="text" className="form-control" id="tag" name="tag" value={note.tag} onChange={onChange} minLength={5} required/>
            </div>
           
            <button disabled={note.title.length<5 || note.description.length<5} type="submit" onClick={handleClick} className="btn btn-primary">Add note</button>
        </form>
        </div>
    )
}
