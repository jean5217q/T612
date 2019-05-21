import React, { Component } from 'react';
import PropTypes from 'prop-types';

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

AmountInput.propTypes = {
  lang: PropTypes.number,
  amount: PropTypes.number,
  amountText: PropTypes.string,
  setAmount: PropTypes.func,
}

export default AmountInput;
