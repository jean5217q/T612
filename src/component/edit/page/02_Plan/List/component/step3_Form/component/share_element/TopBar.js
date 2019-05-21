import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { plan_form as text } from '../../../../../../../../../data/Content';

class Top_Bar extends Component {
  render() {
    const { 
      lang,
      color,
      type, 
      backToStep1, 
      backToStep2, 
      backToStep3 } = this.props
    return (
      <div className={`add-plan-top color-${color}`}>
        <div
          className='icon'
          onClick={text === 'hotel' ? backToStep2 : backToStep3}>
        </div>
        <div
          className='add-act-close-btn'
          onClick={backToStep1}></div>
        <div className='title'>{
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

Top_Bar.propTypes = {
  lang: PropTypes.number,
  color: PropTypes.string,
  type: PropTypes.string, 
  backToStep1: PropTypes.func, 
  backToStep2: PropTypes.func, 
  backToStep3: PropTypes.func,
}

export default Top_Bar