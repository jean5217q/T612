import React, { Component } from 'react';
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
      <div className='budget-project-item edit'>
        <div
          className='plan-delete'
          onClick={() => showDeletePopBoard(id, `${time.m} / ${time.d}`)}>
          <div className='plan-delete-icon'></div>
        </div>
        <NavLink
          to={{
            pathname: `/edit/itinerary/list/${index}`,
            search: `?project=${projectId}&date=${id}`
          }}
          className='plan-content'>
          <div className='plan-main-text'>{time.m}.{time.d}</div>
          <div className='plan-sub-text'>
            {Country[country] ? Country[country][lang] : country}
          </div>
        </NavLink>
      </div>
    )
  }
}

export default DayLink;