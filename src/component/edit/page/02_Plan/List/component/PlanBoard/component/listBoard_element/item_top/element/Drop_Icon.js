import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Drop_Icon extends Component {
  render() {
    const { toggleSubItem, id } = this.props
    return (
      <div
        className="i-top-block drop"
        onClick={() => toggleSubItem(id)}>
        <i className="fas fa-caret-down map-open-btn"></i>
      </div>
    )
  }
}

Drop_Icon.propTypes = {
  id: PropTypes.string,
  toggleSubItem: PropTypes.func
}

export default Drop_Icon;