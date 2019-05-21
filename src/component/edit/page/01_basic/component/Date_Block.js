import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Date_Title_Wrap from './element/Date_Title_Wrap';
import Calender_Item from './element/Calender_Item';
import { setDateToNumber } from '../../../../base';

class Date_Block extends Component {
  render() {
    let { startDay, endDay, lang } = this.props
    const newStartDay = setDateToNumber(startDay)
    const newEndDay = setDateToNumber(endDay)
    return (
      <div className="basic-container sub">
        <Date_Title_Wrap lang={lang}/>
        <div className="basic-sub-content calender">
          <Calender_Item 
            lang={lang}
            day={newStartDay}/>
          <div className='calender-next'></div>
          <Calender_Item
            lang={lang}
            day={newEndDay}/>
        </div>
      </div>
    )
  }
}

Date_Block.propTypes = {
  lang: PropTypes.number,
  startDay: PropTypes.number,
  endDay: PropTypes.number,
}

export default Date_Block