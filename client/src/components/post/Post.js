import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Spinner from '../layout/Spinner';
import PostItem from '../posts/PostItem';
import CommentForm from '../post/CommentForm';
import { getPost } from '../../actions/post';

const Post = ({ getPost, post: { post, loading }, match }) => {
   useEffect(() => {
      getPost(match.params.id);
   },[getPost]);

   return loading || post === null ? <Spinner /> : 
   <Fragment>
      <Link to='/posts' className='btn'>Back to Posts</Link>
      <PostItem post={post} displayBtns={false} />
      <CommentForm postId={post._id} />
   </Fragment>
}
const mapStateToProps = state => ({
   post: state.post
})
export default connect(mapStateToProps, { getPost })(Post);