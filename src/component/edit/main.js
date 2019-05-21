import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom'
import Background_Loading from '../loading/Background_Loading';
import Basic from './page/01_basic/Basic';
import Plan from './page/02_Plan/Plan';
import Budget from './page/03_budget/Budget';
import Nav from './page/nav/Nav';
import { asyncGetProjectDayID, asyncGetProjectBasic, } from '../../action/itinerary';
import { asyncGetUserDetail, getLangFromCookie } from '../../action/user';
import { checkLogInStatus, getQueryId } from '../base';

class MainWrap extends Component {
  state = {
    projectId: null,
    dateId: null,
  }
  //取得行程的所有天數時間
  getTimeList = (list) => {
    let timeList = list
    timeList = 
      timeList.map(el => el.item)
              .map(el => el.time)
              .map(el => new Date(el.seconds * 1000))
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
  findSameDay = (originDate, inputDate) => {
    let date = inputDate
    let flag = false
    date = {
      y: date.getFullYear(),
      m: date.getMonth(),
      d: date.getDate()
    }
    originDate.forEach(el => {
      if (el.y === date.y && el.m === date.m && el.d === date.d) {
        alert('Same Day');
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
  checkLogInCallback = (uid) => {
    const { dispatch } = this.props
    const { projectId } = this.state
    dispatch(asyncGetProjectBasic(projectId))
    dispatch(asyncGetProjectDayID(projectId))
    dispatch(asyncGetUserDetail(uid))
  }
  componentDidMount() {
    const { projectId , dateId } = getQueryId()
    this.setState({ projectId, dateId})
    this.props.dispatch(getLangFromCookie())
    checkLogInStatus(this.checkLogInCallback)
  }
  render() {
    const path = this.props.match.path
    const { projectId, dateId } = this.state
    const { list, basic, user, lang } = this.props
    if (list && user && basic) {
      const color = user.color
      return (
        <>
          <Nav
            lang={lang}
            color={color}
            projectId={projectId}
            dateId={dateId}
            list={list}
            basic={basic}
          />
          <Route
            exact path={path}
            render={() => <Redirect to={`${path}/basic`} />} />
          <Route
            path={`${path}/basic`}
            render={() =>
              <Basic
                lang={lang}
                color={color}
                user={user}
                projectId={projectId} 
              />} 
          />
          <Route
            path={`${path}/itinerary/:step`}
            render={() =>
              < Plan
                lang={lang}
                color={color}
                p_route={this.props}
                list={list}
                basic={basic}
                getTimeList={this.getTimeList}
                findSameDay={this.findSameDay}
                findMaxTime={this.findMaxTime}
                findMinTime={this.findMinTime}
              />} 
          />
          <Route
            path={`${path}/budget/:cata`}
            render={() =>
              <Budget
                lang={lang}
                color={color}
                user={user}
                projectId={projectId}
                dateId={dateId}
                basic={basic}
                route={this.props}
                getTimeList={this.getTimeList}
                findSameDay={this.findSameDay}
              />} 
          />
        </>
      )
    }
    else return (<Background_Loading />)
  }
}

const mapStateToProps = (state) => {
  return {
    list: state.itinerary.projectDayIdList,
    basic: state.itinerary.projectBasic,
    user: state.user.user,
    lang: state.user.lang
  }
}

MainWrap.propTypes = {
  list: PropTypes.array, 
  basic: PropTypes.object, 
  user: PropTypes.object, 
  lang: PropTypes.number,
  dispatch: PropTypes.func,
  match: PropTypes.object
}

export default withRouter(connect(mapStateToProps)(MainWrap))


