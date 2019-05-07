//env
import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom'
import { asyncGetProjectDayID, asyncGetProjectBasic, } from '../../action/itinerary';
import { asyncGetUserDetail, getLangFromCookie } from '../../action/user';
import { getItineraryQuery, checkLogInStatus } from '../base';
import Bg_Loading from '../loading/Bg_Loading';
//component
import Basic from './page/01_basic/Basic';
import Itinerary from './page/02_itinerary/Itinerary';
import Budget from './page/03_budget/Budget';

import Nav from './page/xx_share/nav/Nav';

class Edit extends Component {
  state = {
    projectId: null,
    dateId: null,
    countryId: null
  }
  //紀錄route參數
  setQueryId = () => {
    let { location } = this.props
    let { search } = location
    search = search.split('?')[1].split('&')
    let projectId = null
    let dateId = null
    let countryId = null
    search.forEach(el => {
      if (el.indexOf('project') !== -1) projectId = el.split('=')[1]
      if (el.indexOf('date') !== -1) dateId = el.split('=')[1]
      if (el.indexOf('country') !== -1) countryId = el.split('=')[1].split('+').splice(1)
    })
    this.setState({
      projectId,
      dateId,
      countryId
    })
  }
  //取得已經慛在的時間
  getCurrentTimeArr = (list) => {
    let timeList = list
    timeList = timeList.map(el => el.item).map(el => el.time).map(el => new Date(el.seconds * 1000))
    timeList = timeList.map(el => {
      return {
        y: el.getFullYear(),
        m: el.getMonth(),
        d: el.getDate()
      }
    })
    return timeList
  }
  //比較輸入時間與已經有的時間
  compareTime = (originDate, inputDate) => {
    let date = inputDate
    let flag = false
    date = {
      y: date.getFullYear(),
      m: date.getMonth(),
      d: date.getDate()
    }
    originDate.forEach(el => {
      if (el.y === date.y && el.m === date.m && el.d === date.d) {
        alert('same day');
        flag = true
      }
    })
    return flag
  }
  //判斷是否為最大時間
  findMaxTime = (originDate, inputDate) => {
    let date = inputDate
    let flag = false
    date = inputDate.getTime()
    originDate.forEach(el => {
      if (date > el) flag = true
    })
    return flag
  }
  //判斷是否為最小時間
  findMinTime = (originDate, inputDate) => {
    let date = inputDate
    let flag = false
    date = inputDate.getTime()
    if (date < originDate[0]) flag = true
    return flag
  }
  callback = (uid) => {
    const { dispatch } = this.props
    const { projectId } = this.state
    dispatch(asyncGetProjectBasic(projectId))
    //取得project總天數
    dispatch(asyncGetProjectDayID(projectId))
    //user
    dispatch(asyncGetUserDetail(uid))
  }
  componentDidMount() {
    const { dispatch } = this.props
    this.setQueryId()
    dispatch(getLangFromCookie())
    checkLogInStatus(this.callback)
  }
  componentWillUnmount() {
    // this.props.dispatch(removeBudgetAllDay())
  }
  render() {
    const path = this.props.match.path
    const { projectId, dateId, countryId } = this.state
    const { list, basic, user, lang } = this.props
    if (list && user && basic) {
      const color = user.color
      return (
        <main className='edit-page-wrap'>
          <Nav
            p_route={this.props}
            projectId={projectId}
            dateId={dateId}
            list={list}
            basic={basic}
            color={color}
            lang={lang} />
          <Route
            exact
            exact path={path}
            render={() => <Redirect to={`${path}/basic`} />} />
          <Route
            path={`${path}/basic`}
            render={() =>
              <Basic
                projectId={projectId}
                countryId={countryId}
                user={user}
                color={color}
                lang={lang}
              />} />
          <Route
            path={`${path}/itinerary/:step`}
            render={() =>
              <Itinerary
                p_route={this.props}
                list={list}
                basic={basic}
                getCurrentTimeArr={this.getCurrentTimeArr}
                compareTime={this.compareTime}
                findMaxTime={this.findMaxTime}
                findMinTime={this.findMinTime}
                color={color}
                lang={lang} />} />
          <Route
            path={`${path}/budget/:cata`}
            render={() =>
              <Budget
                projectId={projectId}
                dateId={dateId}
                route={this.props}
                getCurrentTimeArr={this.getCurrentTimeArr}
                compareTime={this.compareTime}
                color={color}
                lang={lang}
                basic={basic}
                user={user}
              />} />
        </main>
      )
    }
    else {
      return (
        <Bg_Loading />
      )
    }
  }
}

const mapStateToProps = (state) => {
  let list = state.itinerary.projectDayIdList
  let basic = state.itinerary.projectBasic
  let user = state.user.user
  user = JSON.stringify(user) !== '{}' ? user : null
  basic = JSON.stringify(basic) !== "{}" ? basic : null
  return {
    list: list,
    basic: basic,
    user: user,
    lang: state.user.lang
  }
}

export default withRouter(connect(mapStateToProps)(Edit))


