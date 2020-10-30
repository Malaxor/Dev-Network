import React from 'react';
import { connect } from 'react-redux';

const Alert = ({ alerts }) => {
   if(alerts !== null && alerts.length > 0) {
      return alerts.map(({ id, alertType, msg }) => {
         return ( 
            <div key={id} className={`alert alert--${alertType}`}>
               { msg }
            </div>
         );   
      });
   }
   else {
      return null;
   }
};
const mapStateToProps = state => ({ alerts: state.alerts });
export default connect(mapStateToProps)(Alert);