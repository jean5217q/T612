import React, { Component } from 'react'
import { plan_form as text  } from '../../../../../../../../data/Content';

class Cata_Button_Main extends Component {
  state = {
    type: ['trans', 'activity', 'food', 'hotel']
  }
  render() {
    const { lang, goToStep3 } = this.props
    const { type } = this.state
    return (
      <div className='add-act-bottom-wrap main_cata'>
        {
          type.map((el, index) =>
            <div
              className='add-act-icon-wrap'
              key={index}
              onClick={() => goToStep3(el)}>
              <div className={`add-act-icon main ${el}`}>
              </div>
              <div className='add-act-main-icon-text'>
                {text['type'][el][lang]}
              </div>
            </div>
          )}
      </div>
    )
  }
}

export default Cata_Button_Main