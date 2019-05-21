import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Board_Wrap from '../../../../shareComponent/countryBoard/Board_Wrap';
import Board_Submit from './Board_Submit';
class Board_Controller extends Component {
  render() {
    const {
      lang,
      selected_countryList,
      addToCountryList,
      removeFromCountryList,
      updateCountryList,
      hideCountryBlock
    } = this.props
    return (
      <div
        className='all-select-counrey-wrap modify'>
        <div className='select-close-bar'>
          <div
            className='select-close-icon-wrap'
            onClick={hideCountryBlock}>
            <div className='select-close-icon'></div>
          </div>
        </div>
        <Board_Wrap
          lang={lang}
          addToCountryList={addToCountryList}/>
        {
          selected_countryList.length > 0&&
          <Board_Submit
            lang={lang}
            selected_countryList={selected_countryList}
            removeFromCountryList={removeFromCountryList}
            updateCountryList={updateCountryList}/>
        }
      </div>
    )
  }
}

Board_Controller.propTypes = {
  lang: PropTypes.number,
  selected_countryList: PropTypes.array,
  addToCountryList: PropTypes.func,
  removeFromCountryList: PropTypes.func,
  updateCountryList: PropTypes.func,
  hideCountryBlock: PropTypes.func
}

export default Board_Controller;