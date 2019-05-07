//env
import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';


//component


class Lg_Profile_Btn extends Component {
  state = {
    rotate: false,
    show: false
  }
  show = () => {
    this.setState({
      show: true
    }, () => {
      setTimeout(() => {
        this.setState({
          rotate: true
        })

      }, 10)
    })

  }
  hide = () => {
    this.setState({
      rotate: false
    }, () => {
      setTimeout(() => {
        this.setState({
          show: false
        })
      }, 305)
    })
  }
  logOut = () => {
    firebase.auth().signOut().then(() => {
      window.location.href = '/'
    }).catch(function (error) {
      console.log(error)
    });
  }
  render() {
    const { show, rotate } = this.state
    const { nav, lang } = this.props
    return (
      <div className='lg-profile-btn-wrap'>
        <div
          className={`lg-profile-btn-frame ${show ? 'show' : null}`}
          onMouseLeave={this.hide}
        >
          <div
            className={
              `lg-profile-show-btn-wrap 
            ${ rotate ? 'rotate' : null}`}>
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
          onMouseOver={this.show}
        >
          <div className='lg-profile-main-btn-icon'></div>
        </div>
      </div>
    )
  }
}

export default Lg_Profile_Btn;