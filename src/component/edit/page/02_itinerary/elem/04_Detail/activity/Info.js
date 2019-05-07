import React, { Component } from 'react'

class Info extends Component {
  render() {
    return(
    <div className='add-select-group'>
      <div className='add-select-title-wrap'>
        <div className='add-select-title-decor'></div>
        <div className='add-select-title-text'>Info</div>
      </div>
      {/*地址*/}
      <div className='add-select-input-wrap'>
        <label className='add-select-label'>Address</label>
        <input 
          className='add-select-input'
          type='input'
          placeholder='optional'/>
      </div>
      {/*營業時間*/}
      <div className='add-select-input-wrap'>
        <label className='add-select-label'>Business Hours</label>
        <input 
          className='add-select-input'
          type='input'
          placeholder='optional'/>
      </div>
      {/* 其他資訊 */}
      <div className='add-select-input-wrap'>
        <label className='add-select-label'>Remark</label>
        <input 
          className='add-select-input'
          type='input'
          placeholder='optional'/>
      </div>
    </div>
    )
  }
}

export default Info