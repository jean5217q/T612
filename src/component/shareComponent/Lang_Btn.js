import React, { Component } from 'react';
class Lang_Btn extends Component {
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

export default Lang_Btn;
