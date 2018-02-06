const express = require('express');
const mongoose = require('mongoose');
const keys = require('./config/keys');

require('./models/User');
// don't need to assign passport to a variable because we are not pulling any code out of the passport file, just executing it
require('./services/passport');


mongoose.connect(keys.mongoURI);

const app = express();

// this require was assigned to a variable, but the variable is not needed. this is a way of writing it.
// authRoutes returns a function, so what this is doing is immediately calling that function and passing app to it.
require('./routes/authRoutes')(app);


// Heroku determines what port we will use
const PORT = process.env.PORT || 5000;
app.listen(PORT);
