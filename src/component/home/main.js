import React, { Component } from 'react';
import { connect } from 'react-redux';
import Planet from './component/Planet';
import Heading from './component/Heading';
import Header from './component/Header';
import CountryCircle from './component/CountryCircle';
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
      <div className="all-container home">
        <Header
          lang={lang}
          changeLanguage={this.changeLanguage} />
        <main
          className="content-container home"
          onMouseOver={this.removeSiteTag}>
          <Heading
            homepage={homepage}
            lang={lang} />
          <Planet
            addSiteTag={this.addSiteTag}
            removeSiteTag={this.removeSiteTag} />
          <CountryCircle />
        </main>
        <div 
          className={`mouse ${siteTag && 'site'}`}
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

export default connect(mapStateToProps)(Home)