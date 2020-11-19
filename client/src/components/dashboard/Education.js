import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import Moment from 'react-moment';
import { deleteEducation } from '../../actions/profile'

const Education = ({ education, deleteEducation }) => {
   const educations = education.map(({ _id, school, degree, from, current, to }) => (
      <tr key={_id}>
         <td>{school}</td>
         <td className='hide-sm'>{degree}</td>
         <td>
            <Moment format='MMM YYYY'>{from}</Moment>
            - {current ? ('Now') : (<Moment format='MMM YYYY'>{to}</Moment>)}
         </td>
         <td>
            <button 
               className='btn btn--danger'
               onClick={() => deleteEducation(_id)}
            >Delete
            </button>
         </td>
      </tr>
   ));
   return (
      <Fragment>
         <h2 className='my-32'>Education</h2>
         <table className='table'>
            <thead>
               <tr>
                  <th>School</th>
                  <th className='hide-sm'>Degree</th>
                  <th className='hide-sm'>Years</th>
                  <th />
               </tr>
            </thead>
            <tbody>{educations}</tbody>
         </table>
      </Fragment>
   );
}
export default connect(null, { deleteEducation })(Education);