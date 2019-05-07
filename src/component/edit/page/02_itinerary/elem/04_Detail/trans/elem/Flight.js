//env
import React, { Component } from 'react'

class Flight extends Component {
  render() {
    const {
      Airline,
      T_Number,
      Seat,
      setSeat,
      setNumber,
      setAirline
    } = this.props
    return(
        <div className='add-select-group'>
          {/*類型*/}
          <div className='add-select-input-wrap'>
            <label className='add-select-label'>Type</label>
            <div className='add-select-input'>Flight</div>
          </div>
          {/*航空公司*/}
          <div className='add-select-input-wrap'>
            <label className='add-select-label'>Airline</label>
            <input 
              className='add-select-input'
              type='input'
              placeholder='optional'
              value={Airline}
              onChange={setAirline}/>
          </div>
          {/*航班號*/}
          <div className='add-select-input-wrap'>
            <label className='add-select-label'>Number</label>
            <input 
              className='add-select-input'
              type='input'
              placeholder='optional'
              value={T_Number}
              onChange={setNumber}/>
          </div>
          {/*座位*/}
          <div className='add-select-input-wrap'>
            <label className='add-select-label'>Seat</label>
            <input 
              className='add-select-input'
              type='input'
              placeholder='optional'
              value={Seat}
              onChange={setSeat}/>
          </div>
      </div>
    )
  }
}

export default Flight