import React, { Component } from 'react';
import { plan_form as text } from '../../../../../../../../../data/Content';

class Top_Bar extends Component {
  render() {
    const { 
      lang,
      type, 
      backToStep1, 
      backToStep2, 
      backToStep3 } = this.props
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
            `${text['title']['add'][lang]} ${text['type'][type][lang]} ${text['title']['info'][lang]}`
            :
            `${text['title']['add'][lang]}${text['type'][type][lang]}${text['title']['info'][lang]}`
        }</div>
      </div>
    )
  }
}
export default Top_Bar