import React, { Component } from 'react';
import DateSelector from '../time/DateSelector';

class Time extends Component {
  render() {
    const {
      label,
      value,
      setTime
    } = this.props
    return (
      <div className='add-select-input-wrap time'>
        <label className='add-select-label'>{label}</label>
        <div className='add-select-input date'>
          <DateSelector
            time={value}
            setTime={setTime} />
        </div>
      </div>
    )
  }
}

export default Time