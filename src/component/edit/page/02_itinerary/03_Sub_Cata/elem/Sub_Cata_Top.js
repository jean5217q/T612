import React, { Component } from 'react';
import { plan_form as txt  } from '../../../../../../data/Content'

class Sub_Cata_Top extends Component {
  render() {
    const { backToStep2,lang } = this.props
    return (
      <div className='add-act-top-wrap'>
        <div
          className='back-icon'
          onClick={backToStep2}>
        </div>
        <div className='add-act-title'>{txt['title']['sub_title'][lang]}</div>
      </div>
    )
  }
}

export default Sub_Cata_Top