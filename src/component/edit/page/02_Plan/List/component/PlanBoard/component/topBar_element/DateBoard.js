import React, { Component } from 'react';
import PropTypes from 'prop-types';
import DateSelector from './DateSelector';

class DateBoard extends Component {
  render() {
    const {
      date,
      dateBoard,
      label,
      submit,
      setDate,
      updateDate } = this.props
    return (
      <div
        className='edit-top-inner'
        style={dateBoard ? { display: 'flex' } : { display: 'none' }}>
        <div className="edit-top-block">
          <div className="edit-top-title">{label}</div>
          <div className="edit-top-date-input">
            <DateSelector
              date={date}
              setDate={setDate} />
          </div>
        </div>
        <form
          onSubmit={updateDate}
          className="edit-top-block">
          <button
            className="edit-top-block-edit-buttom"
            type='submit'>{submit}
          </button>
        </form>
      </div>  
    )
  }
}

DateBoard.propTypes = {
  date: PropTypes.object,
  dateBoard: PropTypes.bool,
  label: PropTypes.string,
  submit: PropTypes.string,
  setDate: PropTypes.func,
  updateDate: PropTypes.func
}

export default DateBoard;