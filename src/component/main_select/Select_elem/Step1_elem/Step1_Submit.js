import React, { Component } from 'react';
import { country_text, btn } from '../../../../data/Content';

class Step1_Submit extends Component {
  render() {
    const {
      removeFromCountryList,
      countryList,
      goToStep2,
      formateCountry,
      lang
    } = this.props
    return (
      <div className='select-country-confirom-block'>
        {/* 選擇清單 */}
        <div className="country-confirm-block list">
          <ul className="country-confirm-list">
            <li className={`country-confirm-label lang-${lang}`}>
              {country_text['selected_country'][lang]}
            </li>
            {
              countryList.map((el, index) =>
                <li
                  key={index}
                  className={`country-confirm-item lang-${lang}`}>
                  <div className='country-confirm-text'>
                    {formateCountry[el][lang]}
                  </div>
                  <div
                    className='country-confirm-icon'
                    onClick={() => removeFromCountryList(el)}></div>
                </li>
              )
            }
          </ul>
        </div>
        {/* 下一步標籤 */}
        <div
          className='country-confirm-block submit'
          onClick={goToStep2}>
          <div className="country-confirm-button next">{btn['next'][lang]}</div>
        </div>
      </div>
    )
  }
}
export default Step1_Submit