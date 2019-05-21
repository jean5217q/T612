import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

class Add_Btn extends Component {
  render() {
    return (
      <div className='add-btn-wrap'>
        <NavLink
          to='/create'
          className='add-btn'>
          <div className='icon'></div>
        </NavLink>
      </div>
    )
  }
}

export default Add_Btn;