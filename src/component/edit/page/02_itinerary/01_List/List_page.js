import React, { Component } from 'react';
import Panel_Top from './elem/Panel_Top';
import Panel_List from './elem/Panel_List';
import Panel_Add from './elem/Panel_Add';

class List_page extends Component {
  render() {
    let {
      dateId,
      projectId,
      list,
      color,
      getCurrentTimeArr,
      compareTime,
      topBasic,
      planList,
      loading,
      goToStep2,
      getEditData,
      lang
    } = this.props
    return (
      <div className='edit-list-wrap'>
        <Panel_Top
          topBasic={topBasic}
          projectId={projectId}
          dateId={dateId}
          list={list}
          getCurrentTimeArr={getCurrentTimeArr}
          compareTime={compareTime}
          color={color}
          lang={lang} />
        <Panel_List
          planList={planList}
          projectId={this.props.projectId}
          dateId={this.props.dateId}
          loading={loading}
          getEditData={getEditData}
          lang={lang} />
        <Panel_Add
          goToStep2={goToStep2}
          lang={lang}
        />
      </div>
    )
  }
}

export default List_page;