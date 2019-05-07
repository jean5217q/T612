import React, { Component } from 'react'

class Basic extends Component {
  render() {
    const {type} = this.props
    return(
        <div className='add-select-group'>
          {/*類型*/}
          <div className='add-select-input-wrap'>
            <label className='add-select-label'>Type</label>
            <div className='add-select-input'>
              {type==='activity_others'?'others':type}</div>
          </div>
          {/*地點*/}
          <div className='add-select-input-wrap'>
            <label className='add-select-label'>Name</label>
            <input 
              className='add-select-input'
              type='input'/>
          </div>
          {/*抵達時間*/}
          <div className='add-select-input-wrap'>
            <label className='add-select-label'>Time</label>
            <input 
              className='add-select-input'
              type='input'/>
          </div>
      </div>
    )
  }
}

export default Basic