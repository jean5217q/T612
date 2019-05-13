import React, { Component } from 'react';
import AmountInput from './element/AmountInput';
import ExchangeAgainButton from './element/ExchangeAgainButton';

class getExchangeBoard extends Component {
  render() {
    const {
      rateResultShowing,
      inputAmount,
      outputAmount,
      inputCurrencyText,
      outputCurrencyText,
      exchangeAgainText,
      changeInputAmount,
      changeOutputAmount,
      getExchangeingAgain
    } = this.props
    return (
      <div
        style={rateResultShowing ? { display: 'flex' } : { display: 'none' }}
        className='exchange-inner'>
        <div className='exchange-input-wrap'>
          <AmountInput
            amount={inputAmount}
            currencyText={inputCurrencyText}
            changeAmount={changeInputAmount}
          />
          <span className='exchange-equal-wrap'>
            <i className="fas fa-exchange-alt exchange-equal"></i>
          </span>
          <AmountInput
            amount={outputAmount}
            currencyText={outputCurrencyText}
            changeAmount={changeOutputAmount}
          />
        </div>
        <ExchangeAgainButton
          exchangeAgainText={exchangeAgainText}
          getExchangeingAgain={getExchangeingAgain}
        />
    </div>
    )
  }
}

export default getExchangeBoard;