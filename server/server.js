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
    origin: [process.env.CLIENT_URL]
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
const artistsRouter = require('./routes/artists');
app.use('/artists', artistsRouter);
const artstylesRouter = require('./routes/artstyles');
app.use('/artstyles', artstylesRouter);
const artworksRouter = require('./routes/artworks');
app.use('/artworks', artworksRouter);
const exhibitionsRouter = require('./routes/exhibitions');
app.use('/exhibitions', exhibitionsRouter);

app.listen(3030, () => console.log('ESIA SERVER ON'));

module.exports = { 
  db: mongoose.connection 
};