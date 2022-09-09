const express = require('express')
const router = express.Router();
const fetchuser = require('../middleware/fetchuser')
const Notes = require('../models/Notes')
const { body, validationResult } = require('express-validator');

//Route1 : get all notes Login required
router.get('/fetchallnotes', fetchuser, async (req, res) => {
    try {
        const notes = await Notes.find({ user: req.user.id })
        res.json(notes)
    }
    catch (error) {
        console.error(error.message)
        res.status(500).send("Internal server error")
    }
})

//ROUTE 2 : Adding notes :login required
router.post('/addnote', fetchuser, [
    body('title', "Enter a title of aleast 3 characters").isLength({ min: 3 }),
    body('description', 'Enter a valid description').isLength({ min: 5 }),//custom error message can also send
], async (req, res) => {
    try {
        const { title, description, tag } = req.body;
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const note = new Notes({
            title, description, tag, user: req.user.id
        })
        const saveNotes = await note.save()
        res.json(saveNotes)
    }
    catch (error) {
        console.error(error.message)
        res.status(500).send("Internal server error")
    }
})

//Route 3 : update an already present note : Login required
//id added because we have access of only updating own note
router.put('/updatenote/:id', fetchuser, async (req, res) => {
    const { title, description, tag } = req.body;
    //create a new note onject
    try {
        const newNote = {};
        if (title) {
            newNote.title = title;
        }
        if (description) {
            newNote.description = description;
        }
        if (tag) {
            newNote.tag = tag;
        }

        //find the note to be updated and update it
        let note = await Notes.findById(req.params.id);
        if (!note) {
            return res.status(404).send("Not found")
        }
        if (note.user.toString() !== req.user.id) {//someone else notes
            return res.status(401).send("Not allowed")
        }

        note = await Notes.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true })
        res.json({ note })
    } catch (error) {
        console.error(error.message)
        res.status(500).send("Internal server error")
    }
})

//Route 4 : delete an already present note : Login required
//id added because we have access of only updating own note
router.delete('/deletenote/:id', fetchuser, async (req, res) => {
    try {
        //find the note to be deleted and delete it
        let note = await Notes.findById(req.params.id);
        if (!note) {
            return res.status(404).send("Not found")
        }
        //allow user if only user owns this
        if (note.user.toString() !== req.user.id) {//someone else notes
            return res.status(401).send("Not allowed")
        }

        note = await Notes.findByIdAndDelete(req.params.id)
        res.json({ "Success": "Note has been deleted", note: note })
    } catch (error) {
        console.error(error.message)
        res.status(500).send("Internal server error")
    }
})

module.exports = router