import React, { Component } from 'react';
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
export default Board_Submit

