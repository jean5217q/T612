import React, { Component } from 'react';
import { basic_text as text } from '../../../../../../data/Content';
import { formateCurrency } from '../../../../../../data/currency';
class Country_Item extends Component {
  state = {
    rate: '',
    photo: ''
  }
  getRate = () => {
    const { countryInfo, user } = this.props
    const currency = user.currency
    const url = `https://api.coinbase.com/v2/exchange-rates?currency=${currency}`
    fetch(url)
      .then(res => res.json())
      .then(json => {
        this.setState({
          rate: json.data.rates[countryInfo.rate]
        })
      })
  }
  componentWillMount() {
    this.getRate()
  }
  render() {
    const { countryInfo, user, style, lang } = this.props
    return (
      <div
        style={style}
        className="country-intro-item">
        {/* 上方 */}
        <div className="country-intro-block top">
          <div className='country-intro-flag-wrap'>
            <div
              className="country-intro-flag"
              style={{ backgroundImage: 'url(' + require(`../../../../../../images/country/${countryInfo.id}.svg`) + ')' }}>
            </div>
          </div>
          <div className="country-intro-title">{countryInfo.country[lang]}</div>
        </div>
        {/* 下方 */}
        <div className="country-intro-block bottom">
          {/* 首都 */}
          <div className="country-intro-detail">
            <div className='detail-top'>
              <div className='basic-sm-icon capital'></div>
              <div
                className={`country-intro-title-sub lang-${lang}`}>
                {text['capital'][lang]}
              </div>

            </div>
            <div className='detail-bottom'>
              <div
                className={`country-intro-value lang-${lang}`}>
                {countryInfo.capital[lang]}
              </div>
            </div>
          </div>
          {/* 電壓 */}
          <div className="country-intro-detail">
            <div className='detail-top'>
              <div className='basic-sm-icon voltage'></div>
              <div
                className={`country-intro-title-sub lang-${lang}`}>
                {text['voltage'][lang]}
              </div>
            </div>
            <div className='detail-bottom'>
              <div
                className={`country-intro-value lang-${lang}`}>
                {countryInfo.voltage}
              </div>
            </div>
          </div>
          {/* 語言 */}
          <div className="country-intro-detail">
            <div className='detail-top'>
              <div className='basic-sm-icon language'></div>
              <div
                className={`country-intro-title-sub lang-${lang}`}>
                {text['language'][lang]}
              </div>
            </div>
            <div className='detail-bottom'>
              <div
                className={`country-intro-value lang-${lang}`}>
                {countryInfo.language[lang]}
              </div>
            </div>
          </div>
          {/* 匯率 */}
          <div className="country-intro-detail">
            <div className='detail-top'>
              <div className='basic-sm-icon exchange'></div>
              <div
                className={`country-intro-title-sub lang-${lang}`}>
                {text['rate'][lang]}
              </div>
            </div>
            <div className='detail-bottom'>
              <div className={`country-intro-value rate lang-${lang}`}>
                <span className="place1">
                  1{formateCurrency[user.currency][lang]}
                </span>
                <span className="equal-span">=</span>
                <span className="place2">{this.state.rate}{countryInfo.currency[lang]}</span>
                <span className="change-rate"></span>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Country_Item