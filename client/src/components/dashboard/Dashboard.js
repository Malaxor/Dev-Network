import React, { Fragment, useEffect } from 'react'
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getCurrentUserProfile } from '../../actions/profile';
import DashboardActions from './DashboardActions';
import Spinner from '../layout/Spinner';
import Experience from './Experience';
import Education from './Education';

const Dashboard = ({ getCurrentUserProfile, auth: { user }, profile: { profile, loading } }) => {
   useEffect(() => {
      getCurrentUserProfile();
   }, [getCurrentUserProfile]);
   
   if(loading && profile === null) {
      return <Spinner />;
   }
   return (
      <Fragment>
         <h1 className="large text-primary">Dashboard</h1>
         <p className="lead">
            <i className="fa fa-user"> Welcome, {user && user.name}</i>
         </p>
         {profile !== null ? (
            <Fragment>
               <DashboardActions />
               <Experience experience={profile.experience} />
               <Education education={profile.education} />
            </Fragment>) : (
            <Fragment>
               <p>Please create your profile.</p>
               <Link to="/create-profile" className="btn btn--primary my-8">Create Profile</Link>
            </Fragment>)
         } 
      </Fragment>
   );
}
const mapStateToProps = state => ({
   profile: state.profile,
   auth: state.auth
});
export default connect(mapStateToProps, { getCurrentUserProfile })(Dashboard);