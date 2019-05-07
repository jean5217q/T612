//env
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { coins_icon } from '../../../../../../../data/currency_icon';

class Item_Show extends Component {
  render() {
    const {
      item,
      type,
      index,
      deleteItem,
      toggleEdit,
      handleOpenEditFrame,
      move,
      mouseDown,
      mouseUp,
      mobileDown,
      mobileMove,
      mobileUp,
      formateAmount,
      lang,
      user_currency
    } = this.props
    const { title, value, inputIcon, currency } = item
    const change_val = item[user_currency]
    return (
      <div
        className={`budget-show-list-item ${move ? 'right' : null}`}
        onMouseDown={mouseDown}
        onMouseUp={mouseUp}
        onTouchStart={mobileDown}
        onTouchMove={mobileMove}
        onTouchEnd={mobileUp}
      >
        <div className='budget-item-wrap'>

          <div className='budget-show-item-block type'>
            <div className={`budget-show-item-type ${type}`}>
              <div className='budget-show-item-type-icon'></div>
            </div>
          </div>
          <div className='budget-show-item-block title'>
            <div className='budget-show-item-title'>{title}</div>
          </div>
          <div className='budget-show-item-block price'>
            {/* <div className='budget-show-item-unit'>$.</div> */}
            <div className='budget-show-item-value'>{currency}.{formateAmount(value)}</div>
            <div className='budget-show-item-change-val'>{user_currency}.{formateAmount(change_val)}</div>
          </div>
          <div
            className='budget-show-item-block edit'
            onClick={toggleEdit}>
            <div className='budget-show-item-edit-icon'></div>
          </div>
        </div>
        {/* 編輯 */}
        <div className='i-item-edit-wrap budget'>
          <div
            className="i-item-edit-btn edit"
            onClick={handleOpenEditFrame}>
            <div className="i-item-edit-icon edit"></div>
          </div>
          <div
            className="i-item-edit-btn delete"
            onClick={() => deleteItem(index, type)}>
            <div className="i-item-edit-icon delete"></div>
          </div>
        </div>
      </div>
    )
  }
}

export default connect()(Item_Show);