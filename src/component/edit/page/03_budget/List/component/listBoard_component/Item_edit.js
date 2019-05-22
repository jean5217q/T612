import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

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
    const { index, updateItem, closeEditBoard, type } = this.props
    const { value, title, select_currency } = this.state
    if (value <=0 || title === '') return
    const obj = {
      title: title,
      value: parseInt(value),
      currency: select_currency,
    }
    closeEditBoard()
    updateItem(index, type, obj)
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
      title,
      value,
      select_currency,
      currencyBar,
      currencyDropStyle } = this.state
    const {
      editBoardShowing,
      closeEditBoard,
      lang,
      currencyList,
      text } = this.props
    return (
      <form
        onSubmit={this.editSubmit}
        style={editBoardShowing ? { display: 'flex' } : { display: 'none' }}
        className='add-budget-form edit'>
        <div className='add-budget-form-inner edit'>
          <input
            className='item budget-input'
            type='text'
            placeholder={text['item'][lang]}
            value={title}
            onChange={this.setTitle}
          />
          <input
            className='cost budget-input'
            type='number'
            placeholder={text['spend'][lang]}
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
                currencyList.map((el, index) =>
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
          <button className='add-budget-button' type='submit'>{text['submit'][lang]}</button>
        </div>
        {/* 取消 */}
        <div
          className="add-budget-cancel-btn"
          onClick={closeEditBoard}
        >
        </div>
      </form>
    )
  }
}

Item_Edit.propTypes = {
  lang: PropTypes.number,
  text: PropTypes.object,
  item: PropTypes.object,
  type: PropTypes.string,
  user_currency: PropTypes.string,
  editBoardShowing: PropTypes.bool,
  closeEditBoard: PropTypes.func,
  currencyList: PropTypes.array,
  index: PropTypes.number,
  updateItem: PropTypes.func,
  closeEditBoard: PropTypes.func,
}


export default connect()(Item_Edit);