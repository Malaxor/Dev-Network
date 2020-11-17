import React, { Fragment, useEffect } from 'react'
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import { getProfileByUserId } from '../../actions/profile';

const Profile = ({ match, getProfileByUserId, profile: { profile, loading }, auth }) => {
   useEffect(() => {
      getProfileByUserId(match.params.id);
   }, [getProfileByUserId]);
   return (
      <div>
         philip profile
      </div>
   )
}
const mapStateToProps = state => ({ 
   profile: state.profile,
   auth: state.auth 
});
export default connect(mapStateToProps, { getProfileByUserId })(Profile);