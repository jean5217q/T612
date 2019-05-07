import React, { Component } from 'react';
import { btn } from '../../../data/Content'

class Popup extends Component {
  render() {
    const { closePopUp, deleteProject, popup, title,lang } = this.props
    return (
      <div
        className='pop-up-container'
        style={popup ? { display: 'flex' } : { display: 'none' }}>
        <div
          className='pop-up-layer'
          onClick={closePopUp}>
        </div>
        <div className='pop-up-inner'>
          <div className='pop-up-top'>
            <div
              className='pop-up-close'
              onClick={closePopUp}></div>
          </div>
          <div className='pop-up-content'>
            <div className='pop-up-delete-text'>{btn['delete'][lang]} {title} ?</div>
            <div className='pop-up-btn-wrap'>
              <div
                className='pop-up-btn confirm'
                onClick={deleteProject}

              >{btn['confirm'][lang]}</div>
              <div
                className='pop-up-btn delete'
                onClick={closePopUp}
              >{btn['cancel'][lang]}</div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Popup;