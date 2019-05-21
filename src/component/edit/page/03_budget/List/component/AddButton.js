import React, { Component } from 'react';
import PropTypes from 'prop-types';

class AddButton extends Component {
  render() {
    const {
      AddBoardShowing,
      showAddBoard
    } = this.props
    return (
      <div className='add-btn-wrap'>
      <div
        style={AddBoardShowing ? { display: 'none' } : { display: 'flex' }}
        className='add-btn'
        onClick={showAddBoard}>
        <div className='icon'></div>
      </div>
      </div>
    )
  }
}

AddButton.propTypes = {
  AddBoardShowing: PropTypes.bool,
  showAddBoard: PropTypes.func
}

export default AddButton;