//env
import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import Itinerary_Nav from './Itinerary_Nav';
import { nav } from '../../../../../data/Content';
import Language_btn from '../../../../share/Language_btn';
import { getLangFromCookie } from '../../../../../action/user';


class Share_Nav extends Component {
  state = {
    size: null,
    showPlan: false,
    showBudget: false
  }
  changeLanguage = (num) => {
    const { closeNav, dispatch } = this.props
    document.cookie = `language = ${num}`
    this.setState({ showBudget: false, showPlan: false })
    closeNav()
    dispatch(getLangFromCookie())
  }
  //開關行程列表
  tooglePlan = () => {
    this.setState({
      showPlan: !this.state['showPlan']
    }, () => {
      const { showPlan } = this.state
      if (showPlan) {
        this.setState({
          showBudget: false
        })
      }
    })
  }
  //開關預算列表
  toogleBudget = () => {
    this.setState({
      showBudget: !this.state['showBudget']
    }, () => {
      const { showBudget } = this.state
      if (showBudget) {
        this.setState({
          showPlan: false
        })
      }
    })
  }
  basicClosed = () => {
    const { closeNav } = this.props
    closeNav()
    this.setState({
      showPlan: false,
      showBudget: false
    })
  }
  calcNavHeight = () => {
    const w = window.innerWidth
    if (w >= 768) return 55
    else return 50
  }
  componentDidMount() {
    this.setState({ size: this.calcNavHeight() })
    window.onresize = () => {
      this.setState({ size: this.calcNavHeight() })
    }
  }
  render() {
    const {
      showPlan,
      showBudget,
      size
    } = this.state

    let {
      open,
      projectId,
      list,
      color,
      lang,
      closeNav
    } = this.props
    const style = {
      height: `${(list.length + 1) * size}px`,
      maxHeight: `${3 * size}px`,
      transition: '0.2s ease-in',
      overflowY: 'scroll'
    }
    return (
      <nav
        className={`left-nav-wrap ${open ? 'show' : null} color-${color} lang-${lang}`}>
        <div className='web-logo-simplify'></div>
        <ul className='nav-list'>
          {/* 基本資訊 */}
          <li className='nav-item'>
            <NavLink
              to={{
                pathname: "/edit/basic",
                search: `?project=${projectId}`
              }}
              onClick={this.basicClosed}
              className={`nav-link nav-link-${lang}`}>
              {nav['basic'][lang]}
            </NavLink>
          </li>
          {/* 行程 */}
          <li
            className='nav-item'
            onClick={this.tooglePlan}>
            <div className={`nav-link nav-link-${lang}`}>
              {nav['plan'][lang]}</div>
            <i
              className='fas fa-caret-down nav-link-down'
              onClick={this.tooglePlan}></i>
          </li>
          {/* 行程子代 */}
          <ul
            className={`sub-nav-list itinerary color-${color}-dark`}
            style={showPlan ? style : null}>
            <NavLink
              to={{
                pathname: "/edit/itinerary/overview",
                search: `?project=${projectId}`
              }}
              onClick={closeNav}
              className='sub-nav-link'>
              {nav['p_overView'][lang]}
            </NavLink>
            {list ?
              list.map((date, index) =>
                <Itinerary_Nav
                  id={date.id}
                  key={index}
                  test={index}
                  date={date.item.time.seconds}
                  projectId={projectId}
                  closeNav={closeNav}
                />
              )
              : null
            }
          </ul>
          {/* 預算 */}
          <li
            className='nav-item'
            onClick={this.toogleBudget}>
            <div className={`nav-link nav-link-${lang}`}>
              {nav['budget'][lang]}</div>
            <i
              className='fas fa-caret-down nav-link-down'
              onClick={this.toogleBudget}></i>
          </li>
          <ul className={`sub-nav-list budget color-${color}-dark ${showBudget ? 'style' : null}`}>
            <NavLink
              to={{
                pathname: "/edit/budget/all",
                search: `?project=${projectId}`
              }}
              className='sub-nav-link'
              onClick={closeNav}>
              {nav['b_overview'][lang]}
            </NavLink>
            <NavLink
              to={{
                pathname: "/edit/budget/analysis",
                search: `?project=${projectId}`
              }}
              className='sub-nav-link'
              onClick={closeNav}>
              {nav['analysis'][lang]}
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
