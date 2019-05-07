import React, { Component } from 'react';

class Popup extends Component {
  render() {
    const {
      closePopUp,
      showPreImg,
      preImg,
      popup,
      updateFile,
      updating,
      lang,
      account_text } = this.props
    return (
      <div
        style={popup ? { display: 'flex' } : { display: 'none' }}
        className='pop-up-container'>
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
          {/* 內容 */}
          <div className='pop-up-content user-img'>
            <div className='change-user-img-wrap'>
              <div
                className={`change-user-img ${updating ? 'loading' : null}`}
                style={{ backgroundImage: `url('${preImg}')` }}>
              </div>
              {/* loading */}
              <div
                style={updating ? { display: 'block' } : { display: 'none' }}
                className='sm-loader'></div>
            </div>
            <label
              className='change-img-input'
              htmlFor='user-img-update'>{account_text['update'][lang]}</label>
            <input
              id='user-img-update'
              type='file'
              style={{ display: 'none' }}
              onChange={showPreImg} />
            <div
              className='change-img-btn'
              onClick={updateFile}>
              {updating 
                ? 
                account_text['updating'][lang] 
                : 
                account_text['submit'][lang]}</div>
          </div>
        </div>
      </div>
    )
  }
}
export default Popup