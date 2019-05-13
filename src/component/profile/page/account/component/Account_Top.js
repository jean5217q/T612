import React, { Component } from 'react';

class User_info extends Component {
  logOut = () => {
    firebase.auth().signOut()
    .then(() => window.location.href = '/')
    .catch(err => alert('Error'))
  }
  render() {
    const { 
      openPopUp, 
      user,
      text,
      lang } = this.props
    return (
      <div className='account-top'>
        <div className='account-top-inner'>
          <div className='account-top-left'>
            <div className='user-photo-container'>
              <div
                className='user-photo'
                style={user.img ? { backgroundImage: `url('${user.img}')` } : null}>
              </div>
              <div
                className='user-photo-edit-btn'
                onClick={openPopUp}>
                <div className='user-photo-edit-icon'
                  onClick={openPopUp}>
                </div>
              </div>
            </div>
          </div>
          <div className='account-top-right'>
            <div className='user-text name'>{user.name}</div>
            <div className='user-text email'>{user.email}</div>
            <div 
              className='user-text log-out'
              onClick={this.logOut}>
              {text['logout'][lang]}
            </div>
          </div>
        </div>
      </div>
    )
  }
}
export default User_info