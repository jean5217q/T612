import React, { Component } from 'react';
import { connect } from 'react-redux';
class Language_btn extends Component {
  render() {
    const { lang, changeLanguage } = this.props
    return (
      <div className='language-btn'>
        <div
          className={`language-btn-item ${lang == 0 && 'active'}`}
          onClick={() => changeLanguage(0)}>
          <span>En</span>
        </div>
        <div
          className={`language-btn-item ${lang == 1 && 'active'}`}
          onClick={() => changeLanguage(1)}>
          <span>Tw</span>
        </div>
      </div>
    )
  }
}

export default connect()(Language_btn)
