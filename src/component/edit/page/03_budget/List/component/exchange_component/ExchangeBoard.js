import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { formateCurrency } from '../../../../../../../data/currency';
import SetExchangeBoard from './setExchangeBoard/SetExchangeBoard';
import GetExchangeBoard from './getExchangeBoard/GetExchangeBoard';

class ExchangeBoard extends Component {
  state = {
    amount: 0,
    inputAmount: '',
    outputAmount: '',
    inputCurrency: 'USD',
    outputCurrency: 'USD',
    inputDropMenuShowing: false,
    outputDropMenuShowing: false,
    exchangeRate: '',
    rateResultShowing: false,
  }
  setAmount = (e) => this.setState({ amount: e.target.value });
  toggleInputCurrency = () => {
    this.setState({
      inputDropMenuShowing: !this.state['inputDropMenuShowing'],
      outputDropMenuShowing: false
    })
  }
  toggleOutputCurrency = () => {
    this.setState({
      outputDropMenuShowing: !this.state['outputDropMenuShowing'],
      inputDropMenuShowing: false
    })
  }
  setInputCurrency = (currency) => {
    this.setState({
      inputCurrency: currency,
      inputDropMenuShowing: false
    })
  }
  setOutputCurrency = (currency) => {
    this.setState({
      outputCurrency: currency,
      outputDropMenuShowing: false
    })
  }
  closeAllDropMenu = (e) => {
    if (e.target.classList.contains('exchange-wrap')) {
      this.setState({
        inputDropMenuShowing: false,
        outputDropMenuShowing: false
      })
    }
  }
  submitForExchanging = (e) => {
    e.preventDefault()
    const { amount, inputCurrency, outputCurrency } = this.state
    this.getExchangeRate(amount, inputCurrency, outputCurrency)
  }
  getExchangeRate = (amount, input, output) => {
    let url = `https://api.coinbase.com/v2/exchange-rates?currency=${input}`
    fetch(url)
      .then(res => res.json())
      .then(json => {
        let result = json.data.rates[output]
        if (result === '0' || result === '0.00') {
          url = `https://api.coinbase.com/v2/exchange-rates?currency=${output}`
          fetch(url)
          .then(res => res.json())
          .then(json2 => {
            result = json2.data.rates[input]
            const exchangeRate = (1 / result).toFixed(5)
            this.setState({
              rateResultShowing: true,
              exchangeRate,
              inputAmount: amount,
              outputAmount: exchangeRate * amount,
            })
          })
        }
        else {
          this.setState({
            rateResultShowing: true,
            exchangeRate: result,
            inputAmount: amount,
            outputAmount: result * amount,
          })
        }
      })
  }
  changeInputAmount = (e) => {
    this.setState({
      inputAmount: e.target.value,
      outputAmount: e.target.value * this.state.exchangeRate
    })
  }
  changeOutputAmount = (e) => {
    this.setState({
      outputAmount: e.target.value,
      inputAmount: e.target.value / this.state.exchangeRate
    })
  }
  getExchangeingAgain = () => {
    this.setState({
      rateResultShowing: false,
      amount: 0,
      rate: '',
      inputAmount: '',
      outputAmount: '',
    })
  }
  render() {
    const {
      exchangeBoardShowing,
      exchangeBoardOpacity,
      lang,
      text } = this.props
    const {
      amount,
      inputCurrency,
      outputCurrency,
      inputDropMenuShowing,
      outputDropMenuShowing,
      inputAmount,
      outputAmount,
      rateResultShowing
    } = this.state
    return (
      <div
        style={exchangeBoardShowing ? { display: 'flex' } : { display: 'none' }}
        className={`exchange-wrap ${exchangeBoardOpacity ? 'show' : null}`}
        onClick={this.closeAllDropMenu}
      >
        <SetExchangeBoard
          lang={lang}
          rateResultShowing={rateResultShowing}
          inputCurrency={inputCurrency}
          outputCurrency={outputCurrency} 
          amount={amount}
          inputDropMenuShowing={inputDropMenuShowing}
          outputDropMenuShowing={outputDropMenuShowing}
          inputText={text['from'][lang]}
          outputText={text['to'][lang]}
          amountText={text['amount'][lang]}
          submitText={text['exchange'][lang]}
          setAmount={this.setAmount}
          setInputCurrency={this.setInputCurrency}  
          setOutputCurrency={this.setOutputCurrency}  
          toggleInputCurrency={this.toggleInputCurrency}
          toggleOutputCurrency={this.toggleOutputCurrency}
          submitForExchanging={this.submitForExchanging}   
        />
        <GetExchangeBoard
          rateResultShowing={rateResultShowing}
          inputAmount={inputAmount}
          outputAmount={outputAmount}
          inputCurrencyText={formateCurrency[inputCurrency][lang]}
          outputCurrencyText={formateCurrency[outputCurrency][lang]}
          exchangeAgainText={text['search_again'][lang]}
          changeInputAmount={this.changeInputAmount}
          changeOutputAmount={this.changeOutputAmount}
          getExchangeingAgain={this.getExchangeingAgain}
        />
      </div>
    )
  }
}

ExchangeBoard.propTypes = {
  lang: PropTypes.number,
  exchangeBoardShowing: PropTypes.bool,
  exchangeBoardOpacity: PropTypes.bool,
  text: PropTypes.object
}

export default ExchangeBoard;

