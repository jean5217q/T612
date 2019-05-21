import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Account_Top from './component/Account_Top';
import Account_Bottom from './component/Account_Bottom';
import PhotoUpdate_Pop from './component/PhotoUpdate_Pop';
import SettingSuccess_Pop from './component/SettingSuccess_Pop';
import { asyncGetUserDetail } from '../../../../action/user';
import { account_text as text } from '../../../../data/Content';
import { db } from '../../../base';
const imgUrl = require('../../../../images/essential/camera.svg');

class Account_page extends Component {
  state = {
    preImg: imgUrl,
    file: '',
    updating: false,
    photo_pop: false,
    success_pop: false,
  }
  openUpdatePhotoBlock = () => this.setState({ photo_pop: true })
  closeSuccessPupBlock = () => this.setState({ success_pop: false })
  closeUpdatePhotoBlock = () => {
    this.setState({
      photo_pop: false,
      preImg: imgUrl,
      file: ''
    })
  }
  setPreImg = (e) => {
    const files = e.target.files
    const reader = new FileReader()
    reader.readAsDataURL(files[0]);
    reader.onload = (readerEvent) => this.setState({ preImg: readerEvent.target.result})
    this.setState({file: files[0]})
  }
  updateUserPhoto = () => {
    const { uid, dispatch } = this.props
    const { file } = this.state
    if (file === '') return
    this.setState({updating: true})
    const storageRef = firebase.storage().ref()
    const uploadTask = storageRef.child('user/' + uid).put(file)
    uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
      (snapshot) => {
        switch (snapshot.state) {
          case firebase.storage.TaskState.PAUSED:
            break;
          case firebase.storage.TaskState.RUNNING:
            break;
        }
      },
      (error) => {
        switch (error.code) {
          case 'storage/unauthorized':
            break;
          case 'storage/canceled':
            break;
          case 'storage/unknown':
            break;
        }
      },
      () => {
        uploadTask.snapshot.ref.getDownloadURL()
          .then(downloadURL => {
            db.collection('user').doc(uid).update({ img: downloadURL })
              .then(() => {
                dispatch(asyncGetUserDetail(uid, this.updateUserPhotoCallBack))
              })
          })
      })
  }
  updateUserPhotoCallBack = () => {
    this.setState({
      updating: false,
      photo_pop: false,
      preImg: imgUrl
    })
  }
  updateUser = (color, currency, name) => {
    const { uid, dispatch } = this.props
    db.collection('user').doc(uid).update({
      name: name,
      color: color,
      currency: currency
    })
    .then(() => {
      this.setState({ success_pop: true })
      dispatch(asyncGetUserDetail(uid))
    })
  }
  render() {
    const { 
      updating, 
      photo_pop,
      success_pop,
      preImg } = this.state
    const { 
      lang,
      uid,
      user,
      color,
      topBar } = this.props
    return (
      <div className='main-wrap'>
        <div className='board'>
          <div className={`board-top project color-${color}`}>
            <div className='board-top-inner'>
              <div className={`top-title lang-${lang}`}>
                {topBar['account_set'][lang]}
              </div>
            </div>
          </div>
          <div className='board-bottom account'>
            <Account_Top
              uid={uid}
              user={user}
              lang={lang}
              text={text}
              openUpdatePhotoBlock={this.openUpdatePhotoBlock} />
            <Account_Bottom
              uid={uid}
              user={user}
              lang={lang}
              text={text}
              updateUser={this.updateUser} />
          </div>
        </div>
        <PhotoUpdate_Pop
          preImg={preImg}
          updating={updating}
          lang={lang}
          text={text}
          photo_pop={photo_pop}
          closeUpdatePhotoBlock={this.closeUpdatePhotoBlock}
          setPreImg={this.setPreImg}
          updateUserPhoto={this.updateUserPhoto} />
        <SettingSuccess_Pop
          success_pop={success_pop}
          lang={lang}
          text={text}
          closeSuccessPupBlock={this.closeSuccessPupBlock}/>
      </div>
    )
  }
}

Account_page.propTypes = {
  lang: PropTypes.number,
  uid: PropTypes.string,
  user: PropTypes.object,
  color: PropTypes.string,
  topBar: PropTypes.object,
  dispatch: PropTypes.func
}

export default connect()(Account_page)