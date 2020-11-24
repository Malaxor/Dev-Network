import React, { Fragment, useEffect } from 'react'
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Spinner from '../layout/Spinner';
import { getProfileByUserId } from '../../actions/profile';
import ProfileTop from './ProfileTop';
import ProfileAbout from './ProfileAbout';
import ProfileExperience from './ProfileExperience';
import ProfileEducation from './ProfileEducation';

const Profile = ({ match, getProfileByUserId, profile: { profile, loading }, auth }) => {
   useEffect(() => {
      getProfileByUserId(match.params.id);
   }, [getProfileByUserId, match.params.id]);

   return (
      <Fragment>
         {
            profile === null || loading ? <Spinner /> :
            <Fragment>
               <Link to="/profiles" className="btn btn--light">Back to Profiles</Link>
               {
                  auth.isAuthenticated && !auth.loading && auth.user._id === profile.user._id && 
                  <Link to="/edit-profile" className="btn btn--dark">Edit Profile</Link>
               }
               <div class="profile-grid my-16">
                  <ProfileTop profile={profile} />
                  <ProfileAbout profile={profile} />
                  <div className="profile-exp bg--white p-32">
                     <h2 className="text-primary">Experience</h2>
                     {
                        profile.experience.length > 0 ? (
                        <Fragment>
                           {profile.experience.map(exp => 
                              <ProfileExperience key={exp._id} experience={exp} />
                           )}
                        </Fragment>) : (<h4>...</h4>)
                     }
                  </div>
                  <div className="profile-edu bg--white p-32">
                     <h2 className="text-primary">Education</h2>
                     {
                        profile.education.length > 0 ? (
                        <Fragment>
                           {profile.education.map(edu => 
                              <ProfileEducation key={edu._id} education={edu} />
                           )}
                        </Fragment>) : (<h4>...</h4>)
                     }
                  </div>
               </div>
            </Fragment>
         }
      </Fragment>
   );
}
const mapStateToProps = state => ({ 
   profile: state.profile,
   auth: state.auth 
});
export default connect(mapStateToProps, { getProfileByUserId })(Profile);