//env
import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

class Cata_Top extends Component {
  render() {
    const {text,previous} = this.props
    return(
      <div className='add-act-top-wrap'>
        <NavLink
          className='back-icon'
          to={`/edit/itinerary/${previous}`}>
        </NavLink>
        <div className='add-act-title'>{text}</div>
      </div>
    )
  }
}

export default Cata_Top