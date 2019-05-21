import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Planet from './component/Planet';
import Heading from './component/Heading';
import Header from './component/Header';
import { homepage } from '../../data/Content';
import { getLangFromCookie } from '../../action/user';

class Home extends Component {
  state = {
    mouseX: null,
    mouseY: null,
    siteTag: false
  }
  changeLanguage = (num) => {
    document.cookie = `language = ${num}`
    this.props.dispatch(getLangFromCookie())
  }
  moveCircleMouse = (e) => {
    this.setState({mouseX: e.clientX,mouseY: e.clientY})
  }
  addSiteTag = () => this.setState({ siteTag: true })
  removeSiteTag = (e) => {
    if (!e.target.classList.contains('check-site')) {
      this.setState({
        siteTag: false
      })
    }
  }
  start = () => {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.props.history.push('./select')
      }
      else {
        this.props.history.push('./signin')
      }
    })
  }
  componentDidMount() {
    document.addEventListener('mousemove',this.moveCircleMouse)
  }
  componentWillUnmount() {
    document.removeEventListener('mousemove',this.moveCircleMouse)
  }
  render() {
    const { mouseX, mouseY, siteTag } = this.state
    const { lang } = this.props
    return (
      <div 
        className="page-container gradient-background"
        onMouseOver={this.removeSiteTag}>
        <Header
          lang={lang}
          changeLanguage={this.changeLanguage} />
        <main
          className="home-content-wrap"
          onMouseOver={this.removeSiteTag}>
          <Heading
            homepage={homepage}
            lang={lang}
            start={this.start} />
        </main>
        <Planet
            addSiteTag={this.addSiteTag}
            removeSiteTag={this.removeSiteTag} />
        <div 
          className={`mouse ${siteTag && 'site'} check-site`}
          style={{left: `${mouseX}px`,top: `${mouseY}px`}}>
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

Home.propTypes = {
  lang: PropTypes.number, 
  dispatch: PropTypes.func,
  history: PropTypes.object
}

export default connect(mapStateToProps)(Home)