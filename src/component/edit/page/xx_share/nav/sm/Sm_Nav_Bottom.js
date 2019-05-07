//env
import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
//component


class Sm_Nav_Bottom extends Component {
  render() {
    const { showSideNav, nav, lang } = this.props
    return (
      <div className='sm-edit-bottom-nav'>
        <div className='sm-edit-bottom-inner'>
          {/* 編輯 */}
          <div
            className='sm-edit-bottom-item'
            onClick={showSideNav}>
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

export default Sm_Nav_Bottom;