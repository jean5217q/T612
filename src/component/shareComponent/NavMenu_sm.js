import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

class NavMenu_sm extends Component {
  render() {
    const { toggleNavBar } = this.props
    return (
      <div className='sm-edit-bottom-nav'>
        <div className='sm-edit-bottom-inner'>
          <div
            className='sm-edit-bottom-item'
            onClick={toggleNavBar}>
            <div className='sm-edit-bottom-icon menu'>
              <div className='sm-nav-icon'></div>
            </div>
          </div>
          {/* 個人 */}
          <NavLink
            to='/profile/account'
            className='sm-edit-bottom-item'>
            <div className='sm-edit-bottom-icon user'>
              <div className='sm-nav-icon'></div>
            </div>
          </NavLink>
        </div>
      </div>
    )
  }
}

NavMenu_sm.propTypes = {
  toggleNavBar: PropTypes.func
}

export default NavMenu_sm;