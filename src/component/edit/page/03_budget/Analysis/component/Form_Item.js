import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Form_Item extends Component {
  render() {
    const {
      lang,
      type,
      total,
      percent,
      text,
      formateAmount,
      getCurrencyType
    } = this.props
    return (
      <div className='analysis-item'>
        <div className='analysis-item-block type'>
          <div className={`analysis-type icon ${type}`}></div>
          <div className='analysis-type title'>{text['type'][type][lang]}</div>
        </div>
        <div className='analysis-item-block percent'>
          <div className='analysis-item-text percent'>
            {percent}%
          </div>
        </div>
        <div className='analysis-item-block amount'>
          <div className='analysis-item-text amount'>
            {formateAmount(getCurrencyType(total))}
          </div>
        </div>
      </div>
    )
  }
}

Form_Item.propTypes = {
  lang: PropTypes.number,
  type: PropTypes.string,
  percent: PropTypes.number,
  total: PropTypes.number, 
  user_currency: PropTypes.string,
  text: PropTypes.object, 
  costList: PropTypes.array,
  formateAmount: PropTypes.func,
  getCurrencyType: PropTypes.func 
}

export default Form_Item;