
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import Nav_Bar from './component/Nav_Bar';
import NavMenu_sm from '../../shareComponent/NavMenu_sm';
import { nav } from '../../../data/Content';

class Nav extends Component {
  state = {
    isNav: false
  }
  toggleNavBar = () => this.setState({ isNav: !this.state['isNav'] })
  closeNav = () => this.setState({ isNav: false })
  render() {
    const { color, lang } = this.props
    const { isNav } = this.state
    return (
      <div
        className='nav-wrap'>
        <Nav_Bar
          color={color}
          lang={lang}
          isNav={isNav}
          closeNav={this.closeNav} />
        <NavMenu_sm
          toggleNavBar={this.toggleNavBar}
          nav={nav}
        />
        <div
          className={`sm-layout ${isNav&&'show'}`}
          onClick={this.toggleNavBar}>
        </div>
      </div>
    )
  }
}

Nav.propTypes = {
  color: PropTypes.string, 
  lang: PropTypes.number, 
}

export default withRouter(Nav)