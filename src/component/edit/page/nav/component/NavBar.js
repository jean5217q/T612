import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Plan_NavLink from './Plan_NavLink';
import Lang_Btn from '../../../../shareComponent/Lang_Btn';
import { getLangFromCookie } from '../../../../../action/user';
import { nav } from '../../../../../data/Content';

class NavBar extends Component {
  state = {
    planNavHeight: null,
    planIsShowing: false,
    budgetIsShowing: false
  }
  changeLanguage = (num) => {
    const { closeNavBar, dispatch } = this.props
    document.cookie = `language = ${num}`
    this.setState({ budgetIsShowing: false, planIsShowing: false })
    closeNavBar()
    dispatch(getLangFromCookie())
  }
  togglePlan = () => {
    this.setState({
      planIsShowing: !this.state['planIsShowing'],
      budgetIsShowing: false 
    })
  }
  toggleBudget = () => {
    this.setState({
      budgetIsShowing: !this.state['budgetIsShowing'],
      planIsShowing: false
    })
  }
  closeAllDropDown = () => {
    this.props.closeNavBar()
    this.setState({
      planIsShowing: false,
      budgetIsShowing: false
    })
  }
  calcPlanNavHeight = () => {
    const windowWidth = window.innerWidth
    if (windowWidth >= 768) return 55
    else return 50
  }
  componentDidMount() {
    this.setState({ planNavHeight: this.calcPlanNavHeight() })
    window.onresize = () => {
      this.setState({ planNavHeight: this.calcPlanNavHeight() })
    }
  }
  render() {
    const {
      planIsShowing,
      budgetIsShowing,
      planNavHeight
    } = this.state

    let {
      lang,
      color,
      projectId,
      isOpening,
      list,
      closeNavBar
    } = this.props

    const planDropStyle = {
      height: `${(list.length + 1) * planNavHeight}px`,
      maxHeight: `${3 * planNavHeight}px`,
      transition: '0.2s ease-in',
      overflowY: 'scroll'
    }
    return (
      <nav
        className={`left-nav-wrap ${isOpening&&'show'} color-${color} lang-${lang}`}>
        <div className='web-logo-simplify'></div>
        <ul className='nav-list'>
          {/* basic */}
          <li className='nav-item'>
            <NavLink
              to={{
                pathname: "/edit/basic",
                search: `?project=${projectId}`
              }}
              onClick={this.closeAllDropDown}
              className={`nav-link nav-link-${lang}`}>
              {nav['basic'][lang]}
            </NavLink>
          </li>
          <li
            className='nav-item'
            onClick={this.togglePlan}>
            <div className={`nav-link nav-link-${lang}`}>
              {nav['plan'][lang]}
            </div>
            <i
              className='fas fa-caret-down nav-link-down'
              onClick={this.togglePlan}>
            </i>
          </li>
          {/* planItem */}
          <ul
            className={`sub-nav-list itinerary color-${color}-dark`}
            style={planIsShowing?planDropStyle:null}>
            <NavLink
              to={{
                pathname: "/edit/itinerary/overview",
                search: `?project=${projectId}`
              }}
              onClick={closeNavBar}
              className='sub-nav-link'>
              {nav['p_overView'][lang]}
            </NavLink>
            {list && 
              list.map((date, index) =>
                <Plan_NavLink
                  id={date.id}
                  key={index}
                  index={index}
                  date={date.item.time.seconds}
                  projectId={projectId}
                  closeNavBar={closeNavBar}
                />)
            }
          </ul>
          {/* budget */}
          <li
            className='nav-item budget'
            onClick={this.toggleBudget}>
            <div className={`nav-link nav-link-${lang}`} id='test-budget-btn'>
              {nav['budget'][lang]}
            </div>
            <i
              className='fas fa-caret-down nav-link-down'
              onClick={this.toggleBudget}>
            </i>
          </li>
          <ul className={`sub-nav-list budget color-${color}-dark ${budgetIsShowing&&'style'}`}>
            <NavLink
              to={{
                pathname: "/edit/budget/all",
                search: `?project=${projectId}`
              }}
              className='sub-nav-link'
              onClick={closeNavBar}>
              {nav['b_overview'][lang]}
            </NavLink>
            <NavLink
              to={{
                pathname: "/edit/budget/analysis",
                search: `?project=${projectId}`
              }}
              className='sub-nav-link'
              onClick={closeNavBar}>
              {nav['analysis'][lang]}
            </NavLink>
          </ul>
        </ul>
        < Lang_Btn
          lang={lang}
          changeLanguage={this.changeLanguage} />
      </nav>
    )
  }
}

NavBar.propTypes = {
  lang: PropTypes.number, 
  color: PropTypes.string,
  projectId: PropTypes.string,
  isOpening: PropTypes.bool,
  list: PropTypes.array,
  closeNavBar: PropTypes.func,
  dispatch: PropTypes.func
}

export default withRouter(connect()(NavBar))