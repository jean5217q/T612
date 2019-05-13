import React, { Component } from 'react'
import { connect } from 'react-redux';
import List_Item from './listBoard_element/List_Item';
import { asyncGetDatePlanList } from '../../../../../../../../action/itinerary';
import { empty } from '../../../../../../../../data/Content';
import { db } from '../../../../../../../base';

class ListBoard extends Component {
  deleteItem = (id) => {
    const { projectId, dateId, dispatch } = this.props;
    db.collection('project').doc(projectId)
      .collection('itinerary').doc(dateId)
      .collection('dateItem').doc(id).delete()
      .then(()=> dispatch(asyncGetDatePlanList(projectId, dateId)))
      .catch(err => alert('Error'))
  }
  render() {
    const { 
      lang,
      index,
      planList, 
      loading,
      projectId,
      dateId,
      route,
      getEditData } = this.props
    if (planList.length > 0) {
      return (
        <div className='list-bottom'>
          <div className="i-item-wrap plan">
            {
              planList.map((el, index) =>
                <List_Item
                  key={el.id}
                  lang={lang}
                  id={el.id}
                  item={el.item}
                  projectId={projectId}
                  dateId={dateId}
                  route={route}
                  index={index}
                  deleteItem={this.deleteItem}
                  getEditData={getEditData}
                />
              )
            }
            {
              loading&&
                <div className='sm-loader-wrap list-item itinerary'>
                  <div className='sm-loader'></div>
                </div>
            }
          </div>
        </div>
      )
    }
    else {
      return (
        <div className='list-bottom'>
          {
            loading
              ? <div className='sm-loader-wrap'>
                <div className='sm-loader'></div>
              </div>
              : <div className='list-empty-wrap'>
                <div className={`list-empty-img plan`}></div>
                <div className='list-empty-text cost'>
                  {empty['plan_empty'][lang]}
                </div>
              </div>
          }
        </div>
      )
    }
  }
}


export default connect()(ListBoard);