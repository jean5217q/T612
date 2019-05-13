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
  inputRef = React.createRef()
  setEmail = (e) => this.setState({ email: e.target.value })
  setPwd = (e) => this.setState({ pwd: e.target.value })
  focusInput = () => this.inputRef.current.focus()
  setBase = (uid, email, name) => {
    const db = firebase.firestore();
    db.collection("user").doc(uid).set({
      name: name,
      email: email,
      img: '',
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
          .then(doc => {
            //資料庫有資料不初始化
            if (!doc.exists) this.setBase(uid, email, name);
            this.props.history.push('/select');
          })
      })
      .catch(error => alert(error))
  }
  // 一般登入
  signInNative = () => {
    const { email, pwd } = this.state
    firebase.auth().signInWithEmailAndPassword(email, pwd)
      .then(res => {
        this.props.history.push('/select')
      })
      .catch(error => {
        alert(error.message)
      })
  }
  componentDidMount() {
    this.focusInput();
    this.props.dispatch(getLangFromCookie())
    //如果已經登入重新導向
    firebase.auth().onAuthStateChanged(user => {
      if (user) this.props.history.push('/select')
    })
  }
  render() {
    const { email, pwd } = this.state
    const { lang } = this.props
    return (
      <div className='all-container sign'>
        <div className='sign-box'>
          <div className='sign-box-inner'>
            <div className='sign-group'>
              <div className='sign-title'>
                {sign_text['signIn'][lang]}
              </div>
            </div>
            <div className='sign-group'>
              <div className='sign-block'>
                <input
                  className='sign-input'
                  placeholder='Email'
                  value={email}
                  ref={this.inputRef}
                  onChange={this.setEmail} />
              </div>
              <div className='sign-block'>
                <input
                  className='sign-input'
                  placeholder={sign_text['password'][lang]}
                  value={pwd}
                  onChange={this.setPwd} />
              </div>
              <div className='sign-block'>
                <div
                  className='sign-btn native'
                  onClick={this.signInNative}>
                  {sign_text['signIn'][lang]}
                </div>
              </div>
            </div>
            <div className='or-text'>
              {sign_text['or'][lang]}
            </div>
            <div className='sign-group'>
              <div
                className='sign-btn google'
                onClick={this.signInGoogle}>
                {sign_text['signIn_google'][lang]}
              </div>
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
  return {
    lang: state.user.lang
  }
}
export default connect(mapStateToProps)(SignIn)