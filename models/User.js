const mongoose = require('mongoose');
const { Schema } = mongoose;

const UserSchema = new Schema ({
   name: {
      type: String,
      trim: true,
      required: [true, 'Name is required.']
   },
   email: {
      type: String,
      required: [true, 'Email is required.'],
      unique: true
   },
   password: {
      type: String,
      required: [true, 'Password is required.']
   },
   avatar: String,
   date: {
      type: Date,
      default: Date.now
   }
});
module.exports = mongoose.model('User', UserSchema);
