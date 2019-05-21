import React, { Component } from 'react';
import PropTypes from 'prop-types';

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

Type.propTypes = {
  typeLabel: PropTypes.string,
  typeValue: PropTypes.string, 
}

export default Type