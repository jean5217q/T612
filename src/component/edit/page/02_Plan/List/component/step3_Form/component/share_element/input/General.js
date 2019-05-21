import React, { Component } from 'react';
import PropTypes from 'prop-types';

class General extends Component {
  render() {
    const {
      label,
      placeholder,
      value,
      setInput
    } = this.props
    return (
      <div className='add-select-input-wrap'>
        <label className='add-select-label'>{label}</label>
        <input
          className='add-select-input'
          type='input'
          placeholder={placeholder}
          value={value}
          onChange={setInput} />
      </div>
    )
  }
}

General.propTypes = {
  lang: PropTypes.number,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  value: PropTypes.string,
  setInput: PropTypes.func,
}

export default General