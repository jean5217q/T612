import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Sub_Item extends Component {
  render() {
    const {title, value } = this.props
    return (
      <div className="i-middle-list-item">
        <div className="i-middle-list-title">{title}</div>
        <div className="i-middle-list-content">{value}</div>
      </div>
    )
  }
}

Sub_Item.propTypes = {
  title: PropTypes.string, 
  value: PropTypes.string, 
}

export default Sub_Item