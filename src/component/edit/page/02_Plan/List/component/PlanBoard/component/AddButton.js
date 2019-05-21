import React, { Component } from 'react';
import PropTypes from 'prop-types';

class AddButtin extends Component {
  render() {
    const { goToStep2 } = this.props
    return (
      <div className='add-btn-wrap'>
        <div
          className='add-btn'
          onClick={goToStep2}>
          <div className='icon'></div>
      </div>
      </div>
    )
  }
}

AddButtin.propTypes = {
  goToStep2: PropTypes.func,
}
export default AddButtin;