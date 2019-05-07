import React, { Component } from 'react';

class Bottom_Loop_item extends Component {
  render() {
    const {title,value,lang} = this.props
    return (
      <div className="i-middle-list-item">
        <div className="i-middle-list-title">{title}</div>
        <div className="i-middle-list-content">{value}</div>
      </div>
    )
  }
}

export default Bottom_Loop_item