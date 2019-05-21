import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Circle extends Component {
  render() {
    const { direction } = this.props
    return (
      <div className={`bg-circle-wrap ${direction}`}>
        <div className="bg-circle outer">
          <div className="bg-circle-ball r1"></div>
          <div className="bg-circle-ball r2"></div>
        </div>
        <div className="bg-circle inner">
          <div className="bg-circle-ball r3"></div>
        </div>
      </div>
    )
  }
}

Circle.propTypes = {
  direction: PropTypes.string,
}

export default Circle


