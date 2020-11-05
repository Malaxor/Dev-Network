import React, { useEffect } from 'react'
import { connect } from 'react-redux';
import { getCurrentUserProfile } from '../../actions/profile';

const Dashboard = ({ getCurrentUserProfile, auth, profile }) => {
   useEffect(() => {
      getCurrentUserProfile();
   }, []);
   
   return (
      <div>
         Dashboard
      </div>
   )
}
const mapStateToProps = state => ({
   profile: state.profile,
   auth: state.auth
});
export default connect(mapStateToProps, { getCurrentUserProfile })(Dashboard);