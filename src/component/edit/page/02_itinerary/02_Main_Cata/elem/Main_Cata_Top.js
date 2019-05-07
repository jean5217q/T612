import React, { Component } from 'react';
import { plan_form as txt  } from '../../../../../../data/Content'

class Cata_Top extends Component {
  render() {
    const { backToStep1,lang } = this.props
    return (
      <div className='add-act-top-wrap'>
        <div
          className='back-icon'
          onClick={backToStep1}>
        </div>
        <div className='add-act-title'>{txt['title']['main_title'][lang]}</div>
      </div>
    )
  }
}

export default Cata_Top