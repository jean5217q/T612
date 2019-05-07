import React, { Component } from 'react';
import { country_text, btn } from '../../../../data/Content';

class Sm_Select extends Component {
  render() {
    const {
      states,
      area,
      country,
      smgetRenderArea,
      smgetRenderCountry,
      smgetTargetCountry,
      formateCountry,
      formateArea,
      formateState,
      current_state,
      current_area,
      current_country,
      addToCountryList,
      lang
    } = this.props
    return (
      <div className='select-country-panel sm'>
        {/* STATE */}
        <div className='country-selectbar-block'>
          <label className={`country-selectbar-title lang-${lang}`}>
            {country_text['state'][lang]}
          </label>
          <div className='select-country-style'>
            <select
              className={`select-country-origin lang-${lang}`}
              onChange={smgetRenderArea}
              value={current_state}>
              {
                states.map((el, index) =>
                  <option
                    id={el}
                    key={index}
                    value={el}>{formateState[el][lang]}
                  </option>
                )
              }
            </select>
          </div>
        </div>
        {/* AREA */}
        <div className='country-selectbar-block'>
          <label className={`country-selectbar-title lang-${lang}`}>
            {country_text['area'][lang]}
          </label>
          <div className='select-country-style'>
            <select
              className={`select-country-origin lang-${lang}`}
              onChange={smgetRenderCountry}
              value={current_area}>
              {
                area.map((el, index) =>
                  <option
                    id={el}
                    key={index}
                    value={el}>{formateArea[el][lang]}
                  </option>
                )
              }
            </select>
          </div>
        </div>
        {/* COUNTRY */}
        <div className='country-selectbar-block'>
          <label className={`country-selectbar-title lang-${lang}`}>
            {country_text['country'][lang]}
          </label>
          <div className='select-country-style'>
            <select
              value={current_country}
              onChange={smgetTargetCountry}
              className={`select-country-origin lang-${lang}`} >
              {
                country.map((el, index) =>
                  <option
                    id={el}
                    key={index}
                    value={el}>{formateCountry[el][lang]}
                  </option>
                )
              }
            </select>
          </div>
        </div>
        <div className='country-selectbar-block'>
          <div
            className={`country-selectbar-add-btn lang-${lang}`}
            onClick={() => addToCountryList(current_country)}>
            {btn['add'][lang]}
          </div>
        </div>
      </div>
    )
  }
}

export default Sm_Select