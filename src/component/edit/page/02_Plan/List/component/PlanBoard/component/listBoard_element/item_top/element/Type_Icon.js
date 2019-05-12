import React, { Component } from 'react';

class Type_Icon extends Component {
  render() {
    const { type } = this.props
    return (
      <div className="i-top-block type">
        <div className={`type ${type}`}>
          <div className="icon"></div>
        </div>
      </div>
    )
  }
}

export default Type_Icon