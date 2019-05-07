//env
import React, { Component } from 'react'
import Date2 from './Step2_elem/Date2'

import { country_text, btn } from '../../../data/Content';

class Step2 extends Component {
  render() {
    const {
      setProject,
      setFromDate,
      setToDate,
      fromDate,
      toDate,
      toStep2,
      project,
      backToStep1,
      createProject,
      fromBorder,
      creating,
      lang
    } = this.props
    return (
      <div
        style={toStep2 ? { display: 'flex' } : { display: 'none' }}
        className="all-select-info-wrap">
        {/* 大標 */}
        {
          lang == 0 ?
            <div className={`select-country-head lang-${lang}`}>
              <span>{country_text['fill_basic_title'][lang][0]}</span>
              <span>{country_text['fill_basic_title'][lang][1]}</span>
            </div>
            :
            <div className={`select-country-head lang-${lang}`}>
              {country_text['fill_basic_title'][lang].split('').map((el, index) =>
                <span key={index}>
                  {el}
                </span>
              )}
            </div>
        }
        <div className="select-info-inner">
          <div className='selec-back-bar'>
            <div
              className='select-back-icon-wrap'
              onClick={backToStep1}>
              <div className='select-back-icon'></div>
            </div>
          </div>
          <div className='select-info-panel'>
            {/* 計畫名稱 */}
            <div className="select-info-block">
              <label className={`select-info-title lang-${lang}`}>
                {country_text['project'][lang]}
              </label>
              <input
                className={`select-info-value lang-${lang}`}
                type="text"
                value={project}
                onChange={setProject} />
            </div>
            {/* 出發時間 */}
            <div className="select-info-block">
              <label className={`select-info-title lang-${lang}`}>
                {country_text['from'][lang]}
              </label>
              <div className='select-info-value'>
                <Date2
                  date={fromDate}
                  setDate={setFromDate}
                />
              </div>
            </div>
            {/* 回程時間 */}
            <div className="select-info-block">
              <label className={`select-info-title lang-${lang}`}>
                {country_text['to'][lang]}
              </label>
              <div className='select-info-value'>
                <Date2
                  date={toDate}
                  setDate={setToDate}
                />
              </div>
            </div>
            {/* 確認按鈕 */}
            <form
              onSubmit={createProject}
              className="select-info-block">
              <button
                className={`select-info-submit-btn lang-${lang}`}>
                {btn['create'][lang]}{creating && ' ...'}
              </button>
            </form>
          </div>
        </div>
      </div>
    )
  }
}

export default Step2