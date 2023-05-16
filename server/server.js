console.log("current Environment " + process.env.NODE_ENV)
if (process.env.NODE_ENV === 'development') {
    require('dotenv').config()
}
const { DATABASE_URL } = process.env;
const express = require('express')
const app = express();
const mongoose = require('mongoose')
const cors = require ('cors')

var corsOptions = {
    credentials: true,
    origin: ['http://localhost:4200']
}

app.use(cors(corsOptions))
    
//db
mongoose.set('strictQuery', false);
mongoose.connect(DATABASE_URL)
const db = mongoose.connection
db.on('error', (error) => console.log('db error'))
db.once('open', (success) => console.log('db loaded'))

app.use(express.json())

// Routers
const membersRouter = require('./routes/members');
app.use('/members', membersRouter);
const deleteRouter = require('./routes/delete');
app.use('/delete', deleteRouter);
const fetchRouter = require('./routes/fetch');
app.use('/fetch', fetchRouter);

app.listen(3030, () => console.log('Gallery Server Running'));

module.exports = { 
  db: mongoose.connection 
};