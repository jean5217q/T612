import React, { Component } from 'react';

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

export default Drop_Icon;