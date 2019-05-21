import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { formateTime } from '../../../../../../../../../../../base';

class Main_Trans extends Component {
  //判斷抵達日是否為隔天
  isNextDay = (arr, dep) => {
    const arr_time = new Date(arr * 1000).toLocaleString()
    const dep_time = new Date(dep * 1000).toLocaleString()
    let arr_month = arr_time.split(' ')[0].split('/')[1]
    let arr_date = arr_time.split(' ')[0].split('/')[2]
    let dep_month = dep_time.split(' ')[0].split('/')[1]
    let dep_date = dep_time.split(' ')[0].split('/')[2]
    if (arr_month !== dep_month || arr_date !== dep_date) {
      return `${formateTime(arr)} (${arr_month}/${arr_date})`
    }
    else return formateTime(arr)
  }
  render() {
    const { main, sub_type } = this.props;
    const depart = main.depart
    const arrive = main.arrive
    const arriveTime = arrive.time.seconds
    const departTime = depart.time.seconds
    return (
      <div className="i-top-block main">
        <div className="i-top-main-block info">
          <div className="i-top-main-place">
            <div className="i-top-main-title">
              {depart.location}
            </div>
            <div className="i-top-main-sub">
              {formateTime(departTime)}
            </div>
          </div>
          <div className='to-icon'></div>
          <div className="i-top-main-place">
            <div className="i-top-main-title">
              {arrive.location}
            </div>
            <div
              className="i-top-main-sub">
              {this.isNextDay(arriveTime, departTime)}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

Main_Trans.propTypes = {
  main: PropTypes.object,
  sub_type: PropTypes.string
}

export default Main_Trans