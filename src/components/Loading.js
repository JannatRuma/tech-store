import React from 'react';
import loading from '../assets/loading.gif'

const Loading = () => {
  return (
    <div className="loading">
      <h2>Loading..</h2>
     <img src={loading} alt="loading gif"/>
    </div>
  );
};

export default Loading;