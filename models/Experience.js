const mongoose = require('mongoose');
const { Schema } = mongoose;

const ExperienceSchema = new Schema({
   title: { 
      type: String, 
      required: true 
   },
   company: { 
      type: String, 
      required: true 
   },
   location: String,
   from: { 
      type: String, 
      required: true 
   },
   to: String,
   current: {
      type: Boolean,
      default: false
   },
   description: String
});
module.exports = ExperienceSchema;
