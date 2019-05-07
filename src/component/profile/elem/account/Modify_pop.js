import React, { Component } from 'react';

class Popup extends Component {
  render() {
    const { closeModifyPup, modify_pop, lang, txt } = this.props
    return (
      <div
        className='pop-up-container'
        style={modify_pop ? { display: 'flex' } : { display: 'none' }}>
        <div
          className='pop-up-layer'
          onClick={closeModifyPup}>
        </div>
        <div className='pop-up-inner'>
          <div className='pop-up-top'>
            <div
              className='pop-up-close'
              onClick={closeModifyPup}></div>
          </div>
          <div className='pop-up-content'>
            <div className='pop-up-confirm-icon'></div>
            <div className='pop-up-confirm-text'>{txt['modify'][lang]}</div>
          </div>
        </div>
      </div>
    )
  }
}

export default Popup;