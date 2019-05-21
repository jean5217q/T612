import React, { Component } from 'react';
import PropTypes from 'prop-types';
import SelectedCountryList from '../../../../shareComponent/countryBoard/SelectedCountryList';
import { btn } from '../../../../../data/Content';

class Board_Submit extends Component {
  render() {
    const {
      lang,
      selected_countryList,
      goToStep2,
      removeFromCountryList
    } = this.props
    return (
      <div className='select-country-confirom-block'>
        <SelectedCountryList
          lang={lang}
          selected_countryList={selected_countryList}
          removeFromCountryList={removeFromCountryList}
        />
        <div
          className='country-confirm-block submit'
          onClick={goToStep2}>
          <div className="country-confirm-button next">
            {btn['next'][lang]}
          </div>
        </div>
      </div>
    )
  }
}

Board_Submit.propTypes = {
  lang: PropTypes.number,
  selected_countryList: PropTypes.array,
  goToStep2: PropTypes.func,
  removeFromCountryList: PropTypes.func,
}

export default Board_Submit

