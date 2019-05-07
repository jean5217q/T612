///env
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
      // const route = this.props.p_route
      // route.history.push('/')
    }).catch(function (error) {
      console.log(error)
    });
  }
  render() {
    return (
      <div className='lg-profile-btn-wrap'>
        <div
          className={`lg-profile-btn-frame ${this.state.show ? 'show' : null}`}
          onMouseLeave={this.hide}>
          {/* <div
            className={
              `lg-profile-show-btn-wrap profile 
            ${ this.state.rotate ? 'rotate' : null}`}>
            <NavLink
              to="/profile"
              className='lg-profile-show-btn profile'>
              <span className='lg-circle-nav profile-span'>Profile</span>
            </NavLink>
          </div> */}
          <div
            className={
              `lg-profile-show-btn-wrap log-out 
            ${ this.state.rotate ? 'rotate' : null}`}
            onClick={this.logOut}>
            <div className='lg-profile-show-btn log-out'>
              <span className='lg-circle-nav log-out-span'>Log out</span>
            </div>
          </div>
        </div>
        <div
          className='lg-profile-main-btn-wrap'
          onMouseOver={this.show}>
          <div className='lg-profile-main-btn-icon'></div>
        </div>
      </div>
    )
  }
}

export default Lg_Profile_Btn;