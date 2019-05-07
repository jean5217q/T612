//env
import React, { Component } from 'react';

class Top_Bar extends Component {
  render() {
    const {text} = this.props
    return(
      <div className='add-act-top-wrap'>
        <div className='add-act-close-btn'></div>
        <div className='add-act-title'>{text}</div>
      </div>
    )
  }
}

export default Top_Bar