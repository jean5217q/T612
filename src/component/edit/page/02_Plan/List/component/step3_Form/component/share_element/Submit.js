import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { plan_form as text } from '../../../../../../../../../data/Content';

class Submit extends Component {
  render() {
    const { bundleInput, setBasicInput, goToStep5,lang } = this.props
    return (
      <div className='select-btn-wrap'>
        <div
          className='select-btn-block submit'
          onClick={() => setBasicInput(bundleInput())}>
          <div className='select-btn-text'>{text['button']['submit'][lang]}</div>
        </div>
        <div className='select-btn-or-text'>{text['button']['or'][lang]}</div>
        <div
          className='select-btn-block map'
          onClick={() => goToStep5(bundleInput())}>
          <div className='select-btn-text'>{text['button']['map'][lang]}
          </div>
        </div>
      </div>
    )
  }
}

Submit.propTypes = {
  lang: PropTypes.number,
  bundleInput: PropTypes.func, 
  setBasicInput: PropTypes.func, 
  goToStep5: PropTypes.func, 
}

export default Submit