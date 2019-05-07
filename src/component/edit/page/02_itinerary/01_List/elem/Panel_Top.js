import React, { Component } from 'react'
import { formateMonthDay } from '../../../../../base'
import Panel_Top_time from './Panel_Top_Time';
import {
  asyncGetDateBasic,
  asyncGetProjectDayID
} from '../../../../../../action/itinerary'
import { connect } from 'react-redux';
import { week, plan } from '../../../../../../data/Content';
import { Country } from '../../../../../../data/country';
import { formateStartDate } from '../../../../../base';
class Panel_Top extends Component {
  state = {
    date: null,
    country: this.props.topBasic.country,
    showSelect: false,
    step1: true,
    changeLocation: false,
    changeDate: false
  }
  setDate = (e) => this.setState({ date: e })
  setCountry = (e) => this.setState({ country: e.target.value })
  openChangeDate = () => this.setState({ changeDate: true, step1: false })
  openChangeLocation = () => this.setState({ changeLocation: true, step1: false })
  //開關修改框(接回props資料)
  toggleSelect = () => {
    const { lang } = this.props
    const { time, country } = this.props.topBasic
    this.setState({
      date: new Date(time.seconds * 1000),
      country: Country[country] ? Country[country][lang] : country,
      showSelect: !this.state['showSelect'],
      changeLocation: false,
      changeDate: false,
    }, () => {
      if (this.state.showSelect) { this.setState({ step1: true }) }
    })
  }
  //更新資料
  updateCountry = (e) => {
    e.preventDefault()
    const {
      projectId,
      dateId,
      dispatch } = this.props
    const { country } = this.state
    console.log(country)
    this.setState({ showSelect: false })
    const db = firebase.firestore();
    db.collection('project').doc(projectId)
      .collection('itinerary').doc(dateId).update({ country: country, })
      .then(() => {
        dispatch(asyncGetDateBasic(projectId, dateId))
        dispatch(asyncGetProjectDayID(projectId))
      })
      .catch(err => console.log(err))
  }
  updateDate = (e) => {
    e.preventDefault()
    const {
      projectId,
      dateId,
      dispatch,
      list,
      getCurrentTimeArr,
      compareTime } = this.props
    let { date } = this.state
    date = formateStartDate(date)
    console.log(date)
    if (compareTime(getCurrentTimeArr(list), date)) return
    this.setState({ showSelect: false })
    const db = firebase.firestore();
    db.collection('project').doc(projectId)
      .collection('itinerary').doc(dateId).update({ time: date })
      .then(() => {
        dispatch(asyncGetDateBasic(projectId, dateId))
        dispatch(asyncGetProjectDayID(projectId))
      })
      .catch(err => console.log(err))
  }
  componentDidMount() {

  }
  render() {
    const { changeLocation, changeDate, showSelect, step1 } = this.state
    const { color, topBasic, lang } = this.props
    const { time, country } = topBasic
    const formate = formateMonthDay(time.seconds)
    return (
      <div className={`list-top color-${color}`}>
        <div className="list-top-inner">
          <div className={`top-title lang-${lang}`}>
            {Country[country] ? Country[country][lang] : country}
          </div>
          <div className="top-block">
            <div className="top-inner-block date">
              <span className="top-title date right">{`${formate.m}.${formate.d}`}</span>
              <span className="top-title-week">{week[formate.w][lang]}</span>
            </div>
            <div
              className="top-inner-block edit"
              onClick={this.toggleSelect}>
              <div className="top-edit-icon"></div>
            </div>
          </div>
        </div>
        {/* 編輯地點 */}
        <div className={`edit-list-top ${showSelect ? 'show' : null}`}>
          {/* 第一步 */}
          <div
            className='edit-top-step1'
            style={step1 ? { display: 'flex' } : { display: 'none' }}>
            <div
              className='step1-btn'
              onClick={this.openChangeLocation}>
              {plan['change_l'][lang]}
            </div>
            <div
              className='step1-btn'
              onClick={this.openChangeDate}>
              {plan['change_d'][lang]}
            </div>
          </div>

          {/* 第二步 地點 */}
          <div
            className='edit-top-inner'
            style={changeLocation ? { display: 'flex' } : { display: 'none' }}>
            <div className="edit-top-block">
              <div className="edit-top-title">{plan['location'][lang]}</div>
              <input
                className="edit-top-input"
                placeholder={plan['place_hold'][lang]}
                value={this.state.country}
                onChange={this.setCountry} />
            </div>
            <form
              className="edit-top-block"
              onSubmit={this.updateCountry}>
              <button
                className="edit-top-block-edit-buttom"
                type='submit'>{plan['submit'][lang]}
              </button>
            </form>
          </div>


          <div
            className='edit-top-inner'
            style={changeDate ? { display: 'flex' } : { display: 'none' }}>
            <div className="edit-top-block">
              <div className="edit-top-title">{plan['date'][lang]}</div>
              <div className="edit-top-date-input">
                <Panel_Top_time
                  date={this.state.date}
                  setDate={this.setDate} />
              </div>
            </div>
            <form
              onSubmit={this.updateDate}
              className="edit-top-block">
              <button
                className="edit-top-block-edit-buttom"
                type='submit'>{plan['submit'][lang]}
              </button>
            </form>
          </div>



        </div>
      </div>
    )
  }
}



export default connect()(Panel_Top);