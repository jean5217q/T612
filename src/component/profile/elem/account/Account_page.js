import React, { Component } from 'react';
import User_Info from './User_info';
import User_setting from './User_setting';
import Popup from './Pop_up';
import Modify_pop from './Modify_pop';
import { connect } from 'react-redux';
import { asyncGetUserDetail } from '../../../../action/user';
import { topBar, account_text } from '../../../../data/Content';

const imgUrl = require('../../../../images/essential/camera.svg');

class Account_page extends Component {
  state = {
    popup: false,
    preImg: imgUrl,
    file: '',
    updating: false,
    modify_pop: false,
  }
  openPopUp = () => this.setState({ popup: true })
  closeModifyPup = () => this.setState({ modify_pop: false })
  closePopUp = () => {
    this.setState({
      popup: false,
      preImg: imgUrl,
      file: ''
    })
  }
  showPreImg = (e) => {
    const files = e.target.files
    const reader = new FileReader()
    reader.readAsDataURL(files[0]);
    reader.onload = (readerEvent) => {
      this.setState({
        preImg: readerEvent.target.result
      })
    }
    this.setState({
      file: files[0]
    })
  }
  updateFile = () => {
    const { uid, dispatch } = this.props
    const { file } = this.state
    if (file === '') return
    this.setState({
      updating: true
    })
    const storageRef = firebase.storage().ref()
    const uploadTask = storageRef.child('user/' + uid).put(file)
    uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
      (snapshot) => {
        var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
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
            const db = firebase.firestore();
            db.collection('user').doc(uid).update({ img: downloadURL })
              .then(() => {
                dispatch(asyncGetUserDetail(uid, this.updateFileCallBack))
              })
          })
      })
  }
  updateFileCallBack = () => {
    this.setState({
      updating: false,
      popup: false,
      preImg: imgUrl
    })
  }
  //更新個人資訊
  updatePersonal = (color, currency, lang, name) => {
    const { uid, dispatch } = this.props
    const db = firebase.firestore();
    db.collection('user').doc(uid).update({
      name: name,
      color: color,
      language: lang,
      currency: currency
    })
      .then(() => {
        this.setState({ modify_pop: true })
        dispatch(asyncGetUserDetail(uid))
      })
  }
  render() {
    const { updating, modify_pop } = this.state
    const { uid, user, color, lang } = this.props
    return (
      <div className='edit-main-wrap'>
        <div className='edit-list-wrap'>
          <div className={`list-top project color-${color}`}>
            <div className='list-top-inner'>
              <div className={`top-title lang-${lang}`}>
                {topBar['account_set'][lang]}
              </div>
            </div>
          </div>
          <div className='list-bottom account'>
            <User_Info
              uid={uid}
              openPopUp={this.openPopUp}
              user={user}
              lang={lang}
              account_text={account_text}
            />
            <User_setting
              uid={uid}
              user={user}
              lang={lang}
              account_text={account_text}
              updatePersonal={this.updatePersonal} />
          </div>
        </div>
        <Popup
          updating={updating}
          popup={this.state.popup}
          closePopUp={this.closePopUp}
          preImg={this.state.preImg}
          showPreImg={this.showPreImg}
          lang={lang}
          account_text={account_text}
          updateFile={this.updateFile} />
        <Modify_pop
          closeModifyPup={this.closeModifyPup}
          lang={lang}
          modify_pop={modify_pop}
          txt={account_text}
        />
      </div>
    )
  }
}
export default connect()(Account_page)