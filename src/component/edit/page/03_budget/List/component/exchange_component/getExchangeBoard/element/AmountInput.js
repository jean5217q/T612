import React, { Component } from 'react';

class AmountInput extends Component {
  render() {
    const {
      amount,
      currencyText,
      changeAmount,
    } = this.props
    return (
      <div className='exchange-input-block result'>
        <input
          className='exchange-input-value result'
          type='number'
          value={amount}
          onChange={changeAmount} />
        <label className='exchange-input-text result'>{currencyText}</label>
      </div>
    )
  }
}

export default AmountInput;

