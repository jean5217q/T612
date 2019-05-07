import React, { Component } from 'react';

class Panel_Add extends Component {
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

export default Panel_Add;