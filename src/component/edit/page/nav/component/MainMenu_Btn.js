import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

class MainMenu_Btn extends Component {
  state = {
    isRotating: false,
    isShowing: false
  }
  showMainMenu = () => this.setState({ isShowing: true },()=>this.showMainMenuCallBack())
  showMainMenuCallBack = () => setTimeout(()=>this.setState({ isRotating: true }), 10)
  hideMainMenu = () => this.setState({ isRotating: false},()=>this.hideMainMenuCallBack())
  hideMainMenuCallBack = () => setTimeout(()=>this.setState({ isShowing: false }), 305)
  logOut = () => {
    firebase.auth().signOut()
    .then(() => window.location.href = '/')
    .catch((err) =>alert('Error!'))
  }
  render() {
    const { isShowing, isRotating } = this.state
    const { nav, lang } = this.props
    return (
      <div className='lg-profile-btn-wrap'>
        <div
          className={`lg-profile-btn-frame ${isShowing&&'show'}`}
          onMouseLeave={this.hideMainMenu}>
          <div
            className={`lg-profile-show-btn-wrap ${ isRotating&&'rotate'}`}>
            <NavLink
              to="/profile"
              className='lg-profile-show-btn profile'>
              <span className='lg-circle-nav'>{nav['profile'][lang]}</span>
            </NavLink>
            <div
              className='lg-profile-show-btn log-out'
              onClick={this.logOut} >
              <span className='lg-circle-nav'>{nav['logout'][lang]}</span>
            </div>
          </div>
        </div>
        <div
          className='lg-profile-main-btn-wrap'
          onMouseOver={this.showMainMenu}>
          <div className='lg-profile-main-btn-icon'></div>
        </div>
      </div>
    )
  }
}

export default MainMenu_Btn;