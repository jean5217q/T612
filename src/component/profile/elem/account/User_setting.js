import React, { Component } from 'react';
class User_setting extends Component {
  state = {
    openCurrency: false,
    modify_pop: false,
    colors: ['a', 'b', 'c'],
    currencies: ['TWD', 'USD', 'CNY'],
    language: ['Chinese', 'English'],
    color: 'a',
    currency: 'TWD',
    inputName: ''
  }
  closeModifyPup = () => this.setState({ modify_pop: false })
  handleNameChange = (e) => this.setState({ inputName: e.target.value })
  handleOpenCurrency = () => this.setState({ openCurrency: !this.state['openCurrency'] })
  handleCloseCurrency = (e) => {
    if (e.target.classList.contains('account-bottom')) {
      this.setState({ openCurrency: false })
    }
  }
  setColor = (id) => this.setState({ color: id })
  handleCurrency = (currency) => this.setState({ currency: currency, openCurrency: false })
  updateSubmit = (e) => {
    const {
      color,
      currency,
      selectLanguage,
      inputName } = this.state
    if (!inputName) return
    e.preventDefault()
    const { updatePersonal } = this.props
    updatePersonal(color, currency, selectLanguage, inputName)

  }
  componentDidMount() {
    const { user } = this.props
    this.setState({
      color: user.color,
      currency: user.currency,
      selectLanguage: user.language,
      inputName: user.name ? user.name : ''
    })
  }
  render() {
    const {
      openCurrency,
      languages,
      color,
      currency,
      selectLanguage,
      currencies,
      inputName,
      colors } = this.state
    const { account_text, lang } = this.props
    return (
      <div
        className='account-bottom'
        onClick={this.handleCloseCurrency}>
        <div className='account-bottom-block'>
          <label className='account-label'>{account_text['name'][lang]}</label>
          <input
            className='account-select-main input'
            value={inputName}
            onChange={this.handleNameChange} />
        </div>
        {/* <div className='account-bottom-block'>
          <div className='account-label'>Language</div>
          {language.map((el, index) =>
            <div
              key={index}
              className='account-col-block'>
              <label
                htmlFor={el}
                className={`language-input-radio ${selectLanguage === el ? 'checked' : null}`}>
                <input
                  id={el}
                  name='language'
                  value={el}
                  type='radio'
                  onChange={this.handleSelectLanguage} />
              </label>
              <div className='account-language-name'>{el}</div>
            </div>
          )}
        </div> */}
        <div className='account-bottom-block'>
          <label className='account-label'>{account_text['currency'][lang]}</label>
          <div className='account-col-block'>
            <div
              className={`account-select-main currency ${openCurrency ? 'show' : null}`}
              onClick={this.handleOpenCurrency}>{account_text['currency_item'][currency][lang]}</div>
            <i className="fas fa-caret-down currency_drop"></i>
            <ul
              className={`acoount-currency-list ${openCurrency ? 'show' : null}`}>
              {
                currencies.map((el, index) =>
                  <li
                    className='account-currency-item'
                    key={index}
                    onClick={() => this.handleCurrency(el)}>
                    <span>{account_text['currency_item'][el][lang]}</span>
                  </li>
                )
              }
            </ul>
          </div>
        </div>
        <div className='account-bottom-block'>
          <label className='account-label'>{account_text['background'][lang]}</label>
          <ul className='account-background-group'>
            {
              colors.map((el, index) =>
                <li
                  id={el}
                  key={index}
                  className={`account-background-item ${color === el ? 'select' : null}`}
                  onClick={() => this.setColor(el)}></li>
              )
            }
          </ul>
        </div>
        <form
          className='account-bottom-block'
          onSubmit={this.updateSubmit}>
          <button
            className='account-modify-btn'
            type='submit'>
            <span>{account_text['submit'][lang]}</span>
          </button>
        </form>
      </div>
    )
  }
}


export default User_setting;