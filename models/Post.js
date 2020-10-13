const mongoose = require('mongoose');
const { Schema } = mongoose;

const PostSchema = new Schema ({
   user: {
      type: Schema.Types.ObjectId,
      ref: 'User'
   },
   author: String,
   avatar: String,
   content: {
      type: String,
      required: true
   },
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
      author: {
         type: String,
         required: true
      },
      content: {
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