import React, { Component } from 'react';
import { plan_form as txt} from  '../../../../../../../data/Content';

class Btn extends Component {
  render() {
    const { bundleInput, setBasicInput, goToStep5,lang } = this.props
    return (
      <div className='select-btn-wrap'>
        <div
          className='select-btn-block submit'
          onClick={() => setBasicInput(bundleInput())}>
          <div className='select-btn-text'>{txt['button']['submit'][lang]}</div>
        </div>
        <div className='select-btn-or-text'>{txt['button']['or'][lang]}</div>
        <div
          className='select-btn-block map'
          onClick={() => goToStep5(bundleInput())}>
          {/* <div className='select-map-btn-icon'></div> */}
          <div className='select-btn-text'>{txt['button']['map'][lang]}
          </div>
        </div>

      </div>
    )
  }
}

export default Btn