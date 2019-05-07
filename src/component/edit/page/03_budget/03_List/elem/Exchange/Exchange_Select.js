import React, { Component } from 'react';
import { Currency, formateCurrency } from '../../../../../../../data/currency'

class Budget_Edit_Step1 extends Component {
  render() {
    const {
      currency,
      open,
      toggleCurrency,
      setCurrency,
      lang,
      txt } = this.props
    return (
      <div
        className='exchange-select-wrap'>
        <div
          className='exchange-select-tag'
          onClick={toggleCurrency}>{formateCurrency[currency][lang]}</div>
        <ul className={`exchange-list ${open ? 'show' : null}`}>
          {
            Currency.map((el, index) =>
              <li
                key={index}
                className='exchange-list-item'
                onClick={() => setCurrency(el)}>
                {formateCurrency[el][lang]}
              </li>
            )
          }
        </ul>
      </div>
    )
  }
}

export default Budget_Edit_Step1;

