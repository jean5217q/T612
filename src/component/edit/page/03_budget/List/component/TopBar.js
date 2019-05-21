import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { setDateToNumber } from '../../../../../base';
import { week, topBar } from '../../../../../../data/Content';

class TopBar extends Component {
  render() {
    const {
      lang,
      color,
      time,
      toggleExchangeBoard
    } = this.props
    const date = setDateToNumber(time.seconds)
    return (
      <div className={`board-top color-${color}`}>
        <div className="board-top-inner">
          <div className="top-block budget">
            <div className="top-inner-block budget">
              {
                time.seconds===-28800
                ?
                <span className={`top-title lang-${lang}`}>
                  {topBar['pre_trip'][lang]}
                </span>
                :
                <>
                <span className='top-title date'>{date.m}.{date.d}</span>
                <span className="top-title-week">{week[date.w][lang]}</span>
                </>
              }        
            </div>
            <div
              className="top-inner-block exchange"
              onClick={toggleExchangeBoard}>
              <i className="fas fa-exchange-alt exchange-icon"></i>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

TopBar.propTypes = {
  lang: PropTypes.number,
  color: PropTypes.string,
  time: PropTypes.object,
  toggleExchangeBoard: PropTypes.func
}


export default TopBar;