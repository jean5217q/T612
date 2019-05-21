import React, { Component } from 'react';
import PropTypes from 'prop-types';

class SettingSuccess_Pop extends Component {
  render() {
    const { 
      lang,
      success_pop,
      text,
      closeSuccessPupBlock } = this.props
    return (
      <div
        className='pop-up-container'
        style={success_pop ? { display: 'flex' } : { display: 'none' }}>
        <div
          className='pop-up-layer'
          onClick={closeSuccessPupBlock}>
        </div>
        <div className='pop-up-inner'>
          <div className='pop-up-top'>
            <div
              className='pop-up-close'
              onClick={closeSuccessPupBlock}>
            </div>
          </div>
          <div className='pop-up-content'>
            <div className='pop-up-confirm-icon'></div>
            <div className='pop-up-confirm-text'>{text['modify'][lang]}</div>
          </div>
        </div>
      </div>
    )
  }
}

SettingSuccess_Pop.propTypes = {
  lang: PropTypes.number,
  text: PropTypes.object, 
  success_pop: PropTypes.bool,
  closeSuccessPupBlock: PropTypes.func
}

export default SettingSuccess_Pop;