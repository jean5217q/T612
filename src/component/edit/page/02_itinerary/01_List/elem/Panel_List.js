import React, { Component } from 'react'
import { connect } from 'react-redux';

import List_Item from './02_List_elem/List_Item';

import { asyncGetDateItinerary } from '../../../../../../action/itinerary';
import { empty } from '../../../../../../data/Content'
class Bottom extends Component {
  deleteItem = (id) => {
    const { projectId, dateId, dispatch } = this.props;
    const db = firebase.firestore();
    db.collection('project').doc(projectId)
      .collection('itinerary').doc(dateId)
      .collection('dateItem').doc(id).delete()
      .then(doc => {
        dispatch(asyncGetDateItinerary(projectId, dateId))
      })
      .catch(err => console.log(err))
  }
  render() {
    const { planList, index, loading, getEditData, lang } = this.props
    if (planList.length > 0) {
      return (
        <div className='list-bottom'>
          <div className="i-item-wrap plan">
            {
              planList.map((el, i) =>
                <List_Item
                  key={i + el.id}
                  id={el.id}
                  item={el.item}
                  projectId={this.props.projectId}
                  dateId={this.props.dateId}
                  route={this.props.route}
                  index={index}
                  deleteItem={this.deleteItem}
                  getEditData={getEditData}
                  lang={lang}
                />
              )
            }
            {
              loading ?
                <div className='sm-loader-wrap list-item itinerary'>
                  <div className='sm-loader'></div>
                </div> : null
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
                <div className='list-empty-text cost'>{empty['plan_empty'][lang]}</div>
              </div>
          }
        </div>
      )
    }
  }
}


export default connect()(Bottom);