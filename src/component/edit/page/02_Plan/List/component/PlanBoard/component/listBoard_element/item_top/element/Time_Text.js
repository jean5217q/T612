import React, { Component } from 'react';

class Time_Text extends Component {
  render() {
    const { time } = this.props
    return (
      <div className="i-top-block time">
        <div className="text">{time}</div>
      </div>
    )
  }
}

export default Time_Text