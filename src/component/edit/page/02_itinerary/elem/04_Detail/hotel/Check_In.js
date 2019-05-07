//env
import React, { Component } from 'react'

class Check_In extends Component {
  render() {
    return(
      <div className='add-select-group'>
        <div className='add-select-title-wrap'>
          <div className='add-select-title-decor'></div>
          <div className='add-select-title-text'>Check-in</div>
        </div>
          <div className='add-select-input-wrap'>
            <label className='add-select-label'>Date</label>
            <input 
              className='add-select-input'
              type='text'/>
          </div>
      </div>
    )
  }
}

export default Check_In