const mongoose = require('mongoose');
//const Schema = mongoose.Schema;
// es6 destructuring below, it's the same thing as above.
// It's saying: the mongoose object has a property called Schema, pull it out and assign it to a variable called Schema
const { Schema } = mongoose;

// schema
const userSchema = new Schema ({
  googleId: String,
  credits: { type: Number, default: 0}
});

// making a model class, telling mongoose that this new collection has been created....
//THIS LOADS THE SCHEMA INTO MONGOOSE, so therefore I won't have to require it everywhere...
// which would caues problems because mongoose would think you are creating a new 'users' collection everywhere that it's required.
// we are creating a collection and here calling it 'users'.
// where the first argument is the name of the collection, and the second argument is the name of the schema.
// **** IMPORTANT: mongoose will only make the collection if it does not already exist, and it won't overwrite it
mongoose.model('users', userSchema);
