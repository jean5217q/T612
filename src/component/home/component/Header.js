import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Header extends Component {
  render() {
    const { lang, changeLanguage } = this.props
    return (
      <header>
        <div className="header-inner">
          <div className="logo"></div>
          <div className='lang-btn-wrap'>
            <div
              className={`lang-btn ${lang == 0 && 'active'}`}
              onClick={() => changeLanguage(0)}>En</div>
            <div
              className={`lang-btn ${lang == 1 && 'active'}`}
              onClick={() => changeLanguage(1)}>Tw</div>
          </div>
        </div>
      </header>
    )
  }
}

Header.propTypes = {
  lang: PropTypes.number,
  changeLanguage: PropTypes.func,
}

export default Header