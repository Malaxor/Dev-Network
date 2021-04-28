import React, { Fragment } from 'react'

const ProfileAbout = ({ profile: { bio, skills} }) =>  (
   <div className="profile-about bg--light p-32">
      {
         bio && (
            <Fragment>
               <h2 className="text-primary p-16">Bio</h2>
               <p>{bio}</p>
               <div className="line"></div>
            </Fragment>
         )
      }
      <h2 className="text-primary">Skill Set</h2>
      <div className="skills">
         {
            skills.map((skill, index) => (
               <div key={index} className="p-16">
                  <i className="fas fa-check"></i> {skill}
               </div>
            ))
         }
      </div>
   </div>
);
export default ProfileAbout;