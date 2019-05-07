//env
import React, { Component } from 'react';
import { connect } from 'react-redux';
//component
import Flight_Form_page from '../04_Form/elem/01_Trans_Form/Flight_Form_page';
import Train_Form_page from '../04_Form/elem/01_Trans_Form/Train_Form_page';
import Cruise_Form_page from '../04_Form/elem/01_Trans_Form/Cruise_Form_page';
import Bus_Form_page from '../04_Form/elem/01_Trans_Form/Bus_Form_page';
import Taxi_Form_page from '../04_Form/elem/01_Trans_Form/Taxi_Form_page';
import Road_Trip_Form_page from '../04_Form/elem/01_Trans_Form/Road_Trip_form_page';
import Activity_Form_page from '../04_Form/elem/02_Activity_Form/Activity_Form_page';
import Food_Form_page from '../04_Form/elem/03_Food_Form/Food_Form_page';
import Hotel_Form_page from '../04_Form/elem/04_Hotel_Form/Hotel_Form_page';
import Loading_Circle from '../../../../loading/Loading_Circle';
import {
  asyncGetDateItem,
  deleteDateItem
} from '../../../../../action/itinerary';

class Detail extends Component {
  state = {
    cata: null,
    type: null,
    itemId: null,
    projectId: null,
    dateId: null
  }
  componentWillMount() {
    console.log(this.props)
    //抓取要編輯項目item的資料
    const href = window.location.href
    const projectId = href.split('&')[0].split('=')[1]
    const dateId = href.split('&')[1].split('=')[1]
    const itemId = href.split('&')[3].split('=')[1]
    const cata = href.split('&')[2].split('=')[0]
    const type = href.split('&')[2].split('=')[1]
    this.setState({
      cata,
      type,
      projectId,
      dateId,
      itemId
    })
    this.props.dispatch(asyncGetDateItem(projectId, dateId, itemId))
  }
  //離開時清空item
  componentWillUnmount() {
    console.log('unmount')
    this.props.dispatch(deleteDateItem())
  }
  //update(用於更新)
  addItemToDb = (obj) => {
    const index = window.location.href.split('modify')[1].split('/')[1]
    const { dateId, projectId, itemId } = this.state
    const { route } = this.props
    const db = firebase.firestore();
    db.collection('project').doc(projectId)
      .collection('itinerary').doc(dateId)
      .collection('dateItem').doc(itemId).update(obj)
      .then(() => {
        route.history.push(`/edit/itinerary/list/${index}/?project=${projectId}&date=${dateId}`)
      })
  }
  cancelAddItem = () => {
    console.log('d')
    const index = window.location.href.split('modify')[1].split('/')[1]
    const { dateId, projectId, route } = this.props
    route.history.push(`/edit/itinerary/list/${index}/?project=${projectId}&date=${dateId}`)
  }
  render() {
    const { cata, type } = this.state
    const { item } = this.props
    if (item) {
      return (
        <div className='plan-form-wrap'>
          {cata === 'trans' && type === 'flight' ?
            <Flight_Form_page
              type={type}
              history={history}
              addItemToDb={this.addItemToDb}
              cancelAddItem={this.cancelAddItem}
              item={item}
            /> : null}
          {cata === 'trans' && type === 'train' ?
            <Train_Form_page
              type={type}
              history={history}
              addItemToDb={this.addItemToDb}
              cancelAddItem={this.cancelAddItem}
              item={item} /> : null}
          {cata === 'trans' && type === 'cruise' ?
            <Cruise_Form_page
              type={type}
              history={history}
              addItemToDb={this.addItemToDb}
              cancelAddItem={this.cancelAddItem}
              item={item} /> : null}
          {cata === 'trans' && type === 'bus' ?
            <Bus_Form_page
              type={type}
              history={history}
              addItemToDb={this.addItemToDb}
              cancelAddItem={this.cancelAddItem}
              item={item} /> : null}
          {cata === 'trans' && type === 'taxi' ?
            <Taxi_Form_page
              type={type}
              history={history}
              addItemToDb={this.addItemToDb}
              cancelAddItem={this.cancelAddItem}
              item={item} /> : null}
          {cata === 'trans' && type === 'road-trip' ?
            <Road_Trip_Form_page
              type={type}
              history={history}
              addItemToDb={this.addItemToDb}
              cancelAddItem={this.cancelAddItem}
              item={item} /> : null}
          {cata === 'activity' ?
            <Activity_Form_page
              type={type}
              history={history}
              addItemToDb={this.addItemToDb}
              cancelAddItem={this.cancelAddItem}
              item={item} /> : null}
          {cata === 'food' ?
            <Food_Form_page
              type={type}
              history={history}
              addItemToDb={this.addItemToDb}
              cancelAddItem={this.cancelAddItem}
              item={item} /> : null}
          {cata === 'hotel' ?
            <Hotel_Form_page
              type={type}
              history={history}
              addItemToDb={this.addItemToDb}
              cancelAddItem={this.cancelAddItem}
              item={item} /> : null}
        </div>
      )
    }
    else {
      return <Loading_Circle />
    }
  }
}


const mapStateToProps = (state) => {
  let item = state.itinerary.item
  item = JSON.stringify(item) !== "{}" ? item : null
  return {
    history: state.user.history,
    item: item
  }
}

export default connect(mapStateToProps)(Detail)
