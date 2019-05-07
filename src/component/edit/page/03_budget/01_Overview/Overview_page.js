import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import Link from './elem/Link';
import Date_Time from '../../../../share/Date_Time';
import { asyncGetProjectAllBudget } from '../../../../../action/budget';
import Loading_Circle from '../../../../loading/Loading_Circle';
import Propup_Delete from '../../../../share/popup/Popup_Delete';
import { itemLoading } from '../../../../../action/budget';
import { topBar, empty, btn } from '../../../../../data/Content';
class Overview extends Component {
  state = {
    date: new Date(),
    addPanel: false,
    popup: false,
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
  openPopUp = (id, title) => { this.setState({ popup: true, deleteId: id, title: title }) }
  closePopUp = () => {
    this.setState({ popup: false, deleteId: null, title: null })
  }
  addNewDate = () => {
    const { projectId, idList, compareTime, getCurrentTimeArr, dispatch } = this.props
    const { date } = this.state
    this.setState({ addPanel: false, empty: false })
    if (compareTime(getCurrentTimeArr(idList), date)) return
    dispatch(itemLoading(true))
    const db = firebase.firestore();
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
        this.props.dispatch(asyncGetProjectAllBudget(projectId))
      })
      .catch(err => console.log(err))
  }
  deleteDay = () => {
    const { projectId } = this.props
    const { deleteId } = this.state
    const db = firebase.firestore();
    db.collection('project').doc(projectId)
      .collection('budget').doc(deleteId).delete()
      .then(() => {
        this.closePopUp()
        this.props.dispatch(asyncGetProjectAllBudget(projectId))
      })
      .catch(err => console.log(err))
  }
  componentDidMount() {
    const { projectId } = this.props
    this.props.dispatch(asyncGetProjectAllBudget(projectId))
  }
  render() {
    const { date, addPanel, popup, title } = this.state
    const {
      idList,
      projectId,
      color,
      loading,
      lang,
      txt
    } = this.props
    if (idList.length > 0) {
      let list = idList.slice(0)
      let prepared = list.splice(0, 1)
      return (
        <div className='edit-list-wrap'>
          <div className={`list-top color-${color}`}>
            <div className='list-top-inner'>
              <div className={`top-title lang-${lang}`}>
                {topBar['b_overview'][lang]}
              </div>
              <div className="top-block">
              </div>
            </div>
          </div>
          <div className='list-bottom budget_overview'>
            <div className='budget-overview-inner'>
              <div className='budget-project-wrap'>
                {/* 預設 */}
                <div className='budget-project-block prepare'>
                  <NavLink
                    className='budget-project-item prepare'
                    to={{
                      pathname: `/edit/budget/all/prepared_list`,
                      search: `?project=${projectId}&date=${prepared[0].id}`
                    }}>
                    <div className='plan-content'>
                      <div className='plan-main-text prepared'>{txt['pre_trip'][lang]}</div>
                      <div
                        style={lang == '0' ? { display: 'block' } : { display: 'none' }}
                        className='plan-sub-text'>{txt['cost'][lang]}</div>
                    </div>
                  </NavLink>
                </div>
                <div className='budget-project-block date'>
                  {list.length > 0
                    ?
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
                    :
                    null
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
              < Propup_Delete
                popup={popup}
                closePopUp={this.closePopUp}
                title={title}
                deleteProject={this.deleteDay}
                lang={lang}
              />
            </div>
          </div>
        </div >
      )
    }
    else {
      return (
        <Loading_Circle />
      )
    }
  }
}



export default connect()(Overview);