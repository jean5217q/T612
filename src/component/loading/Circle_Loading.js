import React, { Component } from 'react';

class Circle_Loading extends Component {
  render(){
    return(
      <div className="loading-circle-wrap">
        <div className='loading-circle bg'></div>
        <div className='loading-circle md'></div>
        <div className='loading-circle sm'></div>
        <h3 className='loading-circle-text'>Loading..</h3>
      </div>
    )
  }
}

export default Circle_Loading