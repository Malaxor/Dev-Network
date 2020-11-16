import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import Moment from 'react-moment';

const Education = ({ education }) => {
   const educations = education.map(({ _id, school, degree, current, from, to }) => (
      <tr key={_id}>
         <td>{school}</td>
         <td className='hide-sm'>{degree}</td>
         <td>
            <Moment format='YYYY/MM/DD'>{from}</Moment>
            - {current ? ('Now') : (<Moment format='YYYY/MM/DD'>{to}</Moment>)}
         </td>
         <td>
            <button className='btn btn--danger'>Delete</button>
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
                  <th className='hide-sm'>Title</th>
                  <th className='hide-sm'>Years</th>
                  <th />
               </tr>
            </thead>
            <tbody>{educations}</tbody>
         </table>
      </Fragment>
   );
}
export default Education;