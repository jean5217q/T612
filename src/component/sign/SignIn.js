//env
import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { sign_text } from '../../data/Content';
import { connect } from 'react-redux';
import { getLangFromCookie } from '../../action/user';

class SignIn extends Component {
  state = {
    email: '',
    pwd: ''
  }
  //取得email輸入值
  setEmail = (e) => {
    this.setState({
      email: e.target.value
    })
  }
  //取得密碼輸入值
  setPwd = (e) => {
    this.setState({
      pwd: e.target.value
    })
  }
  setBase = (uid,email,name) => {
    const db = firebase.firestore();
    db.collection("user").doc(uid).set({
      name: name,
      email: email,
      img: '',
      language: 'English',
      currency: 'TWD',
      color: 'a'
    })
  }
  // google登入
  signInGoogle = () => {
    var provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider)
    .then(res => {
      const email = res.user.providerData[0].email
      const name = res.user.providerData[0].displayName
      const uid = res.user.uid
      const db = firebase.firestore();
      db.collection("user").doc(uid).get()
      .then(doc =>{
        if (doc.exists) {
          this.props.history.push('/select_page');
        } 
        else {
          this.setBase(uid,email,name);
          this.props.history.push('/select_page');
        }  
      })
    })
    .catch(error => {console.log(error)})
  }
  // 一般登入
  signInNative = () => {
    const { email, pwd } = this.state
    if (email === '' || pwd === '') {
      alert('wrong info')
      return
    }
    firebase.auth().signInWithEmailAndPassword(email, pwd)
      .then(res => {
        this.props.history.push('/select_page')
      })
      .catch(error => {
        alert(error.message)
      })
  }
  componentDidMount() {
    this.props.dispatch(getLangFromCookie())
    //如果已經登入重新導向
    firebase.auth().onAuthStateChanged(user => {
      if (user) this.props.history.push('/select_page')
    })
  }
  render() {
    const { lang } = this.props
    return (
      <div className='all-container sign'>
        <div className='home-page-logo'></div>
        <div className='sign-box'>
          <div className='sign-box-inner'>
            {/* title */}
            <div className='sign-group'>
              <div className='sign-title'>{sign_text['signIn'][lang]}</div>
            </div>
            <div className='sign-group'>
              {/* 帳戶 */}
              <div className='sign-block'>
                <input
                  className='sign-input'
                  placeholder='Email'
                  onChange={this.setEmail} />
              </div>
              {/* 密碼 */}
              <div className='sign-block'>
                <input
                  className='sign-input'
                  placeholder='Password'
                  onChange={this.setPwd} />
              </div>
              {/* native */}
              <div className='sign-block'>
                <div
                  className='sign-btn native'
                  onClick={this.signInNative}>{sign_text['signIn'][lang]}</div>
              </div>
            </div>
            {/* google */}
            <div className='or-text'>{sign_text['or'][lang]}</div>
            <div className='sign-group'>
              <div
                className='sign-btn google'
                onClick={this.signInGoogle}>{sign_text['signIn_google'][lang]}</div>
            </div>
            <NavLink
              className='sign-side-text'
              to='/signup'>{sign_text['signUp'][lang]}
            </NavLink>
          </div>
        </div>
      </div>
    )
  }
}


const mapStateToProps = (state) => {
  let lang = state.user.lang
  return {
    lang
  }
}
export default connect(mapStateToProps)(SignIn)