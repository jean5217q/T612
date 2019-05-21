import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import Link from './elem/Link';
import Date_Time from '../../../../shareComponent/Time';
import { asyncGetAllProjectBudget } from '../../../../../action/budget';
import Circle_Loading from '../../../../loading/Circle_Loading';
import Delete_Pop from '../../../../shareComponent/Delete_Pop';
import { itemLoading } from '../../../../../action/budget';
import { topBar, empty, btn } from '../../../../../data/Content';
import { db } from '../../../../base';
class Overview extends Component {
  state = {
    date: new Date(),
    addPanel: false,
    delete_pop: false,
    deleteId: null,
    title: null,
    empty: true
  }
  setDate = (e) => { this.setState({ date: e }) }
  showAddPanel = () => {
    const { idList } = this.props
    let nextDay = new Date()
    if (idList.length > 1) {
      nextDay = new Date((idList[idList.length - 1].item.time.seconds + 86400) * 1000)
    }
    this.setState({ addPanel: true, date: nextDay, empty: false })
  }
  hideAddPanel = () => { this.setState({ addPanel: false, empty: true }) }
  openPopUp = (id, title) => this.setState({ delete_pop: true, deleteId: id, title: title })
  closeDeletePopBoard = () => {
    this.setState({ delete_pop: false, deleteId: null, title: null })
  }
  addNewDate = () => {
    const { projectId, idList, findSameDay, getTimeList, dispatch } = this.props
    const { date } = this.state
    this.setState({ addPanel: false, empty: false })
    if (findSameDay(getTimeList(idList), date)) return
    dispatch(itemLoading(true))
    db.collection('project').doc(projectId)
      .collection('budget').add({
        time: date,
        transportation: [],
        shopping: [],
        food: [],
        hotel: [],
        others: [],
        entertainment: []
      })
      .then(() => {
        this.props.dispatch(asyncGetAllProjectBudget(projectId))
      })
      .catch(err => console.log(err))
  }
  deleteDay = () => {
    const { projectId } = this.props
    const { deleteId } = this.state
    db.collection('project').doc(projectId)
      .collection('budget').doc(deleteId).delete()
      .then(() => {
        this.closeDeletePopBoard()
        this.props.dispatch(asyncGetAllProjectBudget(projectId))
      })
      .catch(err => console.log(err))
  }
  componentDidMount() {
    const { projectId,dispatch } = this.props
    dispatch(asyncGetAllProjectBudget(projectId))
  }
  render() {
    const { 
      date, 
      addPanel, 
      delete_pop, 
      title 
    } = this.state

    const {
      idList,
      projectId,
      color,
      loading,
      lang,
      text
    } = this.props
    if (idList.length > 0) {
      let list = idList.slice(0)
      let prepared = list.splice(0, 1)
      return (
        <div className='board'>
          <div className={`board-top color-${color}`}>
            <div className='board-top-inner'>
              <div className={`top-title lang-${lang}`}>
                {topBar['b_overview'][lang]}
              </div>
            </div>
          </div>
          <div className='board-bottom overview'>
                {/* 預設 */}
                <div className='overview-board prepare'>
                  <NavLink
                    className='daily-card prepare'
                    to={{
                      pathname: `/edit/budget/all/list/prior`,
                      search: `?project=${projectId}&date=${prepared[0].id}`
                    }}>
                    <div className='daily-card-content'>
                      <div className='main prepared'>{text['pre_trip'][lang]}</div>
                      <div
                        style={lang == '0' ? { display: 'block' } : { display: 'none' }}
                        className='sub'>{text['cost'][lang]}</div>
                    </div>
                  </NavLink>
                </div>
                <div className='overview-board date'>
                  {list.length > 0
                    &&
                    list.map((el, index) =>
                      <Link
                        key={index}
                        index={index}
                        id={el.id}
                        item={el.item}
                        projectId={projectId}
                        openPopUp={this.openPopUp}
                        loading={loading}
                        lang={lang}
                      />
                    )
                  }
                  < div
                    style={loading ? { display: 'flex' } : { display: 'none' }}
                    className='daily-card add'>
                    <div className='sm-loader-wrap'>
                      <div className='sm-loader'></div>
                    </div>
                  </div>
                  {/* 新增模板 */}
                  <div
                    style={addPanel ? { display: 'flex' } : { display: 'none' }}
                    className='daily-card add'>
                    <div className='daily-card-content'>
                      <Date_Time
                        date={date}
                        setDate={this.setDate} />
                      <div className='daily-board-btn'>
                        <div
                          className='btn add'
                          onClick={this.addNewDate}>{btn['add2'][lang]}</div>
                        <div
                          onClick={this.hideAddPanel}
                          className='btn cancel'>{btn['cancel'][lang]}</div>
                      </div>
                    </div>
                  </div>
                </div>
             
              < Delete_Pop
                delete_pop={delete_pop}
                closeDeletePopBoard={this.closeDeletePopBoard}
                title={title}
                deleteProject={this.deleteDay}
                lang={lang}
              />
          </div>
          <div className='add-btn-wrap'>  
            <div
              onClick={this.showAddPanel}
              className='add-btn'>
              <div className='icon'></div>
            </div>
          </div>
        </div >
      )
    }
    else {
      return (
        <Circle_Loading />
      )
    }
  }
}

Overview.propTypes = {
  lang: PropTypes.number,
  color: PropTypes.string,
  projectId: PropTypes.string,
  idList: PropTypes.array,
  text: PropTypes.object,
  loading: PropTypes.bool,
  dispatch: PropTypes.func, 
  getTimeList: PropTypes.func,
  findSameDay: PropTypes.func,
}

export default connect()(Overview);