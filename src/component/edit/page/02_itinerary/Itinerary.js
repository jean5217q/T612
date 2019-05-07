//env
import React, { Component } from 'react'
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
//component
import Overview_page from './00_Overview/Overview_page'
import List from './List';
import { getItineraryQuery } from '../../../base';


class Itinerary extends Component {
  state = {
    type: ['trans', 'food', 'activity', 'hotel']
  }
  render() {
    const {
      list,
      basic,
      color,
      getCurrentTimeArr,
      compareTime,
      findMaxTime,
      findMinTime,
      loading,
      lang } = this.props
    const { projectId, dateId } = getItineraryQuery()
    const path = '/edit/itinerary'
    return (
      <div className='edit-main-wrap'>
        <Route exact path={`${path}`} render={() => <Redirect to={`${path}/overview`} />} />
        <Route
          path={`${path}/overview`}
          render={() =>
            <Overview_page
              dateId={dateId}
              projectId={projectId}
              p_route={this.props.p_route}
              getCurrentTimeArr={getCurrentTimeArr}
              compareTime={compareTime}
              findMaxTime={findMaxTime}
              findMinTime={findMinTime}
              list={list}
              basic={basic}
              color={color}
              loading={loading}
              lang={lang} />} />
        {
          list.map((el, index) =>
            <Route
              key={index}
              path={`${path}/list/${index}`}
              render={() =>
                <List
                  getCurrentTimeArr={getCurrentTimeArr}
                  compareTime={compareTime}
                  list={list}
                  color={color}
                  findMaxTime={findMaxTime}
                  loading={loading}
                  lang={lang} />} />
          )
        }
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  let loading = state.itinerary.itemLoading
  return {
    loading
  }
}


export default connect(mapStateToProps)(Itinerary)

//this.setState(function(prevState){
//   return {
//     count: preState.count+1
//   }
// })


