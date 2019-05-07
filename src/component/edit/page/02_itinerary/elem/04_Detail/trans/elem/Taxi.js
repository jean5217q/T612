import React, { Component } from 'react'

class Taxi extends Component {
  render() {
    const { 
      Carrier,
      Phone,
      setCarrier,
      setPhone} = this.props
    return(
        <div className='add-select-group'>
          {/*類型*/}
          <div className='add-select-input-wrap'>
            <label className='add-select-label'>Type</label>
            <div className='add-select-input'>Taxi</div>
          </div>
          {/*航空公司*/}
          <div className='add-select-input-wrap'>
            <label className='add-select-label'>Carrier</label>
            <input 
              className='add-select-input'
              type='input'
              placeholder='optional'
              value={Carrier}
              onChange={setCarrier}/>
          </div>
          {/*航班號*/}
          <div className='add-select-input-wrap'>
            <label className='add-select-label'>Phone</label>
            <input 
              className='add-select-input'
              type='input'
              placeholder='optional'
              value={Phone}
              onChange={setPhone}/>
          </div>
      </div>
    )
  }
}

export default Taxi