import React, { Fragment, useState } from 'react'
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { addEducation } from '../../actions/profile';

const AddEducation = ({ addEducation, history }) => {
   const [formData, setFormData] = useState({
      school: '',
      degree: '',
      fieldOfStudy: '',
      from: '',
      to: '',
      current: false,
      description: ''
   });
   const { school, degree, fieldOfStudy, from, to, current, description } = formData;

   const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });
   const onSubmit = e => {
      e.preventDefault();
      addEducation(formData, history);
   }
   return (
      <Fragment>
         <h1 className="large text-primary">Education</h1>
         <p className="lead">
         <i className="fas fa-code-branch"></i> Educational Attainment
         </p>
         <small>* = required field</small>
         <form className="form" onSubmit={onSubmit}>
            <div className="form-group">
               <input 
                  type="text" 
                  placeholder="* School/Bootcamp" 
                  name="school" 
                  required
                  value={school}
                  onChange={onChange} 
               />
            </div>
            <div className="form-group">
               <input 
                  type="text" 
                  placeholder="* Degree/Certificate" 
                  name="degree" 
                  required
                  value={degree}
                  onChange={onChange} 
               />
            </div>
            <div className="form-group">
               <input 
                  type="text" 
                  placeholder="* Field of Study" 
                  name="fieldOfStudy"
                  value={fieldOfStudy}
                  onChange={onChange} 
               />
            </div>
            <div className="form-group">
               <h4>* From Date</h4>
               <input 
                  type="date" 
                  name="from"
                  value={from}
                  onChange={onChange} 
               />
            </div>
               <div className="form-group">
               <p>
                  <input 
                     type="checkbox" 
                     name="current" 
                     value={current}
                     checked={current}
                     onChange={() => setFormData({ ...formData, current: !current })} 
                  /> Current School
               </p>
            </div>
            <div className="form-group">
               <h4>To Date</h4>
               <input 
                  type="date" 
                  name="to"
                  value={to}
                  onChange={onChange}
                  disabled={current ? true : false} 
               />
            </div>
            <div className="form-group">
               <textarea
                  name="description"
                  cols="30"
                  rows="5"
                  placeholder="Program Description"
                  value={description}
                  onChange={onChange}
               ></textarea>
            </div>
            <input type="submit" className="btn btn--primary my-16" />
            <Link className="btn btn--light my-16" to="/dashboard">Go Back</Link>
         </form>
      </Fragment>
   )
}
export default connect(null, { addEducation })(withRouter(AddEducation));
