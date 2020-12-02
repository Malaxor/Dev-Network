import React, { useState } from 'react';
import { connect } from 'react-redux';
import { addComment } from '../../actions/post';

const CommentForm = ({ postId, addComment }) => {
   const [ content, setContent ] = useState('');

   return (
      <div className="post-form">
         <div className="bg--primary p">
            <h3>Put in your two cents</h3>
         </div>
      <form 
         className="form my-16" 
         onSubmit={e => {
            e.preventDefault();
            addComment(postId, { content });
            setContent('');
         }}
       >
         <textarea
            name="text"
            cols="30"
            rows="5"
            placeholder="What's on your mind?"
            required
            value={content}
            onChange={e => setContent(e.target.value)}
         >
         </textarea>
         <input type="submit" className="btn btn--dark my-16" value="Submit" />
      </form>
    </div>
   );
}
export default connect(null, { addComment })(CommentForm);