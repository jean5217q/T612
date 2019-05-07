//env
import React, { Component } from 'react';
import { withRouter } from 'react-router';
//component
import Lg_Profile_Btn from './lg/Lg_Profile_Btn';
import Sm_Nav_Bottom from './sm/Sm_Nav_Bottom';
import Share_Nav from './Share_Nav';
import { nav } from '../../../../../data/Content';

class Nav extends Component {
  state = {
    project: [],
    nav_open: false
  }
  //控制導覽列開合
  showSideNav = () => {
    this.setState({
      nav_open: !this.state['nav_open']
    })
  }
  closeNav = () => {
    this.setState({
      nav_open: false
    })
  }
  render() {
    const { dateId, projectId, list, basic, p_route, color, lang } = this.props
    const { project, nav_open } = this.state
    return (
      <div className='nav-wrap'>
        <Share_Nav
          open={nav_open}
          project={project}
          projectId={projectId}
          dateId={dateId}
          list={list}
          basic={basic}
          color={color}
          lang={lang}
          closeNav={this.closeNav}
          nav={nav}
        />
        <Lg_Profile_Btn
          p_route={p_route}
          lang={lang}
          nav={nav} />
        <Sm_Nav_Bottom
          showSideNav={this.showSideNav}
          lang={lang}
          nav={nav}
        />
        <div
          className={`sm-layout ${nav_open ? 'show' : null}`}
          onClick={this.showSideNav}>
        </div>
      </div>
    )
  }
}



export default withRouter(Nav)