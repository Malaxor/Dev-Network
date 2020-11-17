import React, { Fragment, useEffect } from 'react'
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Spinner from '../layout/Spinner';
import { getProfileByUserId } from '../../actions/profile';

const Profile = ({ match, getProfileByUserId, profile: { profile, loading }, auth }) => {
   useEffect(() => {
      getProfileByUserId(match.params.id);
   }, [getProfileByUserId]);

   return (
      <Fragment>
         {profile === null || loading ? <Spinner /> :
            <Fragment>
               <Link to="/profiles" className="btn btn--light">Back to Profiles</Link>
               {auth.isAuthenticated && !auth.loading && auth.user._id === profile.user._id && 
                  <Link to="/edit-profile" className="btn btn--dark">Edit Profile</Link>
               }
            </Fragment>
         }
      </Fragment>
   )
}
const mapStateToProps = state => ({ 
   profile: state.profile,
   auth: state.auth 
});
export default connect(mapStateToProps, { getProfileByUserId })(Profile);