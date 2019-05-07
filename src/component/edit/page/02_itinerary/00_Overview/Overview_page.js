import React, { Component } from 'react';
import { connect } from 'react-redux';
import Link from './Link';
import Date_Time from '../../../../share/Date_Time';
import { asyncGetProjectDayID, itemLoading } from '../../../../../action/itinerary';
import Propup_Delete from '../../../../share/popup/Popup_Delete';
import { formateStartDate } from '../../../../base';
import Loading_Circle from '../../../../loading/Loading_Circle';
import { topBar, empty as emp, btn } from '../../../../../data/Content';

class Overview extends Component {
  state = {
    date: new Date(),
    addPanel: false,
    popup: false,
    deleteId: null,
    title: null,
    empty: true
  }
  //新增項目綁定日期
  setDate = (e) => { this.setState({ date: e }) }
  //展開新增項目
  showAddPanel = () => {
    const { list } = this.props
    let nextDay = new Date()
    if (list.length > 0) {
      nextDay = new Date((list[list.length - 1].item.time.seconds + 86400) * 1000)
    }
    this.setState({ addPanel: true, date: nextDay, empty: false })
  }
  //關閉新增項目
  hideAddPanel = () => { this.setState({ addPanel: false, empty: true }) }
  openPopUp = (id, title) => {
    this.setState({ popup: true, deleteId: id, title: title })
  }
  closePopUp = () => {
    this.setState({ popup: false, deleteId: null, title: null })
  }
  addNewDate = () => {
    const {
      projectId,
      basic,
      list,
      compareTime,
      getCurrentTimeArr,
      findMaxTime,
      findMinTime,
      dispatch } = this.props
    const { date } = this.state
    this.setState({ addPanel: false, empty: false })
    const timeList = list.map(el => el.item.time.seconds * 1000)
    const isMaxDate = findMaxTime(timeList, date)
    const isMinDate = findMinTime(timeList, date)
    if (compareTime(getCurrentTimeArr(list), date)) return
    dispatch(itemLoading(true))
    const db = firebase.firestore();
    db.collection('project').doc(projectId)
      .collection('itinerary').add({
        time: formateStartDate(date),
        country: basic.country[0]
      })
      .then(() => { dispatch(asyncGetProjectDayID(projectId)) })
      //時間處理

      .catch(err => console.log(err))
    if (isMaxDate) {
      db.collection('project').doc(projectId).update({
        end_time: formateStartDate(date)
      })
    }
    if (isMinDate) {
      db.collection('project').doc(projectId).update({
        time: formateStartDate(date)
      })
    }
  }
  deleteDay = () => {
    const { projectId } = this.props
    const { deleteId } = this.state
    const db = firebase.firestore();
    db.collection('project').doc(projectId)
      .collection('itinerary').doc(deleteId).delete()
      .then(() => {
        this.closePopUp()
        this.props.dispatch(asyncGetProjectDayID(projectId))
      })
      .catch(err => console.log(err))
  }
  render() {
    const { date, addPanel, popup, title, empty } = this.state
    const {
      list,
      color,
      basic,
      projectId,
      loading,
      lang } = this.props

    if (list && basic) {
      console.log(list)
      return (

        <div className='edit-list-wrap'>
          <div className={`list-top color-${color}`}>
            <div className='list-top-inner'>
              <div className={`top-title lang-${lang}`}>
                {topBar['p_overView'][lang]}
              </div>
            </div>
          </div>
          <div className='list-bottom budget_overview'>
            <div className='budget-overview-inner'>
              <div className='budget-project-wrap'>
                {/* 預設 */}
                <div className='budget-project-block'>
                  {list.length > 0
                    ?
                    list.map((el, index) =>
                      <Link
                        key={index}
                        index={index}
                        id={el.id}
                        item={el.item}
                        projectId={projectId}
                        country={el.item.country}
                        openPopUp={this.openPopUp}
                        loading={loading}
                        lang={lang}
                      />
                    )
                    :
                    <div
                      style={!empty ? { display: 'none' } : { display: 'flex' }}
                      className='list-empty-wrap overview'>
                      <div className={`list-empty-img plan`}></div>
                      <div className='list-empty-text cost'>{emp['p_day_empty'][lang]}</div>
                    </div>
                  }
                  < div
                    style={loading ? { display: 'flex' } : { display: 'none' }}
                    className='budget-project-item add'>
                    <div className='sm-loader-wrap'>
                      <div className='sm-loader'></div>
                    </div>
                  </div>
                  {/* 新增模板 */}
                  <div
                    style={addPanel ? { display: 'flex' } : { display: 'none' }}
                    className='budget-project-item add'>
                    <div className='plan-content'>
                      <Date_Time
                        date={date}
                        setDate={this.setDate} />
                      <div className='budget-add-list-btn-wrap'>
                        <div
                          className='budget-project-add-list-btn add'
                          onClick={this.addNewDate}>{btn['add2'][lang]}</div>
                        <div
                          onClick={this.hideAddPanel}
                          className='budget-project-add-list-btn'>{btn['cancel'][lang]}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div
                onClick={this.showAddPanel}
                className='add-list-btn'>
                <div className='add-list-btn-icon'></div>
              </div>
            </div>
          </div>
          < Propup_Delete
            popup={popup}
            closePopUp={this.closePopUp}
            title={title}
            deleteProject={this.deleteDay}
            lang={lang}
          />
        </div >
      )
    }
    else return (
      <Loading_Circle />
    )
  }
}




export default connect()(Overview);