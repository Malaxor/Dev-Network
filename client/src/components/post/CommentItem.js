import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import { deleteComment } from '../../actions/post';

const CommentItem = ({ 
   postId, 
   comment: { _id, user, avatar, author, content, date },
   auth,
   deleteComment
}) => (
   <div class="post bg--white p-16 my-16">
      <div>
        <Link to={`/profile/${user}`}>
          <img
            class="round-img"
            src={avatar}
            alt=""
          />
          <h4>{author}</h4>
        </Link>
      </div>
      <div>
        <p class="my-16">
           {content}
        </p>
         <p class="post-date">
            Posted on <Moment format='YYYY/MM/DD'>{date}</Moment>
        </p>
         {
            !auth.loading && user === auth.user._id && (
               <button 
                  className='btn btn--danger' 
                  onClick={e => deleteComment(postId, _id)}
               >
                  <i className="fas fa-times"></i>
               </button>
            )
         }
      </div>
   </div>
)

const mapStateToProps = state => ({ auth: state.auth });
export default connect(mapStateToProps,{ deleteComment })(CommentItem);