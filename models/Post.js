const mongoose = require('mongoose');
const { Schema } = mongoose;

const PostSchema = new Schema ({
   user: {
      type: Schema.Types.ObjectId,
      ref: 'User'
   },
   content: {
      type: String,
      required: true
   },
   name: String,
   avatar: String,
   likes: [{
      user: {
         type: Schema.Types.ObjectId,
         ref: 'User'
      }
   }],
   comments: [{
      user: {
         type: Schema.Types.ObjectId,
         ref: 'User'
      },
      content: {
         type: String,
         required: true
      },
      title: {
         type: String,
         required: true
      },
      avatar: String,
      date: {
         type: Date,
         default: Date.now
      }
   }],
   date: {
      type: Date,
      default: Date.now
   }    
});
module.exports = mongoose.model('Post', PostSchema);