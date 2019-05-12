import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import DayList from './List/DayList';
import Analysis from './Analysis/Analysis';
import OverView from './Overview/Overview';
import {
  asyncGetAllProjectBudget,
  removeBudgetAllList
} from '../../../../action/budget';
import { budget_text } from '../../../../data/Content';
import { country_coins } from '../../../../data/currency_icon';

class Budget_page extends Component {
  //1,000,000
  formateAmount = (amount) => {
    return (amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ','))
  }
  //取得使用者可以選擇的貨幣(國家+使用者+預設美元)
  getSelectCurrency = () => {
    const { basic, user } = this.props
    const { country } = basic
    let curList = []
    //找出旅行地的對應貨幣
    curList = country.map(el => country_coins[el])
    //旅行地不含使用者預設的貨幣=>加入
    if (!curList.includes(user.currency)) curList.push(user.currency)
    //無美金加入美金
    if (!curList.includes('USD')) curList.push('USD')
    return curList
  }
  componentDidMount() {
    const { projectId, dispatch } = this.props
    dispatch(asyncGetAllProjectBudget(projectId));
  }
  componentWillUnmount() {
    this.props.dispatch(removeBudgetAllList())
  }
  render() {
    const {
      lang,
      color,
      user,
      projectId,
      dateId,
      basic,
      idList,
      loading,
      getTimeList,
      findSameDay,
    } = this.props
    const path = `/edit/budget`
    return (
      <div className='edit-main-wrap'>
        <Route
          exact path={`${path}/all`}
          render={() => 
            <Redirect to={`${path}/all/overview?project=${projectId}`} />} />
        <Route
          path={`${path}/all/overview`}
          render={() =>
            <OverView
              lang={lang}
              color={color}
              projectId={projectId}
              idList={idList}
              basic={basic}
              text={budget_text}
              loading={loading}
              getTimeList={getTimeList}
              findSameDay={findSameDay}
            />} />
        <Route
          path={`${path}/all/list/:index`}
          render={() =>
            <DayList
              lang={lang}
              color={color}
              projectId={projectId}
              dateId={dateId}
              idList={idList}
              loading={loading}
              basic={basic}
              text={budget_text}
              user_currency={user.currency}
              getTimeList={getTimeList}
              findSameDay={findSameDay}
              formateAmount={this.formateAmount}
              getSelectCurrency={this.getSelectCurrency}   
            />} />
        <Route
          path={`${path}/analysis`}
          render={() =>
            <Analysis
              lang={lang}
              color={color}
              projectId={projectId}
              basic={basic}
              text={budget_text}
              user_currency={user.currency}
              formateAmount={this.formateAmount}
            />} />
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    idList: state.budget.budgetDayIdList,
    loading: state.budget.itemLoading
  }
}
export default connect(mapStateToProps)(Budget_page);