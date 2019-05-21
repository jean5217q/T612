import React, { Component } from 'react';
import PropTypes from 'prop-types';
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
      <div className='board'>
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

PlanBoard.propTypes = {
  showAddDayBoard: PropTypes.func,
  dateId: PropTypes.string,
  projectId: PropTypes.string,
  list: PropTypes.array,
  color: PropTypes.string,
  getTimeList: PropTypes.func,
  findSameDay: PropTypes.func,
  topBasic: PropTypes.object,
  planList: PropTypes.array,
  loading: PropTypes.bool,
  goToStep2: PropTypes.func,
  getEditData: PropTypes.func,
  lang: PropTypes.number,
}

export default PlanBoard;