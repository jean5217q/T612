import React, { Component } from 'react';

class AddButton extends Component {
  render() {
    const {
      AddBoardShowing,
      showAddBoard
    } = this.props
    return (
      <div
        style={AddBoardShowing ? { display: 'none' } : { display: 'flex' }}
        className='add-list-btn budget'
        onClick={showAddBoard}>
        <div className='add-list-btn-icon budget'></div>
      </div>
    )
  }
}

export default AddButton;