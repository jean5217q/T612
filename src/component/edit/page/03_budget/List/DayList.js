import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import TopBar from './component/TopBar';
import ListBoard from './component/ListBoard';
import AddButton from './component/AddButton';
import ExchangeBoard from './component/exchange_component/ExchangeBoard';
import Circle_Loading from '../../../../loading/Circle_Loading';
import { getQueryId } from '../../../../base';
import {
  asyncGetBudgetDayList,
  removeBudgetDayList,
} from '../../../../../action/budget'

class DayList extends Component {
  state = {
    AddBoardShowing: false,
    exchangeBoardShowing: false,
    exchangeBoardOpacity: false,
    projectId: null,
    dateId: null,
    currencyList: []
  }
  toggleExchangeBoard = () => {
    if (this.state['exchangeBoardShowing']) {
      this.setState({
        exchangeBoardOpacity: false
      }, () => {
        setTimeout(() => this.setState({ exchangeBoardShowing: false }), 204)
      })
    }
    else {
      this.setState({
        exchangeBoardShowing: true
      }, () => {
        setTimeout(() => this.setState({ exchangeBoardOpacity: true }), 4)
      })
    }
  }
  resetEditBoard = () => { this.setState({ exchangeBoardShowing: false }) }
  showAddBoard = () => { this.setState({ AddBoardShowing: true }) }
  hideAddBoard = () => { this.setState({ AddBoardShowing: false }) }
  componentDidMount() {
    const { projectId, dateId } = getQueryId();
    const { dispatch, getSelectCurrency } = this.props
    dispatch(asyncGetBudgetDayList(projectId, dateId));
    this.setState({ 
      projectId,
      dateId,
      currencyList: getSelectCurrency() 
    })
  }
  componentWillUnmount() {
    this.props.dispatch(removeBudgetDayList())
  }
  render() {
    const {
      projectId,
      dateId,
      currencyList,
      AddBoardShowing,
      exchangeBoardShowing,
      exchangeBoardOpacity,
    } = this.state

    const {
      lang,
      color,
      list,
      idList,
      text,
      user_currency,
      loading,
      formateAmount
    } = this.props
    if (list && idList.length > 0) {
      const { time } = list
      return (
        <div className='board'>
          <TopBar
            lang={lang}
            color={color}
            time={time}
            toggleExchangeBoard={this.toggleExchangeBoard}       
          />
          <ExchangeBoard
            lang={lang}
            text={text}
            exchangeBoardShowing={exchangeBoardShowing}
            exchangeBoardOpacity={exchangeBoardOpacity}
          />
          <ListBoard
            lang={lang}
            projectId={projectId}
            dateId={dateId}
            currencyList={currencyList}
            list={list}
            text={text}
            user_currency={user_currency}
            AddBoardShowing={AddBoardShowing}
            loading={loading}
            formateAmount={formateAmount}
            hideAddBoard={this.hideAddBoard}
          />
          <AddButton
            AddBoardShowing={AddBoardShowing}
            showAddBoard={this.showAddBoard}
          />
        </div>
      )
    }
    else return (<Circle_Loading />)
  }
}

const mapStateToProps = (state) => {
  return {
    list: state.budget.budgetDayList
  }
}

DayList.propTypes = {
  lang: PropTypes.number,
  color: PropTypes.string,
  list: PropTypes.object,
  idList: PropTypes.array,
  user_currency: PropTypes.string,
  text: PropTypes.object,
  loading: PropTypes.bool,
  dispatch: PropTypes.func,
  formateAmount: PropTypes.func,
  getSelectCurrency: PropTypes.func
}

export default connect(mapStateToProps)(DayList);