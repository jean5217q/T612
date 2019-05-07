//env
import React, { Component } from 'react';
import { plan_form as txt  } from '../../../../../../data/Content';

class Cata_Bottom_Trans extends Component {
  state = {
    trans: ['flight', 'train', 'cruise', 'bus', 'taxi', 'road_trip'],
    activity: ['attraction', 'shopping', 'events', 'activity_others'],
    food: ['restaurant', 'cafe', 'bar', 'food_others']
  }
  formateText = (text) => {
    if (text === 'food_others' || text === 'activity_others') text = 'others'
    text = text.substring(0, 1).toUpperCase() + text.substring(1)
    return text
  }
  render() {
    let { mainType, goToStep4,lang } = this.props
    let list = this.state[mainType]
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
              <div className='add-act-sub-icon-text'>{txt['content'][el][lang]}</div>
            </div>
          )
        }
      </div>
    )
  }
}

export default Cata_Bottom_Trans