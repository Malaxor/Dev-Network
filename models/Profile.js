const mongoose = require('mongoose');
const { Schema } = mongoose;
const ExperienceSchema = require('./Experience');
const EducationSchema = require('./Education');
const SocialSchema = require('./Social');

const ProfileSchema = new Schema({
   user: {
      type: Schema.Types.ObjectId,
      ref: 'User'
   },
   company: String,
   website: String,
   location: String,
   status: {
      type: String,
      required: true
   },
   skills: {
      type: [String],
      required: true
   },
   bio: String,
   githubUsername: String,
   experience: [ExperienceSchema],
   education: [EducationSchema],
   social: SocialSchema,
   date: {
      type: Date,
      default: Date.now
   }
});
module.exports = mongoose.model('Profile', ProfileSchema);