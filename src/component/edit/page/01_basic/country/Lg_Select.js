import React, { Component } from 'react';
import { country_text } from '../../../../../data/Content';

class Lg_Select extends Component {
  hightLightSelector = () => {
    const { current_state, current_area } = this.props
    document.querySelectorAll('.country-state').forEach(el => el.classList.remove('select'))
    document.querySelectorAll('.country-area').forEach(el => el.classList.remove('select'))
    document.getElementById(current_state).classList.add('select')
    document.getElementById(current_area).classList.add('select')
  }
  componentDidMount() {
    this.hightLightSelector()
  }
  componentDidUpdate() {
    this.hightLightSelector()
  }
  render() {
    const {
      states,
      area,
      country,
      getRenderArea,
      getRenderCountry,
      formateCountry,
      formateArea,
      formateState,
      addToCountryList,
      lang
    } = this.props
    return (
      <div className='select-country-panel lg'>
        {/* TITLE */}
        <div className={`select-region-title lang-${lang}`}>
          <div className='region-title state'>{country_text['state'][lang]}</div>
          <div className='region-title area'>{country_text['area'][lang]}</div>
          <div className='region-title country'>{country_text['country'][lang]}</div>
        </div>
        <div className='select-region-panel'>
          {/* STATE */}
          <div className='state-wrap'>
            {
              states.map((el, index) =>
                <div
                  id={el}
                  key={index}
                  className={`country-state lang-${lang}`}
                  onMouseEnter={() => getRenderArea(el)}>
                  <span>{formateState[el][lang]}</span>
                </div>
              )
            }
          </div>
          {/* AREA */}
          <div className='area-wrap'>
            {
              area.map((el, index) =>
                <div
                  id={el}
                  key={index}
                  className={`country-area lang-${lang}`}
                  onMouseEnter={() => getRenderCountry(el)}>
                  <span>{formateArea[el][lang]}</span>
                </div>
              )
            }
          </div>
          {/* COUNTRY */}
          <div className='country-wrap'>
            <div className='country-wrap-inner'>
              {
                country.map((el, index) =>
                  <div
                    id={el}
                    key={index}
                    className={`region-country lang-${lang}`}
                    onClick={() => addToCountryList(el)}>
                    {
                      lang == 1 &&
                      <div className='sm-flag'>
                        <div
                          style={{ backgroundImage: 'url(' + require(`../../../../../images/country/${el}.svg`) + ')' }}
                          className='sm-flag-icon'
                        ></div>
                      </div>
                    }
                    <span>{formateCountry[el][lang]}</span>
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
export default Lg_Select