//env
import React, { Component } from 'react'
//component
import { NavLink } from 'react-router-dom'

class Btn extends Component {
  render() {
    return(
      <div className='select-btn-wrap'>
        <NavLink 
          className='select-btn-block map'
          to="/edit/itinerary/map">
          <div className='select-map-btn-icon'></div>
          <div className='select-btn-text'>add map tag
          </div>
        </NavLink>
        <div 
          className='select-btn-block submit'
          >
          <div 
            className='select-btn-text'
            onClick={this.props.addItem}>submit</div>

        </div>
      </div>
    )
  }
}

export default Btn