//env
import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { nav } from '../../../../data/Content';
import Language_btn from '../../../share/Language_btn';
import { getLangFromCookie } from '../../../../action/user';

class Share_Nav extends Component {
  state = {
    showProject: false,
  }
  changeLanguage = (num) => {
    const { closeNav, dispatch } = this.props
    document.cookie = `language = ${num}`
    this.setState({ showProject: false })
    closeNav()
    dispatch(getLangFromCookie())
  }
  toogleIProject = () => this.setState({ showProject: !this.state['showProject'] })
  projectClosed = () => {
    const { closeNav } = this.props
    this.setState({ showProject: false })
    closeNav()
  }
  render() {
    const { showProject } = this.state
    const { color, lang, open, closeNav } = this.props
    return (
      <nav
        className={`left-nav-wrap ${open ? 'show' : null} color-${color} lang-${lang}`}>
        <div className='web-logo-simplify'></div>
        <ul className='nav-list'>
          {/* 基本資訊 */}
          <li className='nav-item'>
            <NavLink
              to='/profile/account'
              className={`nav-link nav-link-${lang}`}
              onClick={this.projectClosed}>
              {nav['account'][lang]}
            </NavLink>
          </li>
          <li
            className='nav-item'
            onClick={this.toogleIProject}>
            <div className={`nav-link nav-link-${lang}`}>
              {nav['project'][lang]}
            </div>
            <i
              className='fas fa-caret-down nav-link-down'
              onClick={this.toogleIProject}></i>
          </li>
          <ul
            className={`sub-nav-list profile color-${color}-dark ${showProject ? 'style' : null}`}>
            <NavLink
              to="/profile/project/ongoing"
              className='sub-nav-link'
              onClick={closeNav}>
              {nav['ongoing'][lang]}
            </NavLink>
            <NavLink
              to="/profile/project/coming"
              className='sub-nav-link'
              onClick={closeNav}>
              {nav['coming'][lang]}
            </NavLink>
            <NavLink
              to="/profile/project/completed"
              className='sub-nav-link'
              onClick={closeNav}>
              {nav['completed'][lang]}
            </NavLink>
          </ul>
        </ul>
        <Language_btn
          lang={lang}
          changeLanguage={this.changeLanguage} />
      </nav>
    )
  }
}



export default withRouter(connect()(Share_Nav))
