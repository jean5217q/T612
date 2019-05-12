import React, { Component } from 'react';
import { btn } from '../../data/Content';

class Popup extends Component {
  render() {
    const { closeDeletePopBoard, deleteProject, delete_pop, title,lang } = this.props
    return (
      <div
        className='pop-up-container'
        style={delete_pop ? { display: 'flex' } : { display: 'none' }}>
        <div
          className='pop-up-layer'
          onClick={closeDeletePopBoard}>
        </div>
        <div className='pop-up-inner'>
          <div className='pop-up-top'>
            <div
              className='pop-up-close'
              onClick={closeDeletePopBoard}></div>
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
                onClick={closeDeletePopBoard}
              >{btn['cancel'][lang]}</div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Popup;