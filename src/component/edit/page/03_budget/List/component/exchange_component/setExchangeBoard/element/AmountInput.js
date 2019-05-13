import React, { Component } from 'react';

class AmountInput extends Component {
  render() {
    const {
      amount,
      amountText,
      setAmount
    } = this.props
    return (
      <div className='exchange-input-block'>
        <label className='exchange-input-text'>{amountText}</label>
        <input
          className='exchange-input-value'
          type='number'
          value={amount}
          onChange={setAmount}
        />
    </div>
    )
  }
}

export default AmountInput;
