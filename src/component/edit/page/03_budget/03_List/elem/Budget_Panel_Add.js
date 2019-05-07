import React, { Component } from 'react';

class Panel_Add extends Component {
  render() {
    const {
      openAddFrame,
      toggleAddItem,
      lang } = this.props
    return (
      <div
        style={openAddFrame ? { display: 'none' } : { display: 'flex' }}
        className='add-list-btn budget'
        onClick={toggleAddItem}>
        <div className='add-list-btn-icon budget'></div>
      </div>
    )
  }
}

export default Panel_Add;