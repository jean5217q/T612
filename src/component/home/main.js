import React, { Component } from 'react';
import { connect } from 'react-redux';

import Circle from './Circle';
import Title from './Title';
import Header from './Header';
import Sm_Cricle from './Sm_Circle';
import { homepage } from '../../data/Content';
import { getLangFromCookie } from '../../action/user';


class Home extends Component {
  state = {
    siteTag: false
  }
  changeLanguage = (num) => {
    document.cookie = `language = ${num}`
    this.props.dispatch(getLangFromCookie())
  }
  start = () => {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.props.history.push('./select_page')
      }
      else {
        this.props.history.push('./signin')
      }
    })
  }
  componentDidMount() {
    const m = document.querySelector('.mouse')
    window.addEventListener('mousemove', function (e) {
      m.style.left = `${e.pageX}px`
      m.style.top = `${e.pageY}px`

      //   if (e.target.classList.contains('check-site')) {
      //     m.classList.add('site')
      //   }
      //   else if (e.target.classList.contains('content-container')) {
      //     m.classList.remove('site')
      //   }
    })
  }
  addSiteTag = () => this.setState({ siteTag: true })
  removeSiteTag = (e) => {
    console.log('ss')
    if (!e.target.classList.contains('check-site')) {
      this.setState({
        siteTag: false
      })
    }
  }
  render() {
    const { lang } = this.props
    return (
      <div className="all-container home">
        <Header
          lang={lang}
          changeLanguage={this.changeLanguage} />
        <main
          className="content-container home"
          onMouseOver={this.removeSiteTag}>
          <Title
            start={this.start}
            homepage={homepage}
            lang={lang} />
          <Circle
            addSiteTag={this.addSiteTag}
            removeSiteTag={this.removeSiteTag} />
          <Sm_Cricle />
        </main>
        <div className={`mouse ${this.state.siteTag && 'site'}`}></div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return { lang: state.user.lang }
}
export default connect(mapStateToProps)(Home)