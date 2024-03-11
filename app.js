const express = require('express');
const app = express();
const cors = require('cors');
const morgan = require('morgan');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const path = require('path');

require('./server/models/user');
require('./server/models/template');
require('./server/models/project');

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json({ limit: '50mb' }));

app.set('view engine', 'ejs');
const viewsPath = path.join(__dirname, 'server', 'views');
app.set('views', viewsPath);
/* 
app.use(cors({ 
  credentials: true,   
  origin: 'http://localhost:5173',   
})) */
app.use(cookieParser())


app.use(morgan('dev'));
app.set('jwt-secret', process.env.JWT_SECRET);

const uri=process.env.DATABASE_URL
mongoose.connect(uri).then(() => {
    console.log(`Successfully connected to MongoDB Atlas : ${mongoose.connection.name}`);
  })
  .catch((err) => {
    console.log('Cannot connect to MongoDB Atlas');
    console.error(err);
  });


require('./server/routes')(app);


app.listen(process.env.PORT, () => {
  console.log(`App listening on port ${process.env.PORT}`);
});
