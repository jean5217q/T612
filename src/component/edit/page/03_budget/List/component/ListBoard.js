import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import List_Item from './listBoard_component/List_Item';
import AddForm from './AddForm';
import {
  asyncGetBudgetDayList,
  removeBudgetAllList,
  itemLoading
} from '../../../../../../action/budget';
import { db } from '../../../../../base';
import { empty } from '../../../../../../data/Content';

class ListBoard extends Component {
  state = {
    select_type: 'transportation',
    title: '',
    value: '',
    addLoading: false,
    type: ['transportation', 'shopping', 'entertainment', 'food', 'hotel', 'others'],
    typeDropShowing: false,
    currencyDropShowing: false,
    typeDropStyling: false,
    currencyDropStyling: false,
    select_currency: this.props.user_currency
  }
  closeAllDrop = (e) => {
    if (e.target.classList.contains('add-budget-form-inner')) {
      this.setState({
        typeDropShowing: false,
        currencyDropShowing: false,
        typeDropStyling: false,
        currencyDropStyling: false
      })
    }
  }
  showTypeDrop = () => {
    const { typeDropShowing } = this.state
    if (!typeDropShowing) this.setState({ typeDropStyling: true })
    else this.setState({ typeDropStyling: false })
    this.setState(
      { typeDropShowing: !this.state['typeDropShowing'] }
    )
  }
  showCurrencyDrop = () => {
    const { currencyDropShowing } = this.state
    if (!currencyDropShowing) this.setState({ currencyDropStyling: true })
    else this.setState({ currencyDropStyling: false })
    this.setState(
      { currencyDropShowing: !this.state['currencyDropShowing'] }
    )
  }
  setCostType = (el) => {
    this.setState({
      select_type: el,
      typeDropShowing: false,
      typeDropStyling: false,
    })
  }
  setCostTitle = (e) => this.setState({title: e.target.value})
  setCostValue = (e) => this.setState({value: e.target.value})
  setCostCurrency = (el) => {
    this.setState({ select_currency: el, currencyDropShowing: false })
  }
  calcTotalCost = () => {
    let costList = []
    const { type } = this.state
    const { user_currency, list } = this.props
    type.forEach(el => {
      list[el].forEach(cost => costList.push((cost[user_currency])))
    })
    let totalCost = costList.reduce((acc, cur) => acc + cur, 0)
    if (user_currency === 'USD') return totalCost.toFixed(1)
    else return totalCost
  }
  getExchangeRate = (value, currency, callback) => {
    const url = `https://api.coinbase.com/v2/exchange-rates?currency=USD`
    fetch(url)
    .then(res => res.json())
    .then(json => {
      let rateList = json.data.rates
      let usd = (value / rateList[currency])
      let twd = (usd * rateList['TWD'])
      let rmb = (usd * rateList['CNY'])
      usd = parseFloat(usd.toFixed(1))
      twd = parseInt(twd.toFixed(0))
      rmb = parseInt(rmb.toFixed(0))
      callback(usd,twd,rmb)
    })
  }
  addItemToDb = (e) => {
    e.preventDefault()
    const { projectId, dateId, hideAddBoard, dispatch } = this.props
    const { select_type, title, value, select_currency } = this.state
    if (!select_type || title === '' || value <= 0) return
    dispatch(itemLoading(true))
    hideAddBoard()
    this.getExchangeRate(value, select_currency, (usd, twd, rmb) => {
      db.collection('project').doc(projectId)
      .collection('budget').doc(dateId)
      .update({
        [select_type]: firebase.firestore.FieldValue.arrayUnion({
          title: title,
          value: parseInt(value),
          USD: usd,
          TWD: twd,
          RMB: rmb,
          currency: select_currency
        })
      })
      .then(() => {
        this.setState({ select_type: 'transportation', title: '', value: '', })
        dispatch(asyncGetBudgetDayList(projectId, dateId))
      }) 
    })
  }
  updateItem = (id, type, updateObj) => {
    const { projectId, dateId, dispatch, list } = this.props
    const { value, currency } = updateObj
    this.getExchangeRate(value, currency, (usd, twd, rmb) => {
      let targetList = list[type]
      targetList.forEach((el, index) => {
        if (index === id) {
          targetList[id] = {
            ...updateObj,
            USD: usd,
            TWD: twd,
            RMB: rmb,
          }
        }
      })
      db.collection('project').doc(projectId)
        .collection('budget').doc(dateId)
        .update({ [type]: targetList })
        .then(() => dispatch(asyncGetBudgetDayList(projectId, dateId)))
      })
  }
  deleteItem = (id, type) => {
    const { projectId, dateId, dispatch, list } = this.props
    let targetList = list[type]
    targetList = targetList.filter((el, index) => index !== id)
    db.collection('project').doc(projectId)
      .collection('budget').doc(dateId)
      .update({ [type]: targetList })
      .then(() =>  dispatch(asyncGetBudgetDayList(projectId, dateId)))
  }
  hasListItem = (list) => {
    const { type } = this.state
    let flag = false
    type.forEach(el => {
      if (list[el].length > 0) flag = true
    })
    return flag
  }
  componentWillUnmount() {
    this.props.dispatch(removeBudgetAllList())
  }
  render() {
    const {
      type,
      select_type,
      title,
      value,
      typeDropShowing,
      currencyDropShowing,
      typeDropStyling,
      currencyDropStyling,
      select_currency } = this.state

    const {
      lang,
      projectId,
      dateId,
      currencyList,
      list,
      text,
      user_currency,
      loading,
      AddBoardShowing,
      formateAmount,
      hideAddBoard
    } = this.props
    return (
      <div className='board-bottom'>
      {
        this.hasListItem(list)
        ?
        <div className='board-bottom'>
          <div className="i-item-wrap budget">
            {type.map((type, index) =>
              list[type].length > 0 &&
                <div
                  key={index}
                  className='i-item-type-wrap'>
                  <div className='i-item-type-topbar'></div>
                  {
                    list[type].map((el, index) =>
                      <List_Item
                        key={index + new Date()}
                        lang={lang}
                        text={text}
                        index={index}
                        item={el}
                        type={type}
                        projectId={projectId}
                        dateId={dateId}
                        user_currency={user_currency}
                        currencyList={currencyList}
                        deleteItem={this.deleteItem}
                        updateItem={this.updateItem}
                        formateAmount={formateAmount}
                      />
                    )
                  }
              </div>
            )}
            {
              loading&&
                <div className='sm-loader-wrap budget'>
                  <div className='sm-loader'></div>
                </div>
            }
            <div className='budget-list-total'>
              <div className='budget-list-item-total-title'>
                {text['total'][lang]}
              </div>
              <div className='budget-list-item-total-value'>
                {user_currency} {formateAmount(this.calcTotalCost())}
              </div>
            </div>
          </div>
        </div>
        :
        <>
          {
            loading
            ? 
            <div className='sm-loader-wrap'>
              <div className='sm-loader'></div>
            </div>
            : 
            <div className='list-empty-wrap'>
              <div className={`list-empty-img cost`}></div>
              <div className='list-empty-text cost'>
                {empty['budget_empty'][lang]}
              </div>
            </div>
          }
        </>
      }
      <AddForm
        lang={lang}
        text={text}
        currencyList={currencyList}
        currencyDropShowing={currencyDropShowing}
        select_currency={select_currency}
        value={value}
        title={title}
        select_type={select_type}
        typeDropShowing={typeDropShowing}
        AddBoardShowing={AddBoardShowing}
        type={type}
        typeDropStyling={typeDropStyling}
        currencyDropStyling={currencyDropStyling}
        hideAddBoard={hideAddBoard}
        setCostTitle={this.setCostTitle}
        setCostValue={this.setCostValue}
        setCostType={this.setCostType}
        addItemToDb={this.addItemToDb}
        showTypeDrop={this.showTypeDrop}
        showCurrencyDrop={this.showCurrencyDrop}
        setCostCurrency={this.setCostCurrency}
        closeAllDrop={this.closeAllDrop}
      />
      </div>
    )
  }
}

ListBoard.propTypes = {
  lang: PropTypes.number,
  projectId: PropTypes.string,
  dateId: PropTypes.string,
  currencyList: PropTypes.array,
  list: PropTypes.object,
  text: PropTypes.object,
  user_currency: PropTypes.string,
  loading: PropTypes.bool,
  AddBoardShowing: PropTypes.bool,
  formateAmount: PropTypes.func,
  hideAddBoard: PropTypes.func,
  dispatch: PropTypes.func
}

export default connect()(ListBoard)

