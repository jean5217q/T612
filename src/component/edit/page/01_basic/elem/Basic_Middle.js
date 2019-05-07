//env
import React, { Component } from 'react';
import Basic_Sub_Title_date from './Basic_Sub_Title_date';
import { formateMonthDay } from '../../../../base';
import { week } from '../../../../../data/Content';

class Basic_Middle extends Component {
  render() {
    let { start, end,lang } = this.props
    start = formateMonthDay(start)
    end = formateMonthDay(end)
    return (
      <div className="basic-container sub">
        <Basic_Sub_Title_date lang={lang}/>
        <div className="basic-sub-content calender">
          {/* 啟程 */}
          <div className='basic-calender-wrap'>
            <div className='basic-calender-top'>
              <div className='basic-calender-top-text'>{start.y}</div>
            </div>
            <div className='basic-calender-bottom'>
              <div className='basic-calender-bottom-day'>{start.m}.{start.d}</div>
              <div className='basic-calender-bottom-week'>{`(${week[start.w][lang]})`}</div>
            </div>
          </div>
          {/* 中介符號 */}
          <div className='calender-next'></div>
          {/* 回程 */}
          <div className='basic-calender-wrap'>
            <div className='basic-calender-top'>
              <div className='basic-calender-top-text'>{end.y}</div>
            </div>
            <div className='basic-calender-bottom'>
              <div className='basic-calender-bottom-day'>{end.m}.{end.d}</div>
              <div className='basic-calender-bottom-week'>{`(${week[end.w][lang]})`}</div>
            </div>
          </div>


        </div>
      </div>
    )
  }
}

export default Basic_Middle