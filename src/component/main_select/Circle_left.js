//env
import React, { Component } from 'react';

class Circle extends Component {
  render() {
    return (
      <div className="bg-circle-wrap left">
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

export default Circle


