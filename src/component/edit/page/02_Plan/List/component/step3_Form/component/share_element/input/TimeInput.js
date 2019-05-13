import React, { Component } from 'react';
import TimeSelector from '../time/TimeSelector';

class TimeInput extends Component {
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
          <TimeSelector
            time={value}
            setTime={setTime} />
        </div>
      </div>
    )
  }
}

export default TimeInput