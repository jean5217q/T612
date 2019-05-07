//env
import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import Account_page from './elem/account/Account_page';
import Project_Main_page from './elem/project/Project_main_page';
import Bg_Loading from '../loading/Bg_Loading';
import {
  asyncGetProjectAll
} from '../../action/itinerary';
import { asyncGetUserDetail, getLangFromCookie } from '../../action/user';
import { checkLogInStatus } from '../base';
import Nav from './elem/nav/Nav';
import { topBar } from '../../data/Content'


class Profile extends Component {
  state = {
    projectId: null,
    uid: ''
  }
  callback = (uid) => {
    const { dispatch } = this.props
    dispatch(asyncGetProjectAll(uid))
    dispatch(asyncGetUserDetail(uid))
    dispatch(getLangFromCookie())
    this.setState({ uid: uid })
  }
  componentWillMount() {
    checkLogInStatus(this.callback)
  }
  render() {
    const { allProject, user, lang } = this.props
    const { uid } = this.state
    const path = this.props.match.path
    if (allProject && user) {
      const color = user.color
      return (
        <main className='edit-page-wrap'>
          <Nav
            color={color}
            lang={lang} />
          <Route
            exact
            exact path={path}
            render={() =>
              <Redirect to={`${path}/project/ongoing`} />} />
          <Route
            path={`${path}/account`}
            render={() =>
              <Account_page
                lang={lang}
                uid={uid}
                user={user}
                color={color}
                topBar={topBar} />} />
          <Route
            path={`${path}/project/:type`}
            render={() =>
              <Project_Main_page
                lang={lang}
                list={allProject}
                color={color}
                uid={uid}
                topBar={topBar} />} />
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
  let allProject = state.itinerary.projectAll
  let user = state.user.user
  user = JSON.stringify(user) !== '{}' ? user : null
  return {
    allProject: allProject,
    user: user,
    lang: state.user.lang
  }
}
export default connect(mapStateToProps)(Profile)