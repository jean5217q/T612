import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Board_Wrap from '../../../shareComponent/countryBoard/Board_Wrap';
import Board_Submit from './component/Board_Submit';
import * as nation from '../../../../data/country';
import { country_text as text } from '../../../../data/Content';

class Step1 extends Component {
  render() {
    const {
      lang,
      step2,
      goToStep2,
      addToCountryList,
      removeFromCountryList,
      selected_countryList
    } = this.props
    return (
      <div
        style={step2 ? { display: 'none' } : { display: 'flex' }}
        className='all-select-counrey-wrap'>
        {
          lang == 0
            ?
            <div className={`select-country-head lang-${lang}`}>
              <span>{text['select_title'][lang][0]}</span>
              <span>{text['select_title'][lang][1]}</span>
            </div>
            :
            <div className={`select-country-head lang-${lang}`}>
              {text['select_title'][lang].split('').map((el, index) =>
                <span key={index}>{el}</span>
              )}
            </div>
        }
        <Board_Wrap
          lang={lang}
          addToCountryList={addToCountryList}
        />
        {
          selected_countryList.length > 0&&
          <Board_Submit
            removeFromCountryList={removeFromCountryList}
            selected_countryList={selected_countryList}
            goToStep2={goToStep2}
            formateCountry={nation.Country}
            lang={lang}
          />
        }
      </div>
    )
  }
}

Step1.propTypes = {
  lang: PropTypes.number,
  step2: PropTypes.bool,
  goToStep2: PropTypes.func,
  addToCountryList: PropTypes.func,
  removeFromCountryList: PropTypes.func,
  selected_countryList: PropTypes.array
}

export default Step1;