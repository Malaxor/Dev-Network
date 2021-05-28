import React, { Fragment, useState, useEffect } from 'react';
import { withRouter, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { createProfile, getCurrentUserProfile } from '../../actions/profile';

const EditProfile = ({ profile: { profile }, createProfile, getCurrentUserProfile, history }) => {
   const [formData, setFormData] = useState({
      company: '',
      website: '',
      location: '',
      status: '',
      skills: '',
      githubUsername: '',
      bio: '',
      twitter: '',
      facebook: '',
      linkedin: '',
      youtube: '',
      instagram: ''
   });
   const [displaySocialInputs, toggleSocialInputs] = useState(false);

   useEffect(() => {
      if(!profile) {
         getCurrentUserProfile();
      }
      else {
         const profileData = { ...formData };

         for(let key in profile) {
            // avoids the _id property and missing keys on the profile object
            if(key in profileData) {
               profileData[key] = profile[key];
            }
         }
         for(let key in profile.social) {
            // avoids the _id property and missing keys on the profile.social object
            if(key in profileData) {
               profileData[key] = profile.social[key];
            }
         }
         profileData.skills = profileData.skills.join(', ');
         setFormData(profileData);
      }
   }, [getCurrentUserProfile, profile]);
   const { 
      company, website, location, status, skills, githubUsername, bio,
      twitter, facebook, linkedin, youtube, instagram  
   } = formData;

   const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });
   const onSubmit = e => {
      e.preventDefault();
      createProfile(formData, history, true);
   }
   return ( 
      <Fragment>
         <h1 className="large text-primary">Edit Your Profile</h1>
         <p className="lead"><i className="fas fa-user-edit"> Mutate Your State of Being</i></p>
         <small>* = required field</small>
         <form className="form" onSubmit={onSubmit}>
            <div className="form-group">
               <select name="status" value={status} onChange={e => onChange(e)}>
                  <option value="0">* Select Professional Status</option>
                  <option value="Developer">Developer</option>
                  <option value="Junior Developer">Junior Developer</option>
                  <option value="Senior Developer">Senior Developer</option>
                  <option value="Manager">Manager</option>
                  <option value="Student or Learning">Student or Learning</option>
                  <option value="Instructor">Instructor or Teacher</option>
                  <option value="Intern">Intern</option>
                  <option value="Other">Other</option>
               </select>
               <small className="form-smallText">Career status.</small>
            </div>
         <div className="form-group">
            <input 
               type="text" 
               placeholder="Company" 
               name="company" 
               value={company}
               onChange={onChange} 
            />
            <small className="form-smallText">Self-employed or wage slave?</small>
         </div>
         <div className="form-group">
            <input 
               type="text" 
               placeholder="Website" 
               name="website"
               value={website}
               onChange={onChange}  
            />
            <small className="form-smallText">Yours or your employer's.</small>
         </div>
         <div className="form-group">
            <input 
               type="text" 
               placeholder="Location" 
               name="location"
               value={location}
               onChange={onChange}  
            />
            <small className="form-smallText">City & State (e.g. Detroit, MI).</small>
         </div>
         <div className="form-group">
            <input 
               type="text" 
               placeholder="* Skills" 
               name="skills"
               value={skills}
               onChange={onChange}  
            />
            <small className="form-smallText">Please use commas to separate values (e.g. JavaScript, Node, React).</small>
         </div>
         <div className="form-group">
            <input
               type="text"
               placeholder="Github Username"
               name="githubUsername"
               value={githubUsername}
               onChange={onChange} 
            />
            <small className="form-text">Provide your GitHub username to view your latest repos.</small>
         </div>
         <div className="form-group">
            <textarea 
               placeholder="Your brief bio" 
               name="bio"
               value={bio}
               onChange={onChange} 
            >
            </textarea>
            <small className="form-smallText">One or two bits about you.</small>
         </div>
         <div className="my-32">
            <button 
               type="button" 
               className="btn btn--light"
               onClick={() => toggleSocialInputs(!displaySocialInputs)}
            >
               Add Social Media Links
            </button>
            <span>Optional</span>
         </div>
         {displaySocialInputs && <Fragment>
            <div className="form-group social-input">
               <i className="fab fa-twitter fa-2x"></i>
               <input 
                  type="text" 
                  placeholder="Twitter URL" 
                  name="twitter"
                  value={twitter}
                  onChange={onChange}  
               />
            </div>
            <div className="form-group social-input">
               <i className="fab fa-facebook fa-2x"></i>
               <input 
                  type="text"
                  placeholder="Facebook URL" 
                  name="facebook" 
                  value={facebook}
                  onChange={onChange}  
               />
            </div>
            <div className="form-group social-input">
               <i className="fab fa-youtube fa-2x"></i>
               <input 
                  type="text" 
                  placeholder="YouTube URL" 
                  name="youtube"
                  value={youtube}
                  onChange={onChange}   
               />
            </div>
            <div className="form-group social-input">
               <i className="fab fa-linkedin fa-2x"></i>
               <input 
                  type="text" 
                  placeholder="Linkedin URL" 
                  name="linkedin"
                  value={linkedin}
                  onChange={onChange}   
               />
            </div>
            <div className="form-group social-input">
               <i className="fab fa-instagram fa-2x"></i>
               <input 
                  type="text" 
                  placeholder="Instagram URL" 
                  name="instagram"
                  value={instagram}
                  onChange={onChange}   
               />
            </div>
         </Fragment>}
            <input type="submit" className="btn btn--primary my-16" />
            <Link className="btn btn--light my-16" to="/dashboard">Go Back</Link>
         </form>
      </Fragment>
   );
}
const mapStateToProps = state => ({
   profile: state.profile
});
export default connect(mapStateToProps, { createProfile, getCurrentUserProfile })(withRouter(EditProfile));
