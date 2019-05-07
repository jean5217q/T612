import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { formateMonthDay } from '../../../../base';
import { Country } from '../../../../../data/country'

//
class Link extends Component {
  render() {
    const { id, item, index, projectId, country, openPopUp, lang } = this.props
    let time = formateMonthDay(item['time'].seconds)
    return (
      <div className='budget-project-item edit'>
        <div
          className='plan-delete'
          onClick={() => openPopUp(id, `${time.m} / ${time.d}`)}>
          <div className='plan-delete-icon'></div>
        </div>
        <NavLink
          to={{
            pathname: `/edit/itinerary/list/${index}`,
            search: `?project=${projectId}&date=${id}`
          }}
          className='plan-content'>
          <div className='plan-main-text'>{time.m}.{time.d}</div>
          <div className='plan-sub-text'>{Country[country] ? Country[country][lang] : country}</div>
        </NavLink>
      </div>
    )
  }
}

export default connect()(Link);