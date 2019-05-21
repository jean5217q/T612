import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Time from '../../../../../shareComponent/Time';

class AddDayLink extends Component {
  render() {
    const { 
      lang,
      btn,
      date,
      addDayBoardShowing,
      setDate,
      addNewDate,
      hideAddDayBoard
    } = this.props
    return (
      <div
        style={addDayBoardShowing ? { display: 'flex' } : { display: 'none' }}
        className='daily-card add'>
        <div className='daily-card-content'>
          <Time
            date={date}
            setDate={setDate} />
          <div className='daily-board-btn'>
            <div
              className='btn add'
              onClick={addNewDate}>{btn['add2'][lang]}
            </div>
            <div
              onClick={hideAddDayBoard}
              className='btn cancel'>{btn['cancel'][lang]}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

AddDayLink.propTypes = {
  lang: PropTypes.number,
  btn: PropTypes.object,
  date: PropTypes.object,
  addDayBoardShowing: PropTypes.bool,
  setDate: PropTypes.func,
  addNewDate: PropTypes.func,
  hideAddDayBoard: PropTypes.func,
}

export default AddDayLink;