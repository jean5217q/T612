import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { plan_form as text  } from '../../../../../../../../data/Content';

class Cata_Button_Main extends Component {
  state = {
    type: ['trans', 'activity', 'food', 'hotel']
  }
  render() {
    const { lang, goToStep3 } = this.props
    const { type } = this.state
    return (
      <div className='add-plan-bottom main_cata'>
        <div className='add-plan-bottom-inner'>
        {
          type.map((el, index) =>
            <div
              className='add-plan-icon'
              key={index}
              onClick={() => goToStep3(el)}>
              <div className={`icon main ${el}`}></div>
              <div className='title'>{text['type'][el][lang]}</div>
            </div>
          )}
          </div>
      </div>
    )
  }
}

Cata_Button_Main.propTypes = {
  lang: PropTypes.number,
  goToStep3: PropTypes.func,
}

export default Cata_Button_Main