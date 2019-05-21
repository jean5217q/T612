import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import Overview from './Overview/Overview'
import DayBoard from './List/DayBoard';
import { getQueryId } from '../../../base';

class Itinerary extends Component {
  render() {
    const {
      lang,
      list,
      basic,
      color,
      loading,
      getTimeList,
      findSameDay,
      findMaxTime,
      findMinTime } = this.props
    const { projectId, dateId } = getQueryId()
    const path = '/edit/itinerary'
    return (
      <div className='main-wrap'>
        <Route 
          exact path={`${path}`} 
          render={() => <Redirect to={`${path}/overview`} />} 
        />
        <Route
          path={`${path}/overview`}
          render={() =>
            <Overview
              list={list}
              basic={basic}
              color={color}
              loading={loading}
              lang={lang}
              dateId={dateId}
              projectId={projectId}
              getTimeList={getTimeList}
              findSameDay={findSameDay}
              findMaxTime={findMaxTime}
              findMinTime={findMinTime}
              />} 
        />
        {
          list.map((el, index) =>
            <Route
              key={index}
              path={`${path}/list/${index}`}
              render={() =>
                <DayBoard
                  lang={lang}
                  list={list}
                  color={color}
                  loading={loading}
                  getTimeList={getTimeList}
                  findSameDay={findSameDay}
                  findMaxTime={findMaxTime} 
                />} 
            />
          )
        }
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    loading: state.itinerary.itemLoading
  }
}

Itinerary.propTypes = {
  lang: PropTypes.number,
  list: PropTypes.array,
  basic: PropTypes.object,
  color: PropTypes.string,
  loading: PropTypes.bool,
  getTimeList: PropTypes.func,
  findSameDay: PropTypes.func,
  findMaxTime: PropTypes.func,
  findMinTime: PropTypes.func,
}

export default connect(mapStateToProps)(Itinerary)