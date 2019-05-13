import React, { Component } from 'react';
import { connect } from 'react-redux';
import Pie from './component/Pie';
import Form from './component/Form';
import Circle_Loading from '../../../../loading/Circle_Loading';
import { asyncGetAllProjectBudget, removeBudgetAllList } from '../../../../../action/budget';
import { topBar, budget_text as text, empty } from '../../../../../data/Content';

class Analysis extends Component {
  state = {
    typeList: [
      'transportation',
      'shopping',
      'entertainment',
      'food',
      'hotel',
      'others'
    ]
  }
  getTypeTotal = (typeList) => {
    const { user_currency } = this.props
    let total = typeList.map(el => el[user_currency])
    total = total.reduce((acc, cur) => acc + cur, 0)
    return total
  }
  getAllTotal = (list) => {
    const costList = this.getCostList(list)
    let total = costList.map(el => el.value)
    total = total.reduce((acc, cur) => acc + cur, 0)
    return total
  }
  getCostList = (list) => {
    let costList = []
    this.state.typeList.forEach(type => {
      costList.push({
        type: type,
        value: this.getTypeTotal(list[type])
      })
    })
    return costList
  }
  componentDidMount() {
    const { projectId, dispatch } = this.props
    dispatch(asyncGetAllProjectBudget(projectId))
  }
  componentWillUnmount() {
    this.props.dispatch(removeBudgetAllList())
  }
  render() {
    let { 
      lang, 
      color, 
      list, 
      user_currency, 
      checkArr, 
      formateAmount,  
    } = this.props
    if (list) {
      const costList = this.getCostList(list)
      const total = this.getAllTotal(list)
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
            checkArr
            ?
            <div className='budget-analysis-inner'>
              <Pie
                costList={costList}
                total={total} 
              />
              <Form
                costList={costList}
                total={total}
                lang={lang}
                text={text}
                formateAmount={formateAmount}
                user_currency={user_currency} 
              />
            </div> 
            :
            <div className='list-bottom'>
              <div className='list-empty-wrap'>
                <div className='list-empty-img cost'></div>
                <div className='list-empty-text cost'>
                  {empty['budget_empty'][lang]}
                </div>
              </div>
            </div>
          }
      </div>)
    }
    else return (<Circle_Loading />)
  }
}

const mapStateToProps = (state) => {
  return {
    list: state.budget.budgetCataList,
    checkArr: state.budget.checkArr
  }
}

export default connect(mapStateToProps)(Analysis);