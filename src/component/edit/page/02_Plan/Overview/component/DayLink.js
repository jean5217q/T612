import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import { setDateToNumber } from '../../../../../base';
import { Country } from '../../../../../../data/country'

class DayLink extends Component {
  render() {
    const {
      index,
      id,
      item,
      projectId,
      country,
      showDeletePopBoard,
      lang
    } = this.props
    let time = setDateToNumber(item['time'].seconds)
    return (
      <div className='daily-card basic'>
        <div
          className='daily-card-delete'
          onClick={() => showDeletePopBoard(id, `${time.m} / ${time.d}`)}>
          <div className='icon'></div>
        </div>
        <NavLink
          to={{
            pathname: `/edit/itinerary/list/${index}`,
            search: `?project=${projectId}&date=${id}`
          }}
          className='daily-card-content'>
          <div className='main'>{time.m}.{time.d}</div>
          <div className='sub'>
            {Country[country] ? Country[country][lang] : country}
          </div>
        </NavLink>
      </div>
    )
  }
}

DayLink.propTypes = {
  lang: PropTypes.number,
  index: PropTypes.number,
  id: PropTypes.string,
  item: PropTypes.object,
  projectId: PropTypes.string,
  country: PropTypes.string,
  showDeletePopBoard: PropTypes.func,
}

export default DayLink;