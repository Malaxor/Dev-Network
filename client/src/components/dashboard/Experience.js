import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import Moment from 'react-moment';
import { deleteExperience } from '../../actions/profile';

const Experience = ({ experience, deleteExperience }) => {
   const experiences = experience.map(({ _id, company, title, from, current, to }) => (
      <tr key={_id}>
         <td>{company}</td>
         <td className='hide-sm'>{title}</td>
         <td>
            <Moment format='MMM YYYY'>{from}</Moment>
            - {current ? 'Now' : <Moment format='MMM YYYY'>{to}</Moment>}
         </td>
         <td>
            <button 
               className='btn btn--danger'
               onClick={() => deleteExperience(_id)}
            >
            Delete
            </button>
         </td>
      </tr>
   ));
   return (
      <Fragment>
         <h2 className='my-32'>Experience</h2>
         <table className='table'>
            <thead>
               <tr>
                  <th>Company</th>
                  <th className='hide-sm'>Title</th>
                  <th className='hide-sm'>Years</th>
                  <th />
               </tr>
            </thead>
            <tbody>{experiences}</tbody>
         </table>
      </Fragment>
   );
}
export default connect(null, { deleteExperience })(Experience);