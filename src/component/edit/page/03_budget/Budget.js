import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import List from './03_List/List_page';
import Prepared from './03_List/Prepared_page'
import Analysis from './02_Analysis/Analysis_page';
import OverView from './01_Overview/Overview_page';
import {
  asyncGetProjectAllBudget,
  removeBudgetAllList
} from '../../../../action/budget';
import { budget_text } from '../../../../data/Content';
import { country_coins, coins_icon, } from '../../../../data/currency_icon';




class Budget_page extends Component {
  //金額三位一點
  formateAmount = (amount) => {
    return (amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ','))
  }
  //取得使用者可以選擇的貨幣(國家+使用者+預設美元)
  getSelectCurrency = () => {
    const { basic, user } = this.props
    const { country } = basic
    let cur = []
    //找出旅行地的對應貨幣
    cur = country.map(el => country_coins[el])
    //旅行地不含使用者預設的貨幣=>加入
    if (!cur.includes(user.currency)) cur.push(user.currency)
    //無美金加入美金
    if (!cur.includes('USD')) cur.push('USD')
    return cur
  }
  componentDidMount() {
    const { projectId, dispatch } = this.props
    dispatch(asyncGetProjectAllBudget(projectId));
  }
  componentWillUnmount() {
    this.props.dispatch(removeBudgetAllList())
  }
  render() {
    const {
      projectId,
      dateId,
      getCurrentTimeArr,
      compareTime,
      idList,
      color,
      loading,
      lang,
      basic,
      user
    } = this.props
    const path = `/edit/budget`
    return (
      <div className='edit-main-wrap'>
        <Route
          exact path={`${path}/all`}
          render={() => <Redirect to={`${path}/all/overview?project=${projectId}`} />} />
        <Route
          path={`${path}/all/overview`}
          render={() =>
            <OverView
              projectId={projectId}
              idList={idList}
              getCurrentTimeArr={getCurrentTimeArr}
              compareTime={compareTime}
              color={color}
              loading={loading}
              lang={lang}
              txt={budget_text}
              basic={basic}
            />} />
        <Route
          path={`${path}/all/list/:index`}
          render={() =>
            <List
              projectId={projectId}
              dateId={dateId}
              idList={idList}
              getCurrentTimeArr={getCurrentTimeArr}
              compareTime={compareTime}
              color={color}
              loading={loading}
              formateAmount={this.formateAmount}
              lang={lang}
              txt={budget_text}
              basic={basic}
              getSelectCurrency={this.getSelectCurrency}
              user_currency={user.currency}
            />} />
        <Route
          path={`${path}/all/prepared_list`}
          render={() =>
            <Prepared
              projectId={projectId}
              color={color}
              loading={loading}
              formateAmount={this.formateAmount}
              lang={lang}
              txt={budget_text}
              basic={basic}
              getSelectCurrency={this.getSelectCurrency}
              user_currency={user.currency}
            />} />
        <Route
          path={`${path}/analysis`}
          render={() =>
            <Analysis
              projectId={projectId}
              color={color}
              lang={lang}
              formateAmount={this.formateAmount}
              txt={budget_text}
              basic={basic}
              user_currency={user.currency}
            />} />
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  let idList = state.budget.budgetDayIdList
  return {
    idList: idList,
    loading: state.budget.itemLoading
  }
}
export default connect(mapStateToProps)(Budget_page);