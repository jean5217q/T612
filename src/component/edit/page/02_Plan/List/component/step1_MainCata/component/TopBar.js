import React, { Component } from 'react';
import { plan_form as text  } from '../../../../../../../../data/Content';

class TopBar extends Component {
  render() {
    const { lang, backToStep1 } = this.props
    return (
      <div className='add-act-top-wrap'>
        <div
          className='back-icon'
          onClick={backToStep1}>
        </div>
        <div className='add-act-title'>
          {text['title']['main_title'][lang]}
        </div>
      </div>
    )
  }
}

export default TopBar