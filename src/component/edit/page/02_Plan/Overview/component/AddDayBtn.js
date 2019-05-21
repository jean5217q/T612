import React, { Component } from 'react';
import PropTypes from 'prop-types';

class AddDayBtn extends Component {
  render() {
    const { showAddDayBoard } = this.props
    return (
      <div className='add-btn-wrap'>
        <div
          onClick={showAddDayBoard}
          className='add-btn'>
          <div className='icon'></div>
        </div>
      </div>
    )
  }
}

AddDayBtn.propTypes = {
  showAddDayBoard: PropTypes.func,
}

export default AddDayBtn;