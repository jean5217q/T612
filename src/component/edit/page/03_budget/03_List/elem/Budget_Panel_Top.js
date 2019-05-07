import React, { Component } from 'react'
import { formateMonthDay } from '../../../../../base';
import { week } from '../../../../../../data/Content';
class Budget_Panel_Top extends Component {
  render() {
    let { openEdit, time, lang, txt, color } = this.props
    time = formateMonthDay(time.seconds)
    return (
      <div className={`list-top color-${color}`}>
        <div className="list-top-inner">
          <div className="top-block budget">
            <div className="top-inner-block budget">
              <span className='top-title date'>{time.m}.{time.d}</span>
              <span className="top-title-week">{week[time.w][lang]}</span>
            </div>
            <div
              className="top-inner-block exchange"
              onClick={openEdit}>
              <i className="fas fa-exchange-alt exchange-icon"></i>
            </div>
          </div>
        </div>
      </div>
    )
  }
}



export default Budget_Panel_Top;