import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Item_Show extends Component {
  render() {
    const {
      item,
      type,
      index,
      deleteItem,
      toggleEditSlide,
      showEditBoard,
      isMoving,
      mouseDown,
      mouseUp,
      mobileTouchDown,
      mobileTouchMove,
      mobileTouchUp,
      formateAmount,
      user_currency
    } = this.props
    const { title, value, currency } = item
    const change_val = item[user_currency]
    return (
      <div className='b-item-inner'> 
      <div
        className={`budget-show-list-item ${isMoving ? 'right' : null}`}
        onMouseDown={mouseDown}
        onMouseUp={mouseUp}
        onTouchStart={mobileTouchDown}
        onTouchMove={mobileTouchMove}
        onTouchEnd={mobileTouchUp}
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
            <div className='budget-show-item-value'>{currency} {formateAmount(value)}</div>
            <div className='budget-show-item-change-val'>{user_currency} {formateAmount(change_val)}</div>
          </div>
          <div
            className='budget-show-item-block edit'
            onClick={toggleEditSlide}>
            <div className='budget-show-item-edit-icon'></div>
          </div>
        </div>
        {/* 編輯 */}
        <div className='i-item-edit-wrap budget'>
          <div
            className="i-item-edit-btn edit"
            onClick={showEditBoard}>
            <div className="i-item-edit-icon edit"></div>
          </div>
          <div
            className="i-item-edit-btn delete"
            onClick={() => deleteItem(index, type)}>
            <div className="i-item-edit-icon delete"></div>
          </div>
        </div>
      </div>
      </div>
    )
  }
}

Item_Show.propTypes = {
  lang: PropTypes.number,
  item: PropTypes.object,
  type: PropTypes.string,
  index: PropTypes.number,
  deleteItem: PropTypes.func,
  toggleEditSlide: PropTypes.func,
  showEditBoard: PropTypes.func,
  isMoving: PropTypes.bool,
  mouseDown: PropTypes.func,
  mouseUp: PropTypes.func,
  mobileTouchDown: PropTypes.func,
  mobileTouchMove: PropTypes.func,
  mobileTouchUp: PropTypes.func,
  formateAmount: PropTypes.func,
  user_currency: PropTypes.string
}

export default Item_Show;