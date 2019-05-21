import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { country_text as text } from '../../../data/Content';
import { Country } from '../../../data/country'

class SelectedCountry_List extends Component {
  render() {
    const {
      lang,
      removeFromCountryList,
      selected_countryList,
    } = this.props
    const formateCountry = Country
    return (
      <div className="country-confirm-block list">
        <ul className="country-confirm-list">
          <li className={`country-confirm-label lang-${lang}`}>
            {text['selected_country'][lang]}
          </li>
        {
          selected_countryList.map((country, index) =>
            <li
              key={index}
              className={`country-confirm-item lang-${lang}`}>
              <div className='country-confirm-text'>
                {formateCountry[country][lang]}
              </div>
              <div
                className='country-confirm-icon'
                onClick={() => removeFromCountryList(country)}>
              </div>
            </li>
          )
        }
      </ul>
    </div>  
    )
  }
}

SelectedCountry_List.propTypes = {
  lang: PropTypes.number,
  removeFromCountryList: PropTypes.func,
  selected_countryList: PropTypes.array
}

export default SelectedCountry_List