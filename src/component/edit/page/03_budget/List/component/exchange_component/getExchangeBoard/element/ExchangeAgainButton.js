import React, { Component } from 'react';

class ExchangeAgainButton extends Component {
  render() {
    const {
      exchangeAgainText,
      getExchangeingAgain
    } = this.props
    return (
      <div className='exchange-input-wrap'>
        <div
          onClick={getExchangeingAgain}
          className='exchange-submit-btn'>{exchangeAgainText}
        </div>
      </div>
    )
  }
}

export default ExchangeAgainButton;

