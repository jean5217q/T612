import React, { Component } from 'react';
import PropTypes from 'prop-types';

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

AmountInput.propTypes = {
  lang: PropTypes.number,
  amount: PropTypes.string,
  currencyText: PropTypes.string,
  changeAmount: PropTypes.func,
}

export default AmountInput;

