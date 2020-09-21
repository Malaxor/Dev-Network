const mongoose = require('mongoose');
const { Schema } = mongoose;

const EducationSchema = new Schema({
   school: { 
      type: String, 
      required: true 
   },
   degree: { 
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
module.exports = EducationSchema;