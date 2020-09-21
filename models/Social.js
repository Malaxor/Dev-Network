const mongoose = require('mongoose');
const { Schema } = mongoose;

const SocialSchema = new Schema({
   youtube: String,
   twitter: String, 
   facebook: String, 
   linkedin: String, 
   instagram: String
});
module.exports = SocialSchema;