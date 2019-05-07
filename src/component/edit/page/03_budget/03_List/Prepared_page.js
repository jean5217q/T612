import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getQuery } from '../../../../base';
import Budget_Exchange from './elem/Budget_Exchange';
import {
  asyncGetBudgetDayList,
  removeBudgetDayList,
} from '../../../../../action/budget'
import { topBar } from '../../../../../data/Content'
//component
import Panel_List from './elem/Budget_Panel_List'; //main list
import Panel_Add from './elem/Budget_Panel_Add'; //add btn;
import Loading_Circle from '../../../../loading/Loading_Circle';




class Prepared_List_page extends Component {
  state = {
    openAddFrame: false,
    openEditFrame: false,
    styleEditFrame: false,
    projectId: null,
    dateId: null,
    currency_arr: []
  }
  openEdit = () => {
    if (this.state['openEditFrame']) {
      this.setState({
        styleEditFrame: false
      }, () => {
        setTimeout(() => this.setState({ openEditFrame: false }), 204)
      })
    }
    else {
      this.setState({
        openEditFrame: true
      }, () => {
        setTimeout(() => this.setState({ styleEditFrame: true }), 4)
      })
    }
  }
  //展開添加框
  resetEditFrame = () => { this.setState({ openEditFrame: false }) }
  toggleAddItem = () => {
    this.setState({
      openAddFrame: true
    })
  }
  //關閉添加框
  closeAddItem = () => {
    this.setState({
      openAddFrame: false
    })
  }
  componentDidMount() {
    const { projectId, dateId } = getQuery();
    const { dispatch, getSelectCurrency } = this.props
    dispatch(asyncGetBudgetDayList(projectId, dateId))
    this.setState({
      projectId,
      dateId,
      currency_arr: getSelectCurrency()
    })

  }
  componentWillUnmount() {
    const { dispatch } = this.props
    dispatch(removeBudgetDayList())
  }
  render() {
    const {
      list,
      color,
      formateAmount,
      lang,
      txt,
      user_currency
    } = this.props
    const {
      openAddFrame,
      openEditFrame,
      styleEditFrame,
      projectId,
      dateId,
      currency_arr
    } = this.state
    if (list) {
      return (
        <div className='edit-list-wrap'>
          <div className={`list-top color-${color}`}>
            <div className="list-top-inner">
              <div className="top-block budget">
                <div className="top-inner-block budget">
                  <span className={`top-title lang-${lang}`}>{topBar['pre_trip'][lang]}</span>
                </div>
                <div
                  className="top-inner-block exchange"
                  onClick={this.openEdit}>
                  <i className="fas fa-exchange-alt exchange-icon"></i>
                </div>
              </div>
            </div>
          </div>
          <Budget_Exchange
            openEditFrame={openEditFrame}
            styleEditFrame={styleEditFrame}
            resetEditFrame={this.resetEditFrame}
            searchforExchange={this.searchforExchange}
            lang={lang}
            txt={txt}
          />
          <Panel_List
            openAddFrame={openAddFrame}
            closeAddItem={this.closeAddItem}
            list={list}
            projectId={projectId}
            formateAmount={formateAmount}
            lang={lang}
            txt={txt}
            dateId={dateId}
            currency_arr={currency_arr}
            user_currency={user_currency}
          />
          <Panel_Add
            toggleAddItem={this.toggleAddItem}
            openAddFrame={openAddFrame}
            lang={lang}
          />
        </div>
      )
    }
    else {
      return (
        <Loading_Circle />
      )
    }
  }
}


const mapStateToProps = (state) => {
  console.log(state)
  let list = state.budget.budgetDayList
  list = JSON.stringify(list) !== "{}" ? list : null
  return {
    list: list,
  }
}

export default connect(mapStateToProps)(Prepared_List_page);