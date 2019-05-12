import React, { Component } from 'react';

class PhotoUpdate_Pop extends Component {
  render() {
    const {
      preImg,
      updating,
      lang,
      text,
      photo_pop,
      closeUpdatePhotoBlock,
      setPreImg,
      updateUserPhoto
    } = this.props
    return (
      <div
        style={photo_pop ? { display: 'flex' } : { display: 'none' }}
        className='pop-up-container'>
        <div
          className='pop-up-layer'
          onClick={closeUpdatePhotoBlock}>
        </div>
        <div className='pop-up-inner'>
          <div className='pop-up-top'>
            <div
              className='pop-up-close'
              onClick={closeUpdatePhotoBlock}>
            </div>
          </div>
          <div className='pop-up-content user-img'>
            <div className='change-user-img-wrap'>
              <div
                className={`change-user-img ${updating ? 'loading' : null}`}
                style={{ backgroundImage: `url('${preImg}')` }}>
              </div>
              <div
                style={updating ? { display: 'block' } : { display: 'none' }}
                className='sm-loader'>
              </div>
            </div>
            <label
              className='change-img-input'
              htmlFor='user-img-update'>{text['update'][lang]}
            </label>
            <input
              id='user-img-update'
              type='file'
              style={{ display: 'none' }}
              onChange={setPreImg} />
            <div
              className='change-img-btn'
              onClick={updateUserPhoto}>
              {updating 
                ? text['updating'][lang] 
                : text['submit'][lang]
              }
            </div>
          </div>
        </div>
      </div>
    )
  }
}
export default PhotoUpdate_Pop