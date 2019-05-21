import React, { Component } from 'react';
import PropTypes from 'prop-types';
import DateSelector from '../time/DateSelector';

class DateInput extends Component {
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

DateInput.propTypes = {
  label: PropTypes.string,
  value: PropTypes.object,
  setTime: PropTypes.func,
}

export default DateInput