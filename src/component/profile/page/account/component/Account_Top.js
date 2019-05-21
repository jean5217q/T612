import React, { Component } from 'react';
import PropTypes from 'prop-types';
const userImg = require('../../../../../images/essential/user_photo.svg');

class Account_Top extends Component {
  logOut = () => {
    firebase.auth().signOut()
    .then(() => window.location.href = '/')
    .catch(err => alert('Error'))
  }
  render() {
    const { 
      openUpdatePhotoBlock, 
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
                style={user.img ? { backgroundImage: `url('${user.img}')` } : { backgroundImage: `url('${userImg}')`}}
                >
              </div>
              <div
                className='user-photo-edit-btn'
                onClick={openUpdatePhotoBlock}>
                <div className='user-photo-edit-icon'
                  onClick={openUpdatePhotoBlock}>
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

Account_Top.propTypes = {
  lang: PropTypes.number,
  user: PropTypes.object,
  text: PropTypes.object,
  openUpdatePhotoBlock: PropTypes.func, 
}

export default Account_Top