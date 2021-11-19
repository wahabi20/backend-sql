const express = require('express');
const bodyParser = require("body-parser");
const cors=require("cors");

require("dotenv").config();
const app = express();

// Setup CORS
app.use(cors());

// parse requests of content-type - application/json
app.use(express.json());
  
// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// Database
const db = require('./config/database');
  
  //Test DB
  db.authenticate()
.then(()=> console.log('Database connected...'))
.catch(err => console.log('Error:' + err))


require("./startup/routes")(app);

//app.get('/', (req,res) => res.send('INDEX'));

//app.use('/gigs', require('./routes/gigs'));

const PORT = process.env.PORT || 5000;


app.listen(PORT, console.log(`Server started on port ${PORT}`))