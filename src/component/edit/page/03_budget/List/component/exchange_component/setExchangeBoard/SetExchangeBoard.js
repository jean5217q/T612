import React, { Component } from 'react';
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

export default SetExchangeBoard;

