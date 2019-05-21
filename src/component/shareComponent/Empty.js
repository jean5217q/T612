import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Empty_Status extends Component {
  render() {
    const { text,type } = this.props
    return (
      <div className='board-bottom'>
        <div className='list-empty-wrap'>
          <div className={`list-empty-img ${type}`}></div>
          <div className='list-empty-text'>{text}</div>
        </div>
      </div>
    )
  }
}

Empty_Status.propTypes = {
  text: PropTypes.string,
  type: PropTypes.string
}

export default Empty_Status