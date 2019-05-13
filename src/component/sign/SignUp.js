import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { sign_text } from '../../data/Content';
import { getLangFromCookie } from '../../action/user';

class SignUp extends Component {
  state = {
    email: '',
    pwd: '', 
  }
  inputRef = React.createRef()
  setEmail = (e) => this.setState({email: e.target.value})
  setPwd = (e) => this.setState({pwd: e.target.value})
  focusInput = () => this.inputRef.current.focus()
  // 將用戶資料寫入到資料庫
  setBase = (uid,email,name) => {
    const db = firebase.firestore();
    db.collection("user").doc(uid).set({
      name: name,
      email: email,
      img: '',
      currency: 'TWD',
      color: 'a'
    })
  }
  // Google註冊登入
  signUpGoogle = () => {
    var provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider)
    .then(res => {
      const email = res.user.providerData[0].email
      const name = res.user.providerData[0].displayName
      const uid = res.user.uid
      const db = firebase.firestore();
      db.collection("user").doc(uid).get()
      .then(doc =>{
        //資料庫有資料不初始化
        if (doc.exists) {
          this.props.history.push('/signin');
        } 
        else {
          this.setBase(uid, email, name);
          this.props.history.push('/signin');
          }  
        })
      })
      .catch(error => alert(error))
    }
  // 一般註冊
  signUpNative = () => {
    //firebase提供自動判定輸入錯誤或為空的偵測
    const { email, pwd } = this.state
    firebase.auth().createUserWithEmailAndPassword(email, pwd)
      .then(res => {
        this.setBase(res.user.uid,email,null)
        this.props.history.push('/signin')
      })
      .catch(error => {
        alert(error.message)
      })
  }
  componentDidMount() {
    this.focusInput();
    // 如果已經登入重新導向
    this.props.dispatch(getLangFromCookie())
    firebase.auth().onAuthStateChanged(user => {
      if (user) this.props.history.push('/signin')
    })
  }
  render() {
    const { lang } = this.props
    const { email, pwd } = this.state
    return (
      <div className='all-container sign'>
        <div className='sign-box'>
          <div className='sign-box-inner'>
            <div className='sign-group'>
              <div className='sign-title'>
                {sign_text['signUp'][lang]}
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
                  onClick={this.signUpNative}>
                  {sign_text['signUp'][lang]}
                </div>
              </div>
            </div>
            <div className='or-text'>
              {sign_text['or'][lang]}
            </div>
            <div className='sign-group'>
              <div
                className='sign-btn google'
                onClick={this.signUpGoogle}>
                {sign_text['signUp_google'][lang]}
              </div>
            </div>
            <NavLink
              className='sign-side-text'
              to='/signin'>
              {sign_text['signIn'][lang]}
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
export default connect(mapStateToProps)(SignUp)