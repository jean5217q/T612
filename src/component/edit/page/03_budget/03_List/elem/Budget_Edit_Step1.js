import React, { Component } from 'react';
import Time from './Time';
import { connect } from 'react-redux';
import {
  asyncGetDayTime,
} from '../../../../../../action/budget'

class Budget_Edit_Step1 extends Component {
  state = {
    date: this.props.time,
    stopUpdate: false
  }
  //綁定時間
  setDate = (e) => {
    this.setState({
      date: e
    })
  }
  //取得已經慛在的時間
  getCurrentTimeArr = () => {
    let { idList } = this.props
    idList = idList.map(el => el.item).map(el => el.time).map(el => new Date(el.seconds * 1000))
    idList = idList.map(el => {
      return {
        y: el.getFullYear(),
        m: el.getMonth(),
        d: el.getDate()
      }
    })
    return idList
  }
  //比較輸入時間與已經有的時間
  compareTime = (arr) => {
    let { date } = this.state
    let flag = false
    date = {
      y: date.getFullYear(),
      m: date.getMonth(),
      d: date.getDate()
    }
    arr.forEach(el => {
      if (el.y === date.y && el.m === date.m && el.d === date.d) {
        alert('same day');
        flag = true
      }
    })
    return flag
  }
  //更新時間
  updateTime = () => {
    this.setState({
      stopUpdate: false
    })
    const {
      projectId,
      dateId,
      resetEditFrame,
      dispatch,
      getCurrentTimeArr,
      compareTime,
      idList } = this.props
    const { date } = this.state
    if (compareTime(getCurrentTimeArr(idList), date)) return
    resetEditFrame()
    const db = firebase.firestore();
    db.collection('project').doc(projectId)
      .collection('budget').doc(dateId).update({
        time: date
      })
      .then(() => {
        dispatch(asyncGetDayTime(projectId, dateId))
      })
      .catch(err => console.log(err))
  }
  componentDidMount() {

    this.getCurrentTimeArr()
  }
  componentWillReceiveProps() {
    this.setState({
      date: this.props.time
    })
  }
  render() {
    const {
      openEditFrame,
      lang
    } = this.props
    return (
      <div
        className={`edit-list-top ${openEditFrame ? 'show' : null}`}>
        <div className='edit-top-inner'>
          <div className='edit-top-block'>
            <div className='edit-top-title budget-title'>Date : </div>
            <div className='edit-top-date-input'>
              <Time
                date={this.state.date}
                setDate={this.setDate}
              />
            </div>
          </div>
          <form className='edit-top-block'>
            <button
              onClick={this.updateTime}
              className='edit-top-block-edit-buttom'
              type='submit'>Submit</button>
          </form>
        </div>
      </div>
    )
  }
}

export default connect()(Budget_Edit_Step1);


