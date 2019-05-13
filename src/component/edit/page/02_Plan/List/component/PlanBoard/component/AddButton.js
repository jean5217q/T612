import React, { Component } from 'react';

class AddButtin extends Component {
  render() {
    const { goToStep2 } = this.props
    return (
      <div
        className='add-list-btn'
        onClick={goToStep2}>
        <div className='add-list-btn-icon'></div>
      </div>
    )
  }
}

export default AddButtin;