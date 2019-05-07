
import React, { Component } from 'react';
import { connect } from 'react-redux';
import BudgetList_Item from './Budget_List_Item';
import {
  asyncGetBudgetDayList,
  removeBudgetAllList,
  itemLoading
} from '../../../../../../action/budget';
import Budget_Add_Form from './Budget_Add_form';
import Sm_Loading from '../../../../../loading/Loading_Circle';
import { empty } from '../../../../../../data/Content';
import { coins_icon } from '../../../../../../data/currency_icon';



class Budget_List_Panel extends Component {
  state = {
    select_type: 'transportation',
    title: '',
    value: '',
    addLoading: false,
    type: ['transportation', 'shopping', 'entertainment', 'food', 'hotel', 'others'],
    selectBar: false,
    currencyBar: false,
    typeDropStyle: false,
    currencyDropStyle: false,
    select_currency: this.props.user_currency
  }
  closeDrop = (e) => {
    console.log(e.target)
    if (e.target.classList.contains('add-budget-form-inner')) {
      this.setState({
        selectBar: false,
        currencyBar: false,
        typeDropStyle: false,
        currencyDropStyle: false
      })
    }

  }
  openSelect = () => {
    const { selectBar } = this.state
    if (selectBar === false) {
      this.setState({ typeDropStyle: true })
    }
    else this.setState({ typeDropStyle: false })
    this.setState(
      { selectBar: !this.state['selectBar'] }
    )
  }
  openCurrency = () => {
    const { currencyBar } = this.state
    if (currencyBar === false) {
      this.setState({ currencyDropStyle: true })
    }
    else this.setState({ currencyDropStyle: false })
    this.setState({ currencyBar: !this.state['currencyBar'] })
  }
  setType = (el) => {
    this.setState({
      select_type: el,
      selectBar: false,
      typeDropStyle: false,
    })
  }
  setTitle = (e) => {
    this.setState({
      title: e.target.value
    })
  }
  setValue = (e) => {
    this.setState({
      value: e.target.value
    })
  }
  setCurrency = (el) => {
    this.setState({ select_currency: el, currencyBar: false })
  }
  calcTotal = () => {
    let price = []
    const { type } = this.state
    const { user_currency, list } = this.props
    type.forEach(el => {
      list[el].forEach(item => price.push((item[user_currency])))
    })
    let total = price.reduce((acc, cur) => acc + cur, 0)
    if (user_currency === 'USD') return total.toFixed(1)
    else return total
  }
  calcExchange = (callBack) => {
    const url = `https://api.coinbase.com/v2/exchange-rates?currency=USD`
    fetch(url)
      .then(res => res.json())
      .then(json => {
        let result = json.data.rates
        let usd = (value / result[select_currency])
        let twd = (usd * result['TWD'])
        let rmb = (usd * result['CNY'])
        usd = parseFloat(usd.toFixed(1))
        twd = parseInt(twd.toFixed(0))
        rmb = parseInt(rmb.toFixed(0))
      })
  }
  addBudgetToDb = (e) => {
    e.preventDefault()
    const { projectId, dateId, closeAddItem, dispatch } = this.props
    const { select_type, select_currency, title, value } = this.state
    if (!select_type && title === '' && value === '') return
    dispatch(itemLoading(true))
    closeAddItem()
    //接匯率api
    const url = `https://api.coinbase.com/v2/exchange-rates?currency=USD`
    fetch(url)
      .then(res => res.json())
      .then(json => {
        let result = json.data.rates
        let usd = (value / result[select_currency])
        let twd = (usd * result['TWD'])
        let rmb = (usd * result['CNY'])
        usd = parseFloat(usd.toFixed(1))
        twd = parseInt(twd.toFixed(0))
        rmb = parseInt(rmb.toFixed(0))
        const db = firebase.firestore();
        db.collection('project').doc(projectId)
          .collection('budget').doc(dateId)
          .update({
            [select_type]: firebase.firestore.FieldValue.arrayUnion(
              {
                title: title,
                value: parseInt(value),
                USD: usd,
                TWD: twd,
                RMB: rmb,
                inputIcon: coins_icon[select_currency],
                currency: select_currency
              })
          })
          .then(() => {
            this.setState({ select_type: 'transportation', title: '', value: '', })
            dispatch(asyncGetBudgetDayList(projectId, dateId))
          })
      })

  }
  deleteItem = (id, type) => {
    const { projectId, dateId, dispatch, list } = this.props
    let targetList = list[type]
    targetList = targetList.filter((el, index) => index !== id)
    const db = firebase.firestore();
    db.collection('project').doc(projectId)
      .collection('budget').doc(dateId)
      .update({ [type]: targetList })
      .then(() => {
        dispatch(asyncGetBudgetDayList(projectId, dateId))
      })
  }
  editItem = (id, type, updateObj) => {
    const { projectId, dateId, dispatch, list } = this.props
    const url = `https://api.coinbase.com/v2/exchange-rates?currency=USD`
    fetch(url)
      .then(res => res.json())
      .then(json => {
        let result = json.data.rates
        let usd = (updateObj.value / result[updateObj.currency])
        let twd = (usd * result['TWD'])
        let rmb = (usd * result['CNY'])
        usd = parseFloat(usd.toFixed(1))
        twd = parseInt(twd.toFixed(0))
        rmb = parseInt(rmb.toFixed(0))

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
        const db = firebase.firestore();
        db.collection('project').doc(projectId)
          .collection('budget').doc(dateId)
          .update({ [type]: targetList })
          .then(() => {
            dispatch(asyncGetBudgetDayList(projectId, dateId))
          })
      })
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
      selectBar,
      currencyBar,
      typeDropStyle,
      currencyDropStyle,
      select_currency } = this.state
    let {
      openAddFrame,
      closeAddItem,
      list,
      projectId,
      dateId,
      loading,
      formateAmount,
      lang,
      txt,
      currency_arr,
      user_currency
    } = this.props
    if (this.hasListItem(list)) {
      return (
        <div className='list-bottom'>
          <div className="i-item-wrap budget">
            {type.map((type, index) =>
              list[type].length > 0 ?
                <div
                  key={index}
                  className='i-item-type-wrap'>
                  <div className='i-item-type-topbar'>
                  </div>
                  {
                    list[type].map((el, index) =>
                      <BudgetList_Item
                        key={index + new Date()}
                        index={index}
                        item={el}
                        type={type}
                        projectId={projectId}
                        dateId={dateId}
                        deleteItem={this.deleteItem}
                        editItem={this.editItem}
                        formateAmount={formateAmount}
                        lang={lang}
                        txt={txt}
                        user_currency={user_currency}
                        currency_arr={currency_arr}
                      />
                    )
                  }
                </div>
                : null
            )}
            {
              loading ?
                <div className='sm-loader-wrap budget'>
                  <div className='sm-loader'></div>
                </div> : null
            }
            <div className='budget-list-total'>
              <div className='budget-list-item-total-title'>{txt['total'][lang]}</div>
              <div className='budget-list-item-total-value'>
                {user_currency}.
                {formateAmount(this.calcTotal())}
              </div>
            </div>
            {/* 添加form */}
          </div>
          <Budget_Add_Form
            value={value}
            title={title}
            select_type={select_type}
            selectBar={selectBar}
            openAddFrame={openAddFrame}
            closeAddItem={closeAddItem}
            type={type}
            setTitle={this.setTitle}
            setValue={this.setValue}
            setType={this.setType}
            addBudgetToDb={this.addBudgetToDb}
            openSelect={this.openSelect}
            openCurrency={this.openCurrency}
            lang={lang}
            txt={txt}
            currency_arr={currency_arr}
            currencyBar={currencyBar}
            select_currency={select_currency}
            setCurrency={this.setCurrency}
            closeDrop={this.closeDrop}
            typeDropStyle={typeDropStyle}
            currencyDropStyle={currencyDropStyle}
          />
        </div>
      )
    }
    else {
      return (
        <div className='list-bottom'>
          {
            loading
              ? <div className='sm-loader-wrap'>
                <div className='sm-loader'></div>
              </div>
              : <div className='list-empty-wrap'>
                <div className={`list-empty-img cost`}></div>
                <div className='list-empty-text cost'>{empty['budget_empty'][lang]}</div>
              </div>
          }
          <Budget_Add_Form
            value={value}
            title={title}
            select_type={select_type}
            selectBar={selectBar}
            openAddFrame={openAddFrame}
            closeAddItem={closeAddItem}
            type={type}
            setTitle={this.setTitle}
            setValue={this.setValue}
            setType={this.setType}
            addBudgetToDb={this.addBudgetToDb}
            openSelect={this.openSelect}
            openCurrency={this.openCurrency}
            lang={lang}
            txt={txt}
            currency_arr={currency_arr}
            currencyBar={currencyBar}
            select_currency={select_currency}
            setCurrency={this.setCurrency}
            closeDrop={this.closeDrop}
            typeDropStyle={typeDropStyle}
            currencyDropStyle={currencyDropStyle}
          />
        </div>
      )
    }
  }
}


const mapStateToProps = (state) => {
  return {
    loading: state.budget.itemLoading
  }
}
export default connect(mapStateToProps)(Budget_List_Panel)