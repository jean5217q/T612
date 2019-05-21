import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import { setDateToNumber } from '../../../../base';

class Plan_NavLink extends Component {
  render() {
    let { 
      date, 
      id, 
      projectId, 
      index, 
      closeNavBar 
    } = this.props
    date = setDateToNumber(date)
    return (
      <li className='sub-nav-item'>
        <NavLink
          to={{
              pathname: `/edit/itinerary/list/${index}/`,
              search: `?project=${projectId}&date=${id}`
            }}
          onClick={closeNavBar}
          className='sub-nav-link en-text'>
          {date.m} / {date.d}
        </NavLink>
      </li>
    )
  }
}

Plan_NavLink.propTypes = {
  date: PropTypes.number, 
  id: PropTypes.string, 
  projectId: PropTypes.string,
  index: PropTypes.number,
  closeNavBar: PropTypes.func,
}

export default Plan_NavLink;