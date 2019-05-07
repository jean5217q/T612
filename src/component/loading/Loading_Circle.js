//env
import React, { Component } from 'react';

class Loading_Circle extends Component {
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

export default Loading_Circle