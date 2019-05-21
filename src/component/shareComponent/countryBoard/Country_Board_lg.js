import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Country_Board_lg extends Component {
  render() {
    const {
      stateList,
      areaList,
      countryList,
      selected_state,
      selected_area,
      formateCountry,
      formateArea,
      formateState,
      getSelectedState,
      getSelectedArea,
      addToCountryList,
      stateTitle,
      areaTitle,
      countryTitle,
      lang
    } = this.props
    return (
      <div className='select-country-panel lg'>
        {/* TITLE */}
        <div className={`select-region-title lang-${lang}`}>
          <div className='region-title state'>{stateTitle}</div>
          <div className='region-title area'>{areaTitle}</div>
          <div className='region-title country'>{countryTitle}</div>
        </div>
        <div className='select-region-panel'>
          {/* STATE */}
          <div className='state-wrap'>
            {
              stateList.map((state, index) =>
                <div
                  id={state}
                  key={index}
                  className={`country-state lang-${lang} ${state === selected_state && 'select'}`}
                  onMouseEnter={() => getSelectedState(state)}>
                  <span>{formateState[state][lang]}</span>
                </div>
              )
            }
          </div>
          {/* AREA */}
          <div className='area-wrap'>
            {
              areaList.map((area, index) =>
                <div
                  id={area}
                  key={index}
                  className={`country-area lang-${lang} ${area === selected_area && 'select'}`}
                  onMouseEnter={() => getSelectedArea(area)}>
                  <span>{formateArea[area][lang]}</span>
                </div>
              )
            }
          </div>
          {/* COUNTRY */}
          <div className='country-wrap'>
            <div className='country-wrap-inner'>
              {
                countryList.map((country, index) =>
                  <div
                    id={country}
                    key={index}
                    className={`region-country lang-${lang}`}
                    onClick={() => addToCountryList(country)}>
                    {
                      lang == 1 &&
                      <div className='sm-flag'>
                        <div 
                          style={{ backgroundImage: 'url(' + require(`../../../images/country/${country}.png`) + ')' }}
                          className='sm-flag-icon'>
                        </div>
                      </div>
                    }
                    <span>{formateCountry[country][lang]}</span>
                  </div>
                )
              }
            </div>
          </div>
        </div>
      </div>
    )
  }
}

Country_Board_lg.propTypes = {
  stateList: PropTypes.array,
  areaList: PropTypes.array,
  countryList: PropTypes.array,
  selected_state: PropTypes.string,
  selected_area: PropTypes.string,
  formateCountry: PropTypes.object,
  formateArea: PropTypes.object,
  formateState: PropTypes.object,
  getSelectedState: PropTypes.func,
  getSelectedArea: PropTypes.func,
  addToCountryList: PropTypes.func,
  stateTitle: PropTypes.string,
  areaTitle: PropTypes.string,
  countryTitle: PropTypes.string,
  lang: PropTypes.number
}

export default Country_Board_lg