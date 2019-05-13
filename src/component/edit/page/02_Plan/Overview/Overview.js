import React, { Component } from 'react';
import { connect } from 'react-redux';
import DayLink from './component/DayLink';
import AddDayLink from './component/AddDayLink';
import Delete_Pop from '../../../../shareComponent/Delete_Pop';
import Circle_Loading from '../../../../loading/Circle_Loading';
import LoadingBoard from './component/LoadingBoard';
import EmptyBoard from './component/EmptyBoard';
import AddDayBtn from './component/AddDayBtn';
import { topBar, empty as emp, btn } from '../../../../../data/Content';
import { db,formateStartDate } from '../../../../base';
import { asyncGetProjectDayID, itemLoading } from '../../../../../action/itinerary';

class Overview extends Component {
  state = {
    date: new Date(),
    addDayBoardShowing: false,
    delete_pop: false,
    deleteId: null,
    title: null,
    empty: true
  }
  setDate = (e) => { this.setState({ date: e }) }
  showAddDayBoard = () => {
    const { list } = this.props
    let nextDay = new Date()
    //若project已有日期，加入下一天，沒有則使用當天日期
    if (list.length > 0) {
      nextDay = new Date((list[list.length - 1].item.time.seconds + 86400) * 1000)
    }
    this.setState({ addDayBoardShowing: true, date: nextDay, empty: false })
  }
  hideAddDayBoard = () => { this.setState({ addDayBoardShowing: false, empty: true }) }
  showDeletePopBoard = (id, title) => {
    this.setState({ delete_pop: true, deleteId: id, title: title })
  }
  closeDeletePopBoard = () => {
    this.setState({ delete_pop: false, deleteId: null, title: null })
  }
  addNewDate = () => {
    const {
      projectId,
      basic,
      list,
      getTimeList,
      findSameDay,
      findMaxTime,
      findMinTime,
      dispatch } = this.props
    const { date } = this.state
    this.setState({ addDayBoardShowing: false, empty: false })
    const timeList = list.map(el => el.item.time.seconds * 1000)
    const isMaxDate = findMaxTime(timeList, date)
    const isMinDate = findMinTime(timeList, date)
    if (findSameDay(getTimeList(list), date)) return
    dispatch(itemLoading(true))
    db.collection('project').doc(projectId)
      .collection('itinerary').add({
        time: formateStartDate(date),
        country: basic.country[0]
      })
      .then(() => { dispatch(asyncGetProjectDayID(projectId)) })
      .catch(err => alert('Error'))
    //若新增的天為最後一天或第一天，更新到project資訊
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
  removeDay = () => {
    const { projectId,dispatch } = this.props
    const { deleteId } = this.state
    db.collection('project').doc(projectId)
      .collection('itinerary').doc(deleteId).delete()
      .then(() => {
        this.closeDeletePopBoard()
        dispatch(asyncGetProjectDayID(projectId))
      })
      .catch(err => alert('Error'))
  }
  render() {
    const { 
      date, 
      addDayBoardShowing, 
      delete_pop, 
      title, 
      empty } = this.state
    const {
      lang,
      color,
      projectId,
      list,
      basic,
      loading } = this.props
    if (list && basic) {
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
                <div className='budget-project-block'>
                  {list.length > 0
                    ?
                    list.map((el, index) =>
                      <DayLink
                        key={index}
                        index={index}
                        id={el.id}
                        item={el.item}
                        projectId={projectId}
                        country={el.item.country}
                        showDeletePopBoard={this.showDeletePopBoard}
                        lang={lang}
                      />
                    )
                    :
                    <EmptyBoard 
                      empty={empty}
                      emp={emp}/>
                  }
                  <LoadingBoard loading={loading}/>
                  <AddDayLink
                    lang={lang}
                    date={date}
                    addDayBoardShowing={addDayBoardShowing}
                    btn={btn}
                    setDate={this.setDate}
                    addNewDate={this.addNewDate}
                    hideAddDayBoard={this.hideAddDayBoard}
                    />
                </div>
              </div>
              <AddDayBtn showAddDayBoard={this.showAddDayBoard}/>
            </div>
          </div>
          < Delete_Pop
            delete_pop={delete_pop}
            closeDeletePopBoard={this.closeDeletePopBoard}
            title={title}
            deleteProject={this.removeDay}
            lang={lang}
          />
        </div >
      )
    }
    else return (
      <Circle_Loading />
    )
  }
}




export default connect()(Overview);