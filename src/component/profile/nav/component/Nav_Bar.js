//env
import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import Lang_Btn from '../../../shareComponent/Lang_Btn';
import { getLangFromCookie } from '../../../../action/user';
import { nav } from '../../../../data/Content';

class Share_Nav extends Component {
  state = {
    projectDropDown: false,
    projectStatus: ['ongoing','coming','completed']
  }
  changeLanguage = (num) => {
    const { closeNav, dispatch } = this.props
    document.cookie = `language = ${num}`
    this.setState({ projectDropDown: false })
    closeNav()
    dispatch(getLangFromCookie())
  }
  toggleProjectDropDown = () => this.setState({ projectDropDown: !this.state['projectDropDown'] })
  closeProjectDropDown = () => {
    const { closeNav } = this.props
    this.setState({ projectDropDown: false })
    closeNav()
  }
  render() {
    const { projectDropDown, projectStatus } = this.state
    const { color, lang, isNav, closeNav } = this.props
    return (
      <nav
        className={`left-nav-wrap ${isNav&&'show'} color-${color} lang-${lang}`}>
        <div className='web-logo-simplify'></div>
        <ul className='nav-list'>
          <li className='nav-item'>
            <NavLink
              to='/profile/account'
              className={`nav-link nav-link-${lang}`}
              onClick={this.closeProjectDropDown}>
              {nav['account'][lang]}
            </NavLink>
          </li>
          <li
            className='nav-item'
            onClick={this.toggleProjectDropDown}>
            <div className={`nav-link nav-link-${lang}`}>
              {nav['project'][lang]}
            </div>
            <i
              className='fas fa-caret-down nav-link-down'
              onClick={this.toggleProjectDropDown}></i>
          </li>
          <ul
            className={`sub-nav-list profile color-${color}-dark ${projectDropDown&&'style'}`}>
            {
              projectStatus.map((status,index)=>
              <NavLink
                key={index}
                to={`/profile/project/${status}`}
                className='sub-nav-link'
                onClick={closeNav}>
                {nav[status][lang]}
              </NavLink>
              )
            }
          </ul>
        </ul>
        <Lang_Btn
          lang={lang}
          changeLanguage={this.changeLanguage} />
      </nav>
    )
  }
}

export default withRouter(connect()(Share_Nav))
