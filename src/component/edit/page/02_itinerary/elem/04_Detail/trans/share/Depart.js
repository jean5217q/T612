//env
import React, { Component } from 'react'
import 'element-theme-default'; 
import {  TimePicker } from 'element-react/next';

class Depart extends Component {
  state = {
    vvv : new Date()
  }
  handleUpdate(value) {
    console.debug('time-picker update: ', value)
    console.log(this.state.vvv)
  }
  render() {
    return(
      <div className='add-select-group'>
        <div className='add-select-title-wrap'>
          <div className='add-select-title-decor'></div>
          <div className='add-select-title-text'>Depart</div>
        </div>
          {/*城市*/}
          <div className='add-select-input-wrap'>
            <label className='add-select-label'>Location</label>
            <input 
              className='add-select-input'
              type='text'
              value={this.props.dp_l}
              onChange={this.props.setDepartLocation}/>
          </div>
          {/*時間*/}
          <div className='add-select-input-wrap time'>
          <label className='add-select-label'>Time</label>
          <TimePicker
            onChange={date=>this.props.setDepartTime(date)}
            placeholder="Arbitrary time"
            value={this.state.vvv}
          />
        </div>
      </div>
    )
  }
}

export default Depart