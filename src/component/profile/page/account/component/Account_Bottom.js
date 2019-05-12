import React, { Component } from 'react';
class User_setting extends Component {
  state = {
    currencyDropDown: false,
    modify_pop: false,
    colorList: ['a', 'b', 'c'],
    currencyList: ['TWD', 'USD', 'CNY'],
    color: 'a',
    currency: 'TWD',
    userName: ''
  }
  closeModifyPup = () => this.setState({ modify_pop: false })
  setUserName = (e) => this.setState({ userName: e.target.value })
  setColor = (color) => this.setState({ color: color })
  setCurrency = (currency) => this.setState({ currency: currency, currencyDropDown: false })
  openCurrencyDropdown = () => this.setState({ currencyDropDown: !this.state['currencyDropDown'] })
  closeCurrencyDropdown = (e) => {
    if (e.target.classList.contains('account-bottom')) {
      this.setState({ currencyDropDown: false })
    }
  }
  submitUser = (e) => {
    const {color, currency, userName } = this.state
    if (!userName) return
    e.preventDefault()
    const { updateUser } = this.props
    updateUser(color, currency, userName)

  }
  componentDidMount() {
    const { user } = this.props
    this.setState({
      color: user.color,
      currency: user.currency,
      userName: user.name ? user.name : ''
    })
  }
  render() {
    const {
      currencyDropDown,
      userName,
      color,
      currency,
      currencyList,
      colorList } = this.state
    const { text, lang } = this.props
    return (
      <div
        className='account-bottom'
        onClick={this.closeCurrencyDropdown}>
        <div className='account-bottom-block'>
          <label className='account-label'>
            {text['name'][lang]}
          </label>
          <input
            className='account-select-main input'
            value={userName}
            onChange={this.setUserName} />
        </div>
        <div className='account-bottom-block'>
          <label className='account-label'>
            {text['currency'][lang]}
          </label>
          <div className='account-col-block'>
            <div
              className={`account-select-main currency ${currencyDropDown ? 'show' : null}`}
              onClick={this.openCurrencyDropdown}>
              {text['currency_item'][currency][lang]}
            </div>
            <i className="fas fa-caret-down currency_drop"></i>
            <ul
              className={`acoount-currency-list ${currencyDropDown ? 'show' : null}`}>
              {
                currencyList.map((currency, index) =>
                  <li
                    className='account-currency-item'
                    key={index}
                    onClick={() => this.setCurrency(currency)}>
                    <span>{text['currency_item'][currency][lang]}</span>
                  </li>
                )
              }
            </ul>
          </div>
        </div>
        <div className='account-bottom-block'>
          <label className='account-label'>
            {text['background'][lang]}
          </label>
          <ul className='account-background-group'>
            {
              colorList.map((el, index) =>
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
          onSubmit={this.submitUser}>
          <button
            className='account-modify-btn'
            type='submit'>
            <span>{text['submit'][lang]}</span>
          </button>
        </form>
      </div>
    )
  }
}


export default User_setting;