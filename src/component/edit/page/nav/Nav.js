import React, { Component } from 'react';
import { withRouter } from 'react-router';
import NavBar from './component/NavBar';
import MainMenu_Btn from './component/MainMenu_Btn';
import NavMenu_sm from '../../../shareComponent/NavMenu_sm';
import { nav } from '../../../../data/Content';

class Nav extends Component {
  state = {
    project: [],
    isOpening: false
  }
  toggleNavBar = () => this.setState({ isOpening: !this.state['isOpening'] })
  closeNavBar = () => this.setState({ isOpening: false })
  render() {
    const { dateId, projectId, list, basic, color, lang } = this.props
    const { project, isOpening } = this.state
    return (
      <div className='nav-wrap'>
        <NavBar
          isOpening={isOpening}
          project={project}
          projectId={projectId}
          dateId={dateId}
          list={list}
          basic={basic}
          color={color}
          lang={lang}
          closeNavBar={this.closeNavBar}
          nav={nav}
        />
        <MainMenu_Btn
          lang={lang}
          nav={nav} />
        <NavMenu_sm
          lang={lang}
          nav={nav}
          toggleNavBar={this.toggleNavBar}
        />
        <div
          className={`sm-layout ${isOpening&&'show'}`}
          onClick={this.closeNavBar}>
        </div>
      </div>
    )
  }
}

export default withRouter(Nav)