import React, { Component } from 'react';
import TopBar from './component/TopBar';
import ListBoard from './component/ListBoard';
import AddButton from './component/AddButton';

class PlanBoard extends Component {
  render() {
    let {
      dateId,
      projectId,
      list,
      color,
      getTimeList,
      findSameDay,
      topBasic,
      planList,
      loading,
      goToStep2,
      getEditData,
      lang
    } = this.props
    return (
      <div className='edit-list-wrap'>
        <TopBar
          topBasic={topBasic}
          projectId={projectId}
          dateId={dateId}
          list={list}
          getTimeList={getTimeList}
          findSameDay={findSameDay}
          color={color}
          lang={lang} />
        <ListBoard
          planList={planList}
          projectId={this.props.projectId}
          dateId={this.props.dateId}
          loading={loading}
          getEditData={getEditData}
          lang={lang} />
        <AddButton
          goToStep2={goToStep2}
          lang={lang}
        />
      </div>
    )
  }
}

export default PlanBoard;