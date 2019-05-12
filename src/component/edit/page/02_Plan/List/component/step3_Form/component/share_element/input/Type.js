import React, { Component } from 'react';

class Type extends Component {
  render() {
    const { typeLabel, typeValue } = this.props
    return (
      <div className='add-select-input-wrap'>
        <label className='add-select-label'>{typeLabel}</label>
        <div className='add-select-input'>{typeValue}</div>
      </div>
    )
  }
}

export default Type