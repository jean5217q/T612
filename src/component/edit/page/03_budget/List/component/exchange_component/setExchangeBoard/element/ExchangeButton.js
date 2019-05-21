import React, { Component } from 'react';
import PropTypes from 'prop-types';

class ExchangeButton extends Component {
  render() {
    const {
      submitForExchanging,
      submitText
    } = this.props
    return (
      <form
        className='exchange-input-wrap'
        onSubmit={submitForExchanging}>
        <button
          className='exchange-submit-btn'
          type='submit'>{submitText}
        </button>
      </form>
    )
  }
}

ExchangeButton.propTypes = {
  submitForExchanging: PropTypes.func,
  submitText: PropTypes.string,
}

export default ExchangeButton;

