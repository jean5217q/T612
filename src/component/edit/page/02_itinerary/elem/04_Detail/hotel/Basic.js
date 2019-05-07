import React, { Component } from 'react'

class Basic extends Component {
  render() {
    const {type} = this.props
    return(
        <div className='add-select-group'>
          {/*類型*/}
          <div className='add-select-input-wrap'>
            <label className='add-select-label'>Type</label>
            <div className='add-select-input'>{type}</div>
          </div>
          <div className='add-select-input-wrap'>
            <label className='add-select-label'>Name</label>
            <input 
              className='add-select-input'
              type='input'/>
          </div>
          <div className='add-select-input-wrap'>
            <label className='add-select-label'>Address</label>
            <input 
              className='add-select-input'
              type='input'
              placeholder='optional'/>
          </div>
          <div className='add-select-input-wrap'>
            <label className='add-select-label'>Phone</label>
            <input 
              className='add-select-input'
              type='input'
              placeholder='optional'/>
          </div>
          <div className='add-select-input-wrap'>
            <label className='add-select-label'>Email</label>
            <input 
              className='add-select-input'
              type='input'
              placeholder='optional'/>
          </div>
      </div>
    )
  }
}

export default Basic