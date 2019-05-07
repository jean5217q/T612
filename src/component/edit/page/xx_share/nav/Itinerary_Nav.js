//env
import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { formateMonthDay } from '../../../../base';

class Itinerary_Nav extends Component {
  render() {
    let { date, id, projectId, test,closeNav } = this.props
    date = formateMonthDay(date)
    return (
      <li className='sub-nav-item'>
        <NavLink
          to={
            {
              pathname: `/edit/itinerary/list/${test}/`,
              search: `?project=${projectId}&date=${id}`
            }
          }
          onClick={closeNav}
          className='sub-nav-link en-txt'
        >{date.m} / {date.d}
        </NavLink>
      </li>
    )
  }
}

export default Itinerary_Nav;