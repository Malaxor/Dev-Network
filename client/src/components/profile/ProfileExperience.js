import React from 'react'
import Moment from 'react-moment';

const ProfileExperience = ({ experience: { company, title, location, current, to, from, description } }) => (
   <div>
      <h3 className="text-dark">{company}</h3>
      <p>
         <Moment format='MMM YYYY'>{from}</Moment> - {current ? 'Now' : <Moment format='MMM YYYY'>{to}</Moment>}
      </p>
      <p>
         <strong>Position: </strong>{title}
      </p>
      {
         description &&
         <p>
            <strong>Description: </strong>{description}
         </p>
      }
   </div>
)
export default ProfileExperience;