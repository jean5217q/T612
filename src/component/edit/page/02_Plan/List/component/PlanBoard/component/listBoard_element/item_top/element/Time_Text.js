import React, { Component } from 'react';
import PropTypes from 'prop-types';

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

Time_Text.propTypes = {
  time: PropTypes.string,
}

export default Time_Text