import React, { Component } from 'react';

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

export default ExchangeButton;

