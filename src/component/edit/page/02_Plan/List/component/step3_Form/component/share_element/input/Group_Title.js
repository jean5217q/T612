import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Group_Title extends Component {
  render() {
    const { title } = this.props
    return (
      <div className='add-select-title-wrap'>
        <div className='add-select-title-decor'></div>
        <div className='add-select-title-text'>{title}</div>
      </div>
    )
  }
}

Group_Title.propTypes = {
  title: PropTypes.string
}

export default Group_Title