import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

class Project_Add_Btn extends Component {
  render() {
    return (
      <NavLink
        to='/create_project'
        className='add-list-btn'>
        <div className='add-list-btn-icon'></div>
      </NavLink>
    )
  }
}

export default Project_Add_Btn;