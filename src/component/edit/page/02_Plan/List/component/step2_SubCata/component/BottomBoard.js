import React, { Component } from 'react';
import { plan_form as text  } from '../../../../../../../../data/Content';

class BottomBoard extends Component {
  state = {
    trans: ['flight', 'train', 'cruise', 'bus', 'taxi', 'road_trip'],
    activity: ['attraction', 'shopping', 'events', 'activity_others'],
    food: ['restaurant', 'cafe', 'bar', 'food_others']
  }
  render() {
    const { lang, mainType, goToStep4 } = this.props
    const list = this.state[mainType]
    return (
      <div className='add-act-bottom-wrap sub_cata'>
        {
          list.map((el, index) =>
            <div
              className='add-act-icon-wrap'
              key={index}>
              <div
                className={`add-act-icon sub ${el}`}
                onClick={() => goToStep4(el)}>
              </div>
              <div className='add-act-sub-icon-text'>
                {text['content'][el][lang]}
              </div>
            </div>
          )
        }
      </div>
    )
  }
}

export default BottomBoard