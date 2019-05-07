//env
import React, { Component } from 'react';
import { withRouter } from 'react-router';
//component
import Lg_Profile_Btn from './lg/Lg_Profile_Btn';
import Sm_Nav_Bottom from '../../../edit/page/xx_share/nav/sm/Sm_Nav_Bottom';
import Share_Nav from './Share_Nav';
import { nav } from '../../../../data/Content'

class Nav extends Component {
  state = {
    nav_open: false
  }
  //控制導覽列開合
  showSideNav = () => this.setState({ nav_open: !this.state['nav_open'] })
  closeNav = () => this.setState({ nav_open: false })

  render() {
    const { color, lang } = this.props
    const { nav_open } = this.state
    return (
      <div
        className='nav-wrap'>
        <Share_Nav
          color={color}
          lang={lang}
          open={nav_open}
          closeNav={this.closeNav} />
        {/* <Lg_Profile_Btn /> */}
        <Sm_Nav_Bottom
          showSideNav={this.showSideNav}
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