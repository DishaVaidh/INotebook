const connectToMongo = require("./db");
const express = require('express')
var cors=require('cors')
connectToMongo();
const app = express()
const port = 5000

app.use(cors())//for both parallel run
app.use(express.json())
//We will not use below as this will cause all things in same file.So we created models and routes folder
/*
app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/api/v1/signup', (req, res) => {
    res.send('Hello signup!')
})

app.get('/api/v1/login', (req, res) => {
    res.send('Hello login!')
})*/

app.use(express.json())//for sending json requests in body in thunderclient
//Available Routes
app.use('/api/auth',require('./routes/auth'))
app.use('/api/notes',require('./routes/notes'))

app.listen(port, () => {
  console.log(`iNotebook backend app listening at http://localhost:${port}`)
})//this will print first because mongo connection took time and its aync so this will print until that