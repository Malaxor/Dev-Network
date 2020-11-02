import React from 'react';
import { connect } from 'react-redux';

const Alert = ({ alerts }) => {
   return alerts.map(({ id, alertType, msg }) => {
      return ( 
         <div key={id} className={`alert alert--${alertType}`}>
            {msg}
         </div>
      );   
   });
}   
const mapStateToProps = state => ({ alerts: state.alerts });
export default connect(mapStateToProps)(Alert);