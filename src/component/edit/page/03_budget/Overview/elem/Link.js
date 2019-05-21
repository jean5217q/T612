import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import { setDateToNumber } from '../../../../../base';
import { week } from '../../../../../../data/Content';

class Link extends Component {
  deleteText = (lang) => {
    if (lang == 0) return 'Date'
    else return '日期'
  }
  render() {
    const { 
      id, 
      item, 
      index, 
      projectId, 
      openPopUp, 
      lang } = this.props
    let time = setDateToNumber(item['time'].seconds)
    return (
      <div
        className='daily-card basic'>
        {/* 刪除 */}
        <div
          className='daily-card-delete'
          onClick={() => openPopUp(id, `${this.deleteText(lang)} ${time.m} / ${time.d}`)}>
          <div className='icon'></div>
        </div>
        <NavLink
          to={{
            pathname: `/edit/budget/all/list/${index}`,
            search: `?project=${projectId}&date=${id}`
          }}
          className='daily-card-content'>
          <div className='main'>{time.m}.{time.d}</div>
          <div className='sub'>{week[time.w][lang]}</div>
        </NavLink>
      </div>
    )
  }
}

Link.propTypes = {
  lang: PropTypes.number,
  id: PropTypes.string,
  projectId: PropTypes.string,
  index: PropTypes.number,
  item: PropTypes.object,
  openPopUp: PropTypes.func
}

export default Link;