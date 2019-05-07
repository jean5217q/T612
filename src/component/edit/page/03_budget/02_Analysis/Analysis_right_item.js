import React, { Component } from 'react';


class Analysis_item extends Component {
  render() {
    const {
      type,
      total,
      txt,
      lang,
      formateAmount,
      user_currency,
      currencyType,
      percent } = this.props
    return (
      <div className='analysis-item'>
        <div className='analysis-item-block type'>
          <div className={`analysis-type icon ${type}`}></div>
          <div className='analysis-type title'>{txt['type'][type][lang]}</div>
        </div>
        <div className='analysis-item-block percent'>
          <div className='analysis-item-text percent'>
            {percent}%
          </div>
        </div>
        <div className='analysis-item-block amount'>
          <div className='analysis-item-text amount'>
            {formateAmount(currencyType(total))}
          </div>
        </div>
      </div>
    )
  }
}



export default Analysis_item;