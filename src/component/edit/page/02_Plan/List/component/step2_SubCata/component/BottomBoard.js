import React, { Component } from 'react';
import PropTypes from 'prop-types';
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
      <div className='add-plan-bottom sub_cata'>
        <div className='add-plan-bottom-inner'>
        {
          list.map((el, index) =>
            <div
              className='add-plan-icon'
              key={index}>
              <div
                className={`icon sub ${el}`}
                onClick={() => goToStep4(el)}>
              </div>
              <div className='title'>{text['content'][el][lang]}</div>
            </div>
          )
        }
        </div>
      </div>
    )
  }
}

BottomBoard.propTypes = {
  lang: PropTypes.number,
  mainType: PropTypes.string,
  goToStep4: PropTypes.func
}

export default BottomBoard