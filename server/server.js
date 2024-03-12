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
db.on('error', (error) => console.log('ESIA DB Error: ' + err))
db.once('open', (success) => console.log('ESIA DB ON'))

app.use(express.json())

// Routers
const fetchAPIRouter = require('./routes/fetchAPI');
app.use('/fetchAPI', fetchAPIRouter);
const fetchDBRouter = require('./routes/fetchDB');
app.use('/fetchDB', fetchDBRouter);

app.listen(3030, () => console.log('ESIA SERVER ON'));

module.exports = { 
  db: mongoose.connection 
};