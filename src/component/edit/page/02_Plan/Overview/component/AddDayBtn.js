import React, { Component } from 'react';

class AddDayBtn extends Component {
  render() {
    const { showAddDayBoard } = this.props
    return (
      <div
        onClick={showAddDayBoard}
        className='add-list-btn'>
        <div className='add-list-btn-icon'></div>
      </div>
    )
  }
}

export default AddDayBtn;