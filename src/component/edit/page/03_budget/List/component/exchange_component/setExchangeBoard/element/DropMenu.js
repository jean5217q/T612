import React, { Component } from 'react';
import { Currency, formateCurrency } from '../../../../../../../../../data/currency';

class DropMenu extends Component {
  render() {
    const {
      lang,
      currency,
      DropMenuShowing,
      label,
      toggleCurrency,
      setCurrency
    } = this.props
    return (
      <div className='exchange-input-block'>
          <label className='exchange-input-text'>{label}</label>
          <div className='exchange-select-wrap'>
            <div
              className='exchange-select-tag'
              onClick={toggleCurrency}>{formateCurrency[currency][lang]}
            </div>
            <ul className={`exchange-list ${DropMenuShowing&&'show'}`}>
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
      </div>
    )
  }
}

export default DropMenu;

