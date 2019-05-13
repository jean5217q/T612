import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { setDateToNumber } from '../../../../../base';
import { week } from '../../../../../../data/Content';

class Link extends Component {
  deleteText = (lang) => {
    if (lang == 0) return 'Date'
    else return '日期'
  }
  render() {
    const { id, item, index, projectId, openPopUp, lang } = this.props
    let time = setDateToNumber(item['time'].seconds)
    return (
      <div
        className='budget-project-item edit'>
        {/* 刪除 */}
        <div
          className='plan-delete'
          onClick={() => openPopUp(id, `${this.deleteText(lang)} ${time.m} / ${time.d}`)}>
          <div className='plan-delete-icon'></div>
        </div>
        <NavLink
          to={{
            pathname: `/edit/budget/all/list/${index}`,
            search: `?project=${projectId}&date=${id}`
          }}
          className='plan-content'>
          <div className='plan-main-text'>{time.m}.{time.d}</div>
          <div className='plan-sub-text'>{week[time.w][lang]}</div>
        </NavLink>
      </div>
    )
  }
}

export default Link;