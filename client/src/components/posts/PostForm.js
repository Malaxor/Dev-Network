import React, { useState } from 'react';
import { connect } from 'react-redux';
import { addPost } from '../../actions/post';

const PostForm = ({ addPost }) => {
   const [ content, setContent ] = useState('');

   return (
      <div class="post-form">
        <div class="bg--primary p">
            <h3>Materialize your thoughts</h3>
        </div>
        <form 
            class="form my-16" 
            onSubmit={e => {
               e.preventDefault();
               addPost({ content });
               setContent('');
            }}
         >
            <textarea
               name="text"
               cols="30"
               rows="5"
               placeholder="the pen or the sword?"
               required
               value={content}
               onChange={e => setContent(e.target.value)}
            >
            </textarea>
            <input type="submit" class="btn btn--dark my-16" value="Submit" />
        </form>
      </div>
   )
}
export default connect(null, { addPost })(PostForm);