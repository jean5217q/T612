import React, { Component } from 'react';
import Form_Item from './Form_Item'

class Form extends Component {
  getCostList = () => {
    let { costList, total } = this.props
    return costList.map(listItem => {
      return {
        ...listItem,
        percentage: Math.round((listItem.value / total) * 100)
      }
    })
  }
  getCurrencyType = (total) => {
    const { user_currency } = this.props
    if (user_currency === 'USD') return total.toFixed(1)
    else return total
  }
  render() {
    const { 
      lang, 
      total, 
      user_currency,
      text, 
      formateAmount, 
    } = this.props
    return (
      <div className='budget-analysis-block bottom'>
        <div className='analysis-right-inner'>
          <div className='analysis-top'>
            <div className='analysis-top-text type'>
              {text['analysis']['type'][lang]}
            </div>
            <div className='analysis-top-text percent'>
              {text['analysis']['pct'][lang]}
            </div>
            <div className='analysis-top-text amount'>
              {text['analysis']['sum'][lang]}
            </div>
          </div>
          <div className='analysis-list'>
            {
              this.getCostList().map((el, index) =>
                <Form_Item
                  key={index}
                  lang={lang}
                  type={el.type}
                  total={el.value}
                  percent={el.percentage}
                  text={text}
                  formateAmount={formateAmount}
                  getCurrencyType={this.getCurrencyType} 
                />
              )
            }
            <div className='analysis-item total'>
              <div className='analysis-item-block total-text'>
                <div className='analysis-total-text'>
                  {text['total'][lang]}
                </div>
              </div>
              <div className='analysis-item-block total-amount'>
                <div className='analysis-total-text' >
                  {user_currency}.{formateAmount(this.getCurrencyType(total))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Form;