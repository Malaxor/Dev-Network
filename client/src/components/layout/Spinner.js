import React, { Fragment } from 'react';
import spinner from './spinner.gif';

const Spinner = () => (
   <Fragment>
      <img 
         src={spinner}
         style={{ width: '40rem', margin: 'auto', display: 'block' }}
         alt="Loading..."
      />
   </Fragment>
);
export default Spinner;