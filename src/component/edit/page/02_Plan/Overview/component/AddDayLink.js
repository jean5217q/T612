import React, { Component } from 'react';
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
        className='budget-project-item add'>
        <div className='plan-content'>
          <Time
            date={date}
            setDate={setDate} />
          <div className='budget-add-list-btn-wrap'>
            <div
              className='budget-project-add-list-btn add'
              onClick={addNewDate}>
              {btn['add2'][lang]}
            </div>
            <div
              onClick={hideAddDayBoard}
              className='budget-project-add-list-btn'>
              {btn['cancel'][lang]}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default AddDayLink;