import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

class Add_Btn extends Component {
  render() {
    return (
      <NavLink
        to='/create'
        className='add-list-btn'>
        <div className='add-list-btn-icon'></div>
      </NavLink>
    )
  }
}
export default Add_Btn;