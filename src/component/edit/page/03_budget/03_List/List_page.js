//env
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getQuery } from '../../../../base';

import {
  asyncGetBudgetDayList,
  removeBudgetDayList,
} from '../../../../../action/budget'

//component
import Panel_Top from './elem/Budget_Panel_Top';
import Panel_List from './elem/Budget_Panel_List';
import Panel_Add from './elem/Budget_Panel_Add';
import Budget_Exchange from './elem/Budget_Exchange';
import Loading_Circle from '../../../../loading/Loading_Circle';

class List_page extends Component {
  state = {
    openAddFrame: false,
    openEditFrame: false,
    styleEditFrame: false,
    projectId: null,
    dateId: null,
    currency_arr: []
  }
  //dispaly none block opa
  //step1 展開編輯或刪除框
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
  //確認日期送出後回覆初始值
  resetEditFrame = () => { this.setState({ openEditFrame: false }) }
  toggleAddItem = () => { this.setState({ openAddFrame: true }) }
  closeAddItem = () => { this.setState({ openAddFrame: false }) }
  componentDidMount() {
    const { projectId, dateId } = getQuery();
    const { dispatch, getSelectCurrency } = this.props
    this.setState({ projectId, dateId })
    dispatch(asyncGetBudgetDayList(projectId, dateId));
    //currency
    this.setState({ currency_arr: getSelectCurrency() })
  }
  componentWillUnmount() {
    console.log('e')
    const { dispatch } = this.props
    dispatch(removeBudgetDayList())
  }
  render() {
    const {
      list,
      idList,
      color,
      formateAmount,
      lang,
      txt,
      user_currency } = this.props
    const {
      openAddFrame,
      openEditFrame,
      projectId,
      dateId,
      styleEditFrame,
      currency_arr
    } = this.state
    if (list && idList.length > 0) {
      let { time } = list
      return (
        <div className='edit-list-wrap'>
          <Panel_Top
            openEdit={this.openEdit}
            time={time}
            color={color}
            txt={txt}
            lang={lang} />
          <Budget_Exchange
            openEditFrame={openEditFrame}
            styleEditFrame={styleEditFrame}
            resetEditFrame={this.resetEditFrame}
            idList={idList}
            searchforExchange={this.searchforExchange}
            lang={lang}
            txt={txt}
          />
          <Panel_List
            openAddFrame={openAddFrame}
            closeAddItem={this.closeAddItem}
            list={list}
            projectId={projectId}
            dateId={dateId}
            formateAmount={formateAmount}
            lang={lang}
            txt={txt}
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
  let list = state.budget.budgetDayList
  return {
    list: list,
  }
}

export default connect(mapStateToProps)(List_page);