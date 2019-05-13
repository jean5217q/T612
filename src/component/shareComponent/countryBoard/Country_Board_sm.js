import React, { Component } from 'react';
import { btn } from '../../../data/Content';

class Country_Board_sm extends Component {
  render() {
    const {
      stateList,
      areaList,
      countryList,
      selected_state,
      selected_area,
      selected_country,
      getSelectedState,
      getSelectedArea,
      setCountry,
      formateCountry,
      formateArea,
      formateState,
      stateTitle,
      areaTitle,
      countryTitle,
      addToCountryList,
      lang
    } = this.props
    return (
      <div className='select-country-panel sm'>
        {/* STATE */}
        <div className='country-selectbar-block'>
          <label className={`country-selectbar-title lang-${lang}`}>{stateTitle}</label>
          <div className='select-country-style'>
            <select
              className={`select-country-origin lang-${lang}`}
              onChange={getSelectedState}
              value={selected_state}>
              {
                stateList.map((el, index) =>
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
          <label className={`country-selectbar-title lang-${lang}`}>{areaTitle}</label>
          <div className='select-country-style'>
            <select
              className={`select-country-origin lang-${lang}`}
              onChange={getSelectedArea}
              value={selected_area}>
              {
                areaList.map((el, index) =>
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
          <label className={`country-selectbar-title lang-${lang}`}>{countryTitle}</label>
          <div className='select-country-style'>
            <select
              value={selected_country}
              onChange={setCountry}
              className={`select-country-origin lang-${lang}`} >
              {
                countryList.map((el, index) =>
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
            onClick={() => addToCountryList(selected_country)}>
            {btn['add'][lang]}
          </div>
        </div>
      </div>
    )
  }
}

export default Country_Board_sm