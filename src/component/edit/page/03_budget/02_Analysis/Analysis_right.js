import React, { Component } from 'react';
import Analysis_item from './Analysis_right_item'

class Analysis_right extends Component {
  state = {
    test: [1, 2, 3, 4, 5],
    data: []
  }
  componentDidMount() {
    const { arrangeList, list, total } = this.props
    let data = arrangeList.map(num => {
      return {
        ...num,
        percentage: Math.round((num.value / total) * 100)
      }
    })
    this.setState({
      data: data
    })
  }
  getArr = () => {
    const { arrangeList, list, total } = this.props
    let data = arrangeList.map(num => {
      return {
        ...num,
        percentage: Math.round((num.value / total) * 100)
      }
    })
    return data
  }
  currencyType = (total) => {
    const { user_currency } = this.props
    if (user_currency === 'USD') return total.toFixed(1)
    else return total
  }
  render() {
    const { total, txt, lang, formateAmount, user_currency } = this.props
    return (
      <div className='budget-analysis-block bottom'>
        <div className='analysis-right-inner'>
          <div className='analysis-top'>
            <div className='analysis-top-text type'>
              {txt['analysis']['type'][lang]}
            </div>
            <div className='analysis-top-text percent'>
              {txt['analysis']['pct'][lang]}
            </div>
            <div className='analysis-top-text amount'>
              {txt['analysis']['sum'][lang]}
            </div>
          </div>
          <div className='analysis-list'>
            {
              this.getArr().map((el, index) =>
                <Analysis_item
                  key={index}
                  type={el.type}
                  total={el.value}
                  percent={el.percentage}
                  lang={lang}
                  txt={txt}
                  formateAmount={formateAmount}
                  user_currency={user_currency}
                  currencyType={this.currencyType} />
              )
            }
            <div className='analysis-item total'>
              <div className='analysis-item-block total-text'>
                <div className='analysis-total-text'>{txt['total'][lang]}</div>
              </div>
              <div className='analysis-item-block total-amount'>
                <div className='analysis-total-text' >
                  {user_currency}.{formateAmount(this.currencyType(total))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}



export default Analysis_right;