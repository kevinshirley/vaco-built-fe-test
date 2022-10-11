import React from 'react';
import { LOADING_NOW } from '../images';

const Spinner = () => {
  return (
    <div className="spinner">
      <img
        src={LOADING_NOW as any}
        alt='Loading...'
      />
    </div>
  );
};

export default Spinner;
