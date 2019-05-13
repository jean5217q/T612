import React, { Component } from 'react';

class Header extends Component {
  render() {
    const { lang, changeLanguage } = this.props
    return (
      <header>
        <div className="header-inner">
          <div className="main-logo"></div>
          <div className='home-lang-wrap'>
            <div
              className={`home-lang-btn ${lang == 0 && 'active'}`}
              onClick={() => changeLanguage(0)}>En</div>
            <div
              className={`home-lang-btn ${lang == 1 && 'active'}`}
              onClick={() => changeLanguage(1)}>Tw</div>
          </div>
        </div>
      </header>
    )
  }
}

export default Header