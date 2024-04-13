console.log("current Environment " + process.env.NODE_ENV)
if (process.env.NODE_ENV === 'development') {
    require('dotenv').config()
}
import express from 'express';
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');

var corsOptions = {
    credentials: true,
    origin: process.env.CLIENT_URL
}

app.use(cors(corsOptions))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use('/public', express.static('public'));

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

module.exports = app;