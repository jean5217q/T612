import React, { Component } from 'react';
import PropTypes from 'prop-types';

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

ExchangeAgainButton.propTypes = {
  exchangeAgainText: PropTypes.string,
  getExchangeingAgain: PropTypes.func,
}

export default ExchangeAgainButton;

