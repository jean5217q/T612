//env
import React, { Component } from 'react';

class Item_Time extends Component {
  render() {
    const {time} = this.props
    return (
      <div className="i-top-block time">
        <div className="text">{time}</div>
      </div>
    )
  }
}

export default Item_Time