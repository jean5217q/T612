import React, { Component } from 'react';

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

export default Sub_Item