import React, { Component } from 'react';
import PropTypes from 'prop-types';
import DateSelector from './component/DateSelector';
import { country_text as text, btn } from '../../../../data/Content';

class Step2 extends Component {
  render() {
    const {
      lang,
      startDate,
      endDate,
      project,
      step2,
      creating,
      setProject,
      setStartDate,
      setEndDate,
      backToStep1,
      createProject
    } = this.props
    return (
      <div
        style={step2 ? { display: 'flex' } : { display: 'none' }}
        className="all-select-info-wrap">
        {
          lang == 0 
          ?
          <div className={`select-country-head lang-${lang}`}>
            <span>{text['fill_basic_title'][lang][0]}</span>
            <span>{text['fill_basic_title'][lang][1]}</span>
          </div>
          :
          <div className={`select-country-head lang-${lang}`}>
            {text['fill_basic_title'][lang].split('').map((el, index) =>
              <span key={index}>{el}</span>
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
                {text['project'][lang]}
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
                {text['from'][lang]}
              </label>
              <div className='select-info-value'>
                <DateSelector
                  date={startDate}
                  setDate={setStartDate}
                />
              </div>
            </div>
            {/* 回程時間 */}
            <div className="select-info-block">
              <label className={`select-info-title lang-${lang}`}>
                {text['to'][lang]}
              </label>
              <div className='select-info-value'>
                <DateSelector
                  date={endDate}
                  setDate={setEndDate}
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

Step2.propTypes = {
  lang: PropTypes.number,
  startDate: PropTypes.object,
  endDate: PropTypes.object,
  project: PropTypes.string,
  step2: PropTypes.bool,
  creating: PropTypes.bool,
  setProject: PropTypes.func,
  setStartDate: PropTypes.func,
  setEndDate: PropTypes.func,
  backToStep1: PropTypes.func,
  createProject: PropTypes.func
}

export default Step2