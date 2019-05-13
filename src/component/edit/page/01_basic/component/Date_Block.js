import React, { Component } from 'react';
import Date_Title_Wrap from './element/Date_Title_Wrap';
import Calender_Item from './element/Calender_Item';
import { setDateToNumber } from '../../../../base';

class Date_Block extends Component {
  render() {
    let { startDay, endDay, lang } = this.props
    startDay = setDateToNumber(startDay)
    endDay = setDateToNumber(endDay)
    return (
      <div className="basic-container sub">
        <Date_Title_Wrap lang={lang}/>
        <div className="basic-sub-content calender">
          <Calender_Item 
            lang={lang}
            day={startDay}/>
          <div className='calender-next'></div>
          <Calender_Item
            lang={lang}
            day={endDay}/>
        </div>
      </div>
    )
  }
}

export default Date_Block