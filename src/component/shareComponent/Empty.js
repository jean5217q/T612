import React, { Component } from 'react';

class Empty_Status extends Component {
  render() {
    const { text,type } = this.props
    return (
      <div className='list-bottom'>
        <div className='list-empty-wrap'>
          <div className={`list-empty-img ${type}`}></div>
          <div className='list-empty-text'>{text}</div>
        </div>
      </div>
    )
  }
}
export default Empty_Status