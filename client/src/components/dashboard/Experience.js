import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import Moment from 'react-moment';

const Experience = ({ experience }) => {
   const experiences = experience.map(({ _id, company, current, title, from, to }) => (
      <tr key={_id}>
         <td>{company}</td>
         <td className='hide-sm'>{title}</td>
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
export default Experience;