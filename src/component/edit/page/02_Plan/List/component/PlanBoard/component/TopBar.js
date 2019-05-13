import React, { Component } from 'react'
import { connect } from 'react-redux';
import MenuBoard from './topBar_element/MenuBoard';
import DateBoard from './topBar_element/DateBoard';
import LocationBoard from './topBar_element/LocationBoard';
import { asyncGetDateBasic, asyncGetProjectDayID
} from '../../../../../../../../action/itinerary'
import { week, plan } from '../../../../../../../../data/Content';
import { Country } from '../../../../../../../../data/country';
import { setDateToNumber,formateStartDate, db } from '../../../../../../../base';
class Panel_Top extends Component {
  state = {
    date: null,
    location: this.props.topBasic.country,
    menuBoard: true,
    setBoard: false,
    locationBoard: false,
    dateBoard: false
  }
  setDate = (e) => this.setState({ date: e })
  setLocation = (e) => this.setState({ location: e.target.value })
  showDateBoard = () => this.setState({ dateBoard: true, menuBoard: false })
  showLocationBoard = () => this.setState({ locationBoard: true, menuBoard: false })
  toggleSetBoard = () => {
    const { lang } = this.props
    const { time, country } = this.props.topBasic
    this.setState({
      date: new Date(time.seconds * 1000),
      location: Country[country] ? Country[country][lang] : country,
      setBoard: !this.state['setBoard'],
      locationBoard: false,
      dateBoard: false,
    }, () => {
      if (this.state.setBoard) { this.setState({ menuBoard: true }) }
    })
  }
  updateLocation = (e) => {
    e.preventDefault()
    const { location } = this.state
    this.updateDataToDb('country', location)
  }
  updateDate = (e) => {
    e.preventDefault()
    const {list, getTimeList, findSameDay } = this.props
    let { date } = this.state
    date = formateStartDate(date)
    if (findSameDay(getTimeList(list), date)) return
    this.updateDataToDb('time', date)
  }
  updateDataToDb = (property,value) => {
    const { projectId, dateId, dispatch } = this.props
    db.collection('project').doc(projectId)
      .collection('itinerary').doc(dateId).update({ [property]: value })
      .then(() => {
        dispatch(asyncGetDateBasic(projectId, dateId))
        dispatch(asyncGetProjectDayID(projectId))
      })
      .catch(err => alert('Error'))
    this.setState({ setBoard: false })
  }
  render() {
    const { 
      location,
      date, 
      menuBoard,
      locationBoard,
      dateBoard, 
      setBoard
    } = this.state
    const { color, topBasic, lang } = this.props
    const { time, country } = topBasic
    const formate = setDateToNumber(time.seconds)
    return (
      <div className={`list-top color-${color}`}>
        <div className="list-top-inner">
          <div className={`top-title lang-${lang}`}>
            {Country[country] ? Country[country][lang] : country}
          </div>
          <div className="top-block">
            <div className="top-inner-block date">
              <span className="top-title date right">
                {`${formate.m}.${formate.d}`}
              </span>
              <span className="top-title-week">
                {week[formate.w][lang]}
              </span>
            </div>
            <div
              className="top-inner-block edit"
              onClick={this.toggleSetBoard}>
              <div className="top-edit-icon"></div>
            </div>
          </div>
        </div>
        {/* 編輯 */}
        <div className={`edit-list-top ${setBoard&&'show'}`}>          
          <MenuBoard
            menuBoard={menuBoard}
            locationTitle= {plan['change_l'][lang]}
            dateTilte={plan['change_d'][lang]}
            showLocationBoard={this.showLocationBoard}
            showDateBoard={this.showDateBoard}/>
          <LocationBoard
            location={location}
            locationBoard={locationBoard}
            label={plan['location'][lang]}
            placeholder={plan['place_hold'][lang]}
            submit={plan['submit'][lang]}
            setLocation={this.setLocation}
            updateLocation={this.updateLocation}/>
          <DateBoard 
            date={date}
            dateBoard={dateBoard}
            label={plan['date'][lang]}
            submit={plan['submit'][lang]}
            setDate={this.setDate}
            updateDate={this.updateDate}/>
        </div>
      </div>
    )
  }
}

export default connect()(Panel_Top);