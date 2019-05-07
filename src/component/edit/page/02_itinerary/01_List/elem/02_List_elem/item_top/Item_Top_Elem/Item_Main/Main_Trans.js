//env
import React, { Component } from 'react';
import { formateTime } from '../../../../../../../../../checkLog'
class Main_Trans extends Component {
  compareTime = (arr, dep) => {
    const a = new Date(arr * 1000).toLocaleString()
    const d = new Date(dep * 1000).toLocaleString()
    let a_m = a.split(' ')[0].split('/')[1]
    let a_d = a.split(' ')[0].split('/')[2]
    let d_m = d.split(' ')[0].split('/')[1]
    let d_d = d.split(' ')[0].split('/')[2]
    if (a_m !== d_m || a_d !== d_d) {
      return `${formateTime(arr)} (${a_m}/${a_d})`
    }
    else {
      return formateTime(arr)
    }
  }
  render() {
    const { main, sub_type,lang } = this.props;
    const depart = main.depart
    const arrive = main.arrive
    const arriveTime = arrive.time.seconds
    const departTime = depart.time.seconds
    return (
      <div className="i-top-block main">
        <div className="i-top-main-block line">
          <div className="trans-line-line"></div>
          <div className="trans-line-icon">
            <div className={`trans-line-icon-inner ${sub_type}`}></div>
          </div>
        </div>
        <div className="i-top-main-block info">
          <div className="i-top-main-place">
            <div className="i-top-main-title">{depart.location}</div>
            <div className="i-top-main-sub">{formateTime(departTime)}</div>
          </div>
          <div className="i-top-main-place">
            <div className="i-top-main-title">{arrive.location}</div>
            <div
              className="i-top-main-sub">
              {this.compareTime(arriveTime, departTime)}</div>
          </div>
        </div>
      </div>
    )
  }
}

export default Main_Trans