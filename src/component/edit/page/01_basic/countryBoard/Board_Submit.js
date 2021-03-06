import React, { Component } from 'react';
import PropTypes from 'prop-types';
import SelectedCountryList from '../.././../../shareComponent/countryBoard/SelectedCountryList';
import { country_text, btn } from '../../../../../data/Content';

class Board_Submit extends Component {
  render() {
    const {
      lang,
      selected_countryList,
      removeFromCountryList,
      updateCountryList
    } = this.props
    return (
      <div className='select-country-confirom-block'>
        <SelectedCountryList
          selected_countryList={selected_countryList}
          removeFromCountryList={removeFromCountryList}
          lang={lang}/>
        <div
          className='country-confirm-block submit'
          onClick={updateCountryList}>
          <div className="country-confirm-button next">
            {btn['submit'][lang]}
          </div>
        </div>
      </div>
    )
  }
}

Board_Submit.propTypes = {
  lang: PropTypes.number,
  selected_countryList: PropTypes.array,
  removeFromCountryList: PropTypes.func,
  updateCountryList: PropTypes.func
}

export default Board_Submit