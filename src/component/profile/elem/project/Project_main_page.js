import { Route, Redirect } from 'react-router-dom';
import React, { Component } from 'react';
import Project_page from './Project_page';
import { topBar } from '../../../../data/Content';

class Project_Main_page extends Component {
  render() {
    const { list, color, uid,lang,topBar } = this.props
    console.log(topBar)
    return (
      <div className='edit-main-wrap'>

        <Route
          path={`/profile/project/ongoing`}
          render={() =>
            <Project_page
              status='ongoing'
              list={list}
              color={color}
              uid={uid}
              lang={lang}
              topBar={topBar} />} />
        <Route
          path={`/profile/project/coming`}
          render={() =>
            <Project_page
              status='coming'
              list={list}
              color={color}
              uid={uid}
              lang={lang}
             topBar={topBar} />} />
        <Route
          path={`/profile/project/completed`}
          render={() =>
            <Project_page
              status='completed'
              list={list}
              color={color}
              uid={uid} 
              lang={lang}
             topBar={topBar}/>} />
        {/* < Propup_Delete /> */}
      </div>
    )
  }
}
export default Project_Main_page