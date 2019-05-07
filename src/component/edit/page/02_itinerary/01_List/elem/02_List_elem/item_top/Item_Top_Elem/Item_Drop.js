import React, { Component } from 'react';
class Item_Drop extends Component {
  render() {
    const { toggleOpen, id } = this.props
    return (
      <div
        className="i-top-block drop"
        onClick={() => toggleOpen(id)}>
        <i className="fas fa-caret-down map-open-btn"></i>
      </div>
    )
  }
}
export default Item_Drop;