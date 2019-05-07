import React, { Component } from 'react'

class Road_Trip extends Component {
  render() {
    const { Way,setWay} = this.props
    return(
        <div className='add-select-group'>
          {/*類型*/}
          <div className='add-select-input-wrap'>
            <label className='add-select-label'>Type</label>
            <div className='add-select-input'>Taxi</div>
          </div>
          {/*方式*/}
          <div className='add-select-input-wrap'>
            <label className='add-select-label'>Way</label>
            <input 
              className='add-select-input'
              type='input'
              placeholder="optional(by car, by bike...)"
              value={Way}
              onChange={setWay}/>
          </div>
      </div>
    )
  }
}

export default Road_Trip