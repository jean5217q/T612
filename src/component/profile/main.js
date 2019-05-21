import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import Account from './page/account/Account';
import Project from './page/project/Project';
import Nav from './nav/Nav';
import Background_Loading from '../loading/Background_Loading';
import { asyncGetAllProject } from '../../action/itinerary';
import { asyncGetUserDetail, getLangFromCookie } from '../../action/user';
import { checkLogInStatus } from '../base';
import { topBar } from '../../data/Content';


class Profile extends Component {
  state = {
    projectId: null,
    uid: '',
    project_status: ['ongoing','coming','completed']
  }
  logInCallback = (uid) => {
    const { dispatch } = this.props
    dispatch(asyncGetAllProject(uid))
    dispatch(asyncGetUserDetail(uid))
    this.setState({ uid: uid })
  }
  componentDidMount(){
    const { dispatch } = this.props
    dispatch(getLangFromCookie())
    checkLogInStatus(this.logInCallback)
  }
  render() {
    const { allProject, user, lang } = this.props
    const { uid,project_status } = this.state
    const path = this.props.match.path
    if (allProject && user) {
      const color = user.color
      return (
        <main className='edit-page-wrap'>
          <Nav
            lang={lang}
            color={color} />
          <Route
            exact path={path}
            render={() =>
              <Redirect to={`${path}/account`} />} />
          <Route
            path={`${path}/account`}
            render={() =>
              <Account
                lang={lang}
                uid={uid}
                user={user}
                color={color}
                topBar={topBar} />} />
          {
            project_status.map((status,index)=>
            <Route
              key={index}
              path={`/profile/project/${status}`}
              render={() =>
                <Project
                  status={status}
                  uid={uid}
                  lang={lang}
                  color={color}
                  list={allProject}
                  topBar={topBar} />} 
              />
            )
          }
        </main>
      )
    }
    else return (<Background_Loading />)
  }
}

const mapStateToProps = (state) => {
  return {
    allProject: state.itinerary.allProject,
    user: state.user.user,
    lang: state.user.lang
  }
}

Profile.propTypes = {
  lang: PropTypes.number,
  allProject: PropTypes.array,
  user: PropTypes.object,
  dispatch: PropTypes.func,
  match: PropTypes.object,
}

export default connect(mapStateToProps)(Profile)