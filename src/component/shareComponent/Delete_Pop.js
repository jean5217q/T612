import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { btn } from '../../data/Content';

class Delete_Pop extends Component {
  render() {
    const { 
      lang,
      delete_pop, 
      title,
      closeDeletePopBoard, 
      deleteProject 
    } = this.props
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

Delete_Pop.propTypes = {
  lang: PropTypes.number,
  delete_pop: PropTypes.bool, 
  title: PropTypes.string,
  closeDeletePopBoard: PropTypes.func,
  deleteProject: PropTypes.func
}

export default Delete_Pop;