import React, { Component } from 'react';
import Exchange_Select from './Exchange/Exchange_Select';
import { connect } from 'react-redux';
import { Currency, formateCurrency } from '../../../../../../data/currency'
class Budget_Edit_Step1 extends Component {
  state = {
    amount: 0,
    inputAmount: '',
    outputAmount: '',
    fromCurrency: 'USD',
    toCurrency: 'USD',
    fromOpen: false,
    toOpen: false,
    rate: '',
    showRate: false,
    openEditFrame: false,
    styleEditFrame: false,
  }

  setAmount = (e) => this.setState({ amount: e.target.value });
  toggleFromCurrency = () => {
    this.setState({
      fromOpen: !this.state['fromOpen'],
      toOpen: false
    })
  }
  toggleToCurrency = () => {
    this.setState({
      toOpen: !this.state['toOpen'],
      fromOpen: false
    })
  }
  setFromCurrency = (cur) => {
    this.setState({
      fromCurrency: cur,
      fromOpen: false
    })
  }
  closeAllCurrency = (e) => {
    console.log(e.target.className)
    if (e.target.classList.contains('exchange-wrap')) {
      console.log('ww')
      this.setState({
        fromOpen: false,
        toOpen: false
      })
    }
  }
  setToCurrency = (cur) => {
    this.setState({
      toCurrency: cur,
      toOpen: false
    })
  }
  exchangeSubmit = (e) => {
    const { amount, fromCurrency, toCurrency } = this.state
    e.preventDefault()
    this.searchforExchange(amount, fromCurrency, toCurrency)
  }
  searchforExchange = (num, input, output) => {
    let url = `https://api.coinbase.com/v2/exchange-rates?currency=${input}`
    fetch(url)
      .then(res => res.json())
      .then(json => {
        let result = json.data.rates[output]
        console.log(result === '0' || result === '0.00')
        if (result === '0' || result === '0.00') {
          url = `https://api.coinbase.com/v2/exchange-rates?currency=${output}`
          fetch(url).then(res => res.json())
            .then(json2 => {
              result = json2.data.rates[input]
              const rate = (1 / result).toFixed(5)
              this.setState({
                showRate: true,
                rate,
                inputAmount: num,
                outputAmount: rate * num,
              })
            })
        }
        else {
          this.setState({
            showRate: true,
            rate: result,
            inputAmount: num,
            outputAmount: result * num,
          })
        }
      })
  }
  changeInput = (e) => {
    this.setState({
      inputAmount: e.target.value,
      outputAmount: e.target.value * this.state.rate
    })
  }
  changeOutput = (e) => {
    this.setState({
      outputAmount: e.target.value,
      inputAmount: e.target.value / this.state.rate
    })
  }
  searchExAgain = (e) => {
    this.setState({
      showRate: false,
      amount: 0,
      rate: '',
      inputAmount: '',
      outputAmount: '',
    })
  }
  render() {
    const {
      openEditFrame,
      styleEditFrame,
      lang,
      txt } = this.props
    const {
      amount,
      fromCurrency,
      toCurrency,
      fromOpen,
      toOpen,
      inputAmount,
      outputAmount,
      showRate
    } = this.state
    return (
      <div
        style={openEditFrame ? { display: 'flex' } : { display: 'none' }}
        className={`exchange-wrap ${styleEditFrame ? 'show' : null}`}
        onClick={this.closeAllCurrency}
      >
        <div
          style={showRate ? { display: 'none' } : { display: 'flex' }}
          className='exchange-inner'>
          <div className='exchange-input-wrap'>
            <div className='exchange-input-block'>
              <label className='exchange-input-text'>{txt['amount'][lang]}</label>
              <input
                className='exchange-input-value'
                type='number'
                value={amount}
                onChange={this.setAmount}
              />
            </div>
            <div className='exchange-input-block'>
              <label className='exchange-input-text'>{txt['from'][lang]}</label>
              <Exchange_Select
                currency={fromCurrency}
                open={fromOpen}
                toggleCurrency={this.toggleFromCurrency}
                setCurrency={this.setFromCurrency}
                lang={lang}
                txt={txt}
              />
            </div>
            <div className='exchange-input-block'>
              <label className='exchange-input-text'>{txt['to'][lang]}</label>
              <Exchange_Select
                currency={toCurrency}
                open={toOpen}
                toggleCurrency={this.toggleToCurrency}
                setCurrency={this.setToCurrency}
                lang={lang}
                txt={txt}
              />
            </div>
          </div>
          <form
            className='exchange-input-wrap'
            onSubmit={this.exchangeSubmit}>
            <button
              className='exchange-submit-btn'
              type='submit'>{txt['exchange'][lang]}</button>
          </form>
        </div>


        <div
          style={showRate ? { display: 'flex' } : { display: 'none' }}
          className='exchange-inner'>
          <div className='exchange-input-wrap'>
            <div className='exchange-input-block result'>
              <input
                className='exchange-input-value result'
                type='number'
                value={inputAmount}
                onChange={this.changeInput} />
              <label
                className='exchange-input-text result'>
                {formateCurrency[fromCurrency][lang]}
              </label>
            </div>
            <span className='exchange-equal-wrap'>
              <i className="fas fa-exchange-alt exchange-equal"></i>

            </span>

            <div className='exchange-input-block result'>
              <input
                className='exchange-input-value result'
                type='number'
                value={outputAmount}
                onChange={this.changeOutput} />
              <label className='exchange-input-text result'>
                {formateCurrency[toCurrency][lang]}
              </label>
            </div>
          </div>
          <div
            className='exchange-input-wrap'
            onClick={this.searchExAgain}>
            <div
              onClick={this.searchExAgain}
              className='exchange-submit-btn'
              type='submit'>{txt['search_again'][lang]}</div>
          </div>
        </div>
      </div>
    )
  }
}

export default connect()(Budget_Edit_Step1);

