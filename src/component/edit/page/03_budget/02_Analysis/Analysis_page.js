import React, { Component } from 'react';
import { connect } from 'react-redux';
import { asyncGetProjectAllBudget, removeBudgetAllList } from '../../../../../action/budget';
import Analysis_left from './Analysis_left';
import Analysis_right from './Analysis_right';
import Loading_Circle from '../../../../loading/Loading_Circle';
import { topBar, budget_text as txt, empty } from '../../../../../data/Content';


class Analysis extends Component {
  state = {
    type: [
      'transportation',
      'shopping',
      'entertainment',
      'food',
      'hotel',
      'others'
    ],
    s: []
  }
  calcTotal = (arr) => {
    const { user_currency } = this.props
    let total = arr.map(el => el[user_currency])
    total = total.reduce((acc, cur) => acc + cur, 0)
    return total
  }
  calcAll = (arr) => {
    let total = arr.map(el => el.value)
    total = total.reduce((acc, cur) => acc + cur, 0)
    return total
  }
  arrangeList = (list) => {
    let tempArr = []
    this.state.type.forEach(el => {
      tempArr.push({
        type: el,
        value: this.calcTotal(list[el])
      })
    })
    return tempArr
  }
  getTotal = (list) => {
    return this.calcAll(this.arrangeList(list))
  }
  checkEmpty = () => {
    let checkArr = []
    const { list } = this.props
    const { type } = this.state
    if (!list) return
    type.forEach(el => {
      if (list[el].length > 0) {
        checkArr.push('item')
      }
      else checkArr.push('none')
    })
    if (checkArr.length === type.length) {
      return checkArr
    }
    else return null
  }
  componentDidMount() {
    const { projectId, dispatch } = this.props
    dispatch(asyncGetProjectAllBudget(projectId))
  }
  componentWillUnmount() {
    console.log('leave')
    this.props.dispatch(removeBudgetAllList())
  }
  render() {
    let { list, color, lang, formateAmount, user_currency, checkArr } = this.props
    if (list && checkArr) {
      let flag = this.checkEmpty()
      if (flag.indexOf('item') !== -1) flag = true
      else flag = null
      return (
        <div className='edit-list-wrap'>
          <div className={`list-top color-${color}`}>
            <div className='list-top-inner'>
              <div className={`top-title lang-${lang}`}>
                {topBar['analysis'][lang]}
              </div>
            </div>
          </div>
          {
            checkArr.length > 0 ?
              <div className='budget-analysis-inner'>
                <Analysis_left
                  list={list}
                  arrangeList={this.arrangeList(list)}
                  total={this.getTotal(list)} />
                <Analysis_right
                  list={list}
                  arrangeList={this.arrangeList(list)}
                  total={this.getTotal(list)}
                  lang={lang}
                  txt={txt}
                  formateAmount={formateAmount}
                  user_currency={user_currency} />
              </div> :
              <div className='list-bottom'>

                <div className='list-empty-wrap'>
                  <div className='list-empty-img cost'></div>
                  <div className='list-empty-text cost'>{empty['budget_empty'][lang]}</div>
                </div>
              </div>

          }
        </div>)
    }
    else {
      return (
        <Loading_Circle />
      )
    }

  }
}

const mapStateToProps = (state) => {
  let list = state.budget.budgetCataList
  list = JSON.stringify(list) !== "{}" ? list : null
  console.log(state)
  return {
    list,
    checkArr: state.budget.checkArr
  }
}

export default connect(mapStateToProps)(Analysis);