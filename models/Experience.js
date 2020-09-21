const mongoose = require('mongoose');
const { Schema } = mongoose;

const ExperienceSchema = new Schema({
   tile: { 
      type: String, 
      required: true 
   },
   company: { 
      type: String, 
      required: true 
   },
   location: { 
      type: String, 
      required: true 
   },
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