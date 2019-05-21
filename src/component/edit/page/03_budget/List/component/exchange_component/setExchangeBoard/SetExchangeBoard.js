import React, { Component } from 'react';
import PropTypes from 'prop-types';
import AmountInput from './element/AmountInput';
import DropMenu from './element/DropMenu';
import ExchangeButton from './element/ExchangeButton';

class SetExchangeBoard extends Component {
  render() {
    const {
      lang,
      rateResultShowing,
      inputCurrency,
      outputCurrency,
      amount,
      inputDropMenuShowing,
      outputDropMenuShowing,
      inputText,
      outputText,
      amountText,
      submitText,
      setAmount,
      setInputCurrency,
      setOutputCurrency,
      toggleInputCurrency,
      toggleOutputCurrency,
      submitForExchanging
    } = this.props
    return (
    <div
      style={rateResultShowing ? { display: 'none' } : { display: 'flex' }}
      className='exchange-inner'>
      <div className='exchange-input-wrap'>
        <AmountInput
          amount={amount}
          amountText={amountText}
          setAmount={setAmount}/>
        <DropMenu
          lang={lang}
          currency={inputCurrency}
          DropMenuShowing={inputDropMenuShowing}
          label={outputText}
          toggleCurrency={toggleInputCurrency}
          setCurrency={setInputCurrency}  
        />
        <DropMenu
          lang={lang}
          currency={outputCurrency}
          DropMenuShowing={outputDropMenuShowing}
          label={inputText}
          toggleCurrency={toggleOutputCurrency}
          setCurrency={setOutputCurrency}  
        />
      </div>
      <ExchangeButton
        submitText={submitText}
        submitForExchanging={submitForExchanging}
      />
    </div>
    )
  }
}

SetExchangeBoard.propTypes = {
  lang: PropTypes.number,
  rateResultShowing: PropTypes.bool,
  inputCurrency: PropTypes.string,
  outputCurrency: PropTypes.string,
  amount: PropTypes.number,
  inputDropMenuShowing: PropTypes.bool,
  outputDropMenuShowing: PropTypes.bool,
  inputText: PropTypes.string,
  outputText: PropTypes.string,
  amountText: PropTypes.string,
  submitText: PropTypes.string,
  setAmount: PropTypes.func,
  setInputCurrency: PropTypes.func,
  setOutputCurrency: PropTypes.func,
  toggleInputCurrency: PropTypes.func,
  toggleOutputCurrency: PropTypes.func,
  submitForExchanging: PropTypes.func,
}

export default SetExchangeBoard;

