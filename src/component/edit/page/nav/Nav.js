import React, { Component } from 'react';
import PropTypes from 'prop-types';
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
    const { 
      lang,
      color,
      dateId, 
      projectId, 
      list, 
      basic
     } = this.props
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

Nav.propTypes = {
  lang: PropTypes.number,
  color: PropTypes.string,
  dateId: PropTypes.string, 
  projectId: PropTypes.string, 
  list: PropTypes.array, 
  basic: PropTypes.object
}

export default withRouter(Nav)