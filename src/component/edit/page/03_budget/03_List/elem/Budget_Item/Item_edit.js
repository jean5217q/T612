//env
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { coins_icon } from '../../../../../../../data/currency_icon';

class Item_Edit extends Component {
  state = {
    title: '',
    value: 0,
    select_type: 'transportation',
    currencyBar: false,
    select_currency: this.props.user_currency,
    currencyDropStyle: false
  }
  setType = (e) => { this.setState({ select_type: e.target.value }) }
  setTitle = (e) => { this.setState({ title: e.target.value }) }
  setValue = (e) => { this.setState({ value: e.target.value }) }
  setCurrency = (el) => {
    this.setState({
      select_currency: el,
      currencyBar: false,
      currencyDropStyle: false
    })
  }
  toggleCurrency = () => {
    const { currencyBar } = this.state
    if (currencyBar === false) {
      this.setState({ currencyDropStyle: true })
    }
    else this.setState({ currencyDropStyle: false })
    this.setState({ currencyBar: !this.state['currencyBar'] })
  }
  closeDrop = (e) => {
    if (e.target.classList.contains('add-budget-form-inner')) {
      this.setState({ currencyBar: false })
    }
  }
  editSubmit = (e) => {
    e.preventDefault()
    if (value === '' || title === '') return
    const { index, editItem, closeEditFrame, type } = this.props
    const { value, title, select_currency } = this.state
    const obj = {
      title: title,
      value: parseInt(value),
      currency: select_currency,
      inputIcon: coins_icon[select_currency],
    }
    closeEditFrame()
    editItem(index, type, obj)
  }
  componentDidMount() {
    const { item, type } = this.props
    const { title, value } = item
    this.setState({
      title: title,
      value: parseInt(value),
      select_type: type
    })
  }
  render() {
    const {
      select_type,
      title,
      value,
      select_currency,
      currencyBar,
      currencyDropStyle } = this.state
    const {
      openEditFrame,
      closeEditFrame,
      lang,
      currency_arr,
      txt } = this.props
    return (
      <form
        onSubmit={this.editSubmit}
        style={openEditFrame ? { display: 'flex' } : { display: 'none' }}
        className='add-budget-form edit'>
        <div className='add-budget-form-inner edit'>
          <input
            className='item budget-input'
            type='text'
            placeholder={txt['item'][lang]}
            value={title}
            onChange={this.setTitle}
          />
          <input
            className='cost budget-input'
            type='number'
            placeholder={txt['spend'][lang]}
            value={value}
            onChange={this.setValue}
          />


          <div
            className={`budget-input currency ${currencyDropStyle && 'style'}`}
            onClick={this.toggleCurrency}>
            {/* 選單顯示字區域 */}
            <div className='budget-drop-title-wrap'>
              <div
                className='budget-drop-title'
              >{select_currency}
              </div>
              <i className="fas fa-caret-down budget-drop-icon"></i>
            </div>
            {/* 真正選單區域 */}
            <ul
              style={currencyBar ? { display: 'block' } : { display: 'none' }}
              className={`budget-drop-ul currency ${currencyDropStyle && 'style'}`}>
              {
                currency_arr.map((el, index) =>
                  <li
                    className={`budget-type-item ${currencyDropStyle && 'style'}`}
                    key={index}
                    onClick={() => this.setCurrency(el)}>
                    <div className='budget-type-text'>
                      {el}
                    </div>
                  </li>
                )
              }
            </ul>
          </div>
          <button className='add-budget-button' type='submit'>{txt['submit'][lang]}</button>
        </div>
        {/* 取消 */}
        <div
          className="add-budget-cancel-btn"
          onClick={closeEditFrame}
        >
        </div>
      </form>
    )
  }
}

export default connect()(Item_Edit);