import React, { Component } from 'react';
import Project_Link from './Project_link';
import Project_add_btn from './Project_add_btn';
import Propup_Delete from '../../../share/popup/Popup_Delete';
import { asyncGetProjectAll } from '../../../../action/itinerary';
import { connect } from 'react-redux';
import Empty from '../../../share/empty/Empty';
import { empty } from '../../../../data/Content';

class Project_page extends Component {
  state = {
    popup: false,
    deleteId: null,
    title: null
  }
  openPopUp = (id, title) => {
    this.setState({
      popup: true,
      deleteId: id,
      title: title
    })
  }
  closePopUp = () => {
    this.setState({
      popup: false,
      deleteId: null,
      title: null
    })
  }
  deleteProject = () => {
    const { deleteId } = this.state
    const { uid, dispatch } = this.props
    const db = firebase.firestore();
    db.collection('project').doc(deleteId).delete()
      .then(() => {
        this.closePopUp();
        dispatch(asyncGetProjectAll(uid))
      })
      .catch(err => console.log(err))
  }
  JoinStatusToArr = (arr) => {
    let tempArr = arr.map(el => {
      let { time, end_time } = el.item
      const start = time.seconds * 1000
      let end = (end_time.seconds + 86400 - 1) * 1000
      console.log(new Date(end))
      const nowTime = new Date().getTime()
      if (nowTime > end) {
        return { ...el, status: 'completed' }
      }
      else if (nowTime < start) {
        return { ...el, status: 'coming' }
      }
      else if (nowTime <= end && nowTime >= start) {
        return { ...el, status: 'ongoing' }
      }
    })
    return this.getFilterArr(tempArr)
  }
  getFilterArr = (list) => {
    const { status } = this.props
    return list.filter(el => el.status === status)
  }
  render() {
    const { list, status, color, topBar, lang } = this.props
    const { popup, deleteId, title } = this.state
    let filterList = this.JoinStatusToArr(list)
    return (
      <div className='edit-list-wrap'>
        <div className={`list-top project color-${color}`}>
          <div className='list-top-inner'>
            <div className={`top-title lang-${lang}`}>
              {topBar[status][lang]}
            </div>
          </div>
        </div>
        {filterList.length > 0 ?
          <div className='list-bottom project'>
            <div className='profile-project-block'>
              {filterList.map((el, index) =>
                <Project_Link
                  key={index}
                  index={index}
                  item={el.item}
                  id={el.id}
                  openPopUp={this.openPopUp} />
              )}
            </div>
          </div>
          :
          <Empty
            type='plan'
            text={empty['project_empty'][lang]} />
          // <div className='list-empty-wrap'>
          //   <div className={`list-empty-img plan`}></div>
          //   <div className='list-empty-text'>No Project Yet</div>
          // </div>
        }
        <Project_add_btn />
        < Propup_Delete
          popup={popup}
          closePopUp={this.closePopUp}
          title={title}
          deleteProject={this.deleteProject}
          lang={lang}
        />
      </div>
    )
  }
}
export default connect()(Project_page)