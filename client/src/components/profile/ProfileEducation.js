import React from 'react'
import Moment from 'react-moment';

const ProfileEducation = ({ education: { school, degree, fieldOfStudy, current, to, from, description } }) => (
   <div>
      <h3 className="text-dark">{school}</h3>
      <p>
         <Moment format='MMM YYYY'>{from}</Moment> - {current ? 'Now' : <Moment format='MMM YYYY'>{to}</Moment>}
      </p>
      <p>
         <strong>Degree: </strong>{degree}
      </p>
      <p>
         <strong>Field of Study: </strong>{fieldOfStudy}
      </p>
      {
         description !== '' &&
         <p>
            <strong>Description: </strong>{description}
         </p>
      }
   </div>
)
export default ProfileEducation;