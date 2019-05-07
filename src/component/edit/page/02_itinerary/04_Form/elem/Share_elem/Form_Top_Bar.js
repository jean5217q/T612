import React, { Component } from 'react';
import { plan_form as txt } from '../../../../../../../data/Content';

class Top_Bar extends Component {
  getTitle = (type) => {
    if (type === 'trans') return 'Transportation'
    else if (type === 'hotel') return 'Hotel'
    else if (type === 'food') return 'Food'
    else if (type === 'activity') return 'Activity'
  }
  render() {
    const { text, backToStep1, backToStep2, backToStep3, lang } = this.props
    return (
      <div className='add-act-top-wrap'>
        <div
          className='back-icon'
          onClick={text === 'hotel' ? backToStep2 : backToStep3}>
        </div>
        <div
          className='add-act-close-btn'
          onClick={backToStep1}></div>
        <div className='add-act-title'>{
          lang == 0
            ?
            `${txt['title']['add'][lang]} ${txt['type'][text][lang]} ${txt['title']['info'][lang]}`
            :
            `${txt['title']['add'][lang]}${txt['type'][text][lang]}${txt['title']['info'][lang]}`
        }</div>
      </div>
    )
  }
}
export default Top_Bar