import React, { Component } from 'react';
import { connect } from 'react-redux';
import LinkItem from './component/LinkItem';
import Add_Btn from './component/Add_Btn';
import Delete_Pop from '../../../shareComponent/Delete_Pop';
import Empty from '../../../shareComponent/Empty';
import { asyncGetAllProject } from '../../../../action/itinerary';
import { empty } from '../../../../data/Content';
import { db } from '../../../base';

class Project extends Component {
  state = {
    delete_pop: false,
    deleteId: null,
    title: null
  }
  openDeletePopBlock = (id, title) => {
    this.setState({
      delete_pop: true,
      deleteId: id,
      title: title
    })
  }
  closeDeletePopBoard = () => {
    this.setState({
      delete_pop: false,
      deleteId: null,
      title: null
    })
  }
  deleteProject = () => {
    const { deleteId } = this.state
    const { uid, dispatch } = this.props
    db.collection('project').doc(deleteId).delete()
    .then(() => {
      this.closeDeletePopBoard();
      dispatch(asyncGetAllProject(uid))
    })
    .catch(err => alert('Error!'))
  }
  sortListbyStatus = (list) => {
    let sortList = list.map(el => {
      let { time, end_time } = el.item
      const startDate = time.seconds * 1000
      const endDate = (end_time.seconds + 86400 - 1) * 1000
      const nowTime = new Date().getTime()
      if (nowTime > endDate) return { ...el, status: 'completed' }
      else if (nowTime < startDate) return { ...el, status: 'coming' }
      else if (nowTime <= endDate && nowTime >= startDate) {
        return { ...el, status: 'ongoing' }
      }
    })
    return this.getFilterProject(sortList)
  }
  getFilterProject = (statusList) => {
    const { status } = this.props
    return statusList.filter(el => el.status === status)
  }
  render() {
    const { list, status, color, topBar, lang } = this.props
    const { delete_pop, title } = this.state
    const filterList = this.sortListbyStatus(list)
    return (
      <div className='edit-main-wrap'>
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
                  <LinkItem
                    key={index}
                    item={el.item}
                    id={el.id}
                    openDeletePopBlock={this.openDeletePopBlock} />
                )}
              </div>
            </div>
            :
            <Empty
              type='plan'
              text={empty['project_empty'][lang]} />
          }
          <Add_Btn />
          <Delete_Pop
            lang={lang}
            delete_pop={delete_pop}
            title={title}
            closeDeletePopBoard={this.closeDeletePopBoard}
            deleteProject={this.deleteProject}/>
        </div>
      </div>
    )
  }
}
export default connect()(Project)