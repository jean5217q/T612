//env
import React, { Component } from 'react';
import 'element-theme-default'; 
import {  DatePicker } from 'element-react/next';

class Arrive extends Component {
  state = {
    value1: new Date(),
    value2: new Date()
  }
  componentDidMount(){
    console.log(this.props)
  }
  render() {
    return(
      <div className='add-select-group'>
        <div className='add-select-title-wrap'>
          <div className='add-select-title-decor'></div>
          <div className='add-select-title-text'>Arrive</div>
        </div>
          {/*城市*/}
        <div className='add-select-input-wrap'>
          <label className='add-select-label'>Location</label>
          <input 
            className='add-select-input'
            type='text'
            value={this.props.ar_l}
            onChange={this.props.setArriveLocation}/>
        </div>
        {/*時間*/}
        <div className='add-select-input-wrap time'>
          <label className='add-select-label'>Time</label>
          <DatePicker
            isShowTime={true}
            value={this.props.ar_time}
            placeholder="Pick a day"
            onChange={date=>this.props.setArriveTime(date)}
            disabledDate={time=>time.getTime() < Date.now() - 8.64e7}
            />
        </div>
      </div>
    )
  }
}

export default Arrive