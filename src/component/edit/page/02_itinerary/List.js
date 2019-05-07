
import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  asyncGetDateBasic,
  asyncGetDateItinerary,
  itemLoading,
  asyncGetDateItem,
  removeDayList
} from '../../../../action/itinerary';
import { getQuery } from '../../../base';
import Loading_Circle from '../../../loading/Loading_Circle';
import List_page from './01_List/List_page';
import Main from './02_Main_Cata/Main_Cata_page';
import Sub from './03_Sub_Cata/Sub_Cata_page';
import Form from './04_Form/Form_page';
import Edit from './05_Edit/Edit_Item_page';
import Map from './page/05_Map';


class List extends Component {
  state = {
    step1: true, //主
    step2: false, //main
    step3: false, //sub
    step4: false, //form
    step5: false, //map
    edit: false,
    projectId: null,
    dateId: null,
    itemId: null,
    mainType: '',
    subType: '',
    mapList: [],
    basic: {},
    time: null,
    nextTime: new Date()
  }
  backToStep1 = () => { this.setState({ step1: true, step2: false, step4: false }) }
  backToStep2 = () => { this.setState({ step2: true, step3: false, step4: false }) }
  backToStep3 = () => { this.setState({ step3: true, step4: false }) }
  backToStep4 = () => { this.setState({ step4: true, step5: false }) }
  goToStep2 = () => { this.setState({ step1: false, step2: true }) }
  goToStep3 = (type) => {
    if (type === 'hotel') {
      this.setState({ mainType: type, subType: type, step2: false, step4: true })
    }
    else {
      this.setState({ mainType: type, step2: false, step3: true })
    }
  }
  goToStep4 = (type) => {
    this.setState({
      subType: type,
      step3: false,
      step4: true
    })
  }
  goToStep5 = (obj) => { this.setState({ step4: false, step5: true, basic: obj }) }


  addMapList = (obj) => {
    this.setState(prevState => ({ mapList: [...prevState.mapList, obj] }), () => console.log(this.state))
  }
  deleteMapList = (name) => {
    this.setState(prevState => ({ mapList: prevState.mapList.filter(el => el.name !== name) }))
  }
  setBasicInput = (obj) => {
    const { edit } = this.state
    console.log(edit)
    this.setState({ basic: obj }, () => {
      edit ? this.updateItemToDb() : this.addItemToDb()
    })
  }
  getEditData = (itemId) => {
    const { projectId, dateId } = this.state
    const db = firebase.firestore();
    db.collection('project').doc(projectId)
      .collection('itinerary').doc(dateId)
      .collection('dateItem').doc(itemId).get()
      .then(doc => {
        console.log(doc.data())
        this.setState({
          time: doc.data().time.seconds,
          basic: doc.data().content,
          mapList: doc.data().content.map,
          mainType: doc.data().type,
          subType: doc.data().sub_type,
          step4: true,
          edit: true,
          step1: false,
          itemId: itemId
        }, () => console.log(this.state))
      })
      .catch(err => console.log(err))
  }
  addItemToDb = () => {
    const { dispatch } = this.props;
    const { mainType, subType, mapList, dateId, projectId, basic } = this.state
    dispatch(itemLoading(true))
    const db = firebase.firestore();
    db.collection('project').doc(projectId)
      .collection('itinerary').doc(dateId)
      .collection('dateItem').add({
        content: {
          main: basic.main,
          map: mapList,
          sub: basic.sub
        },
        time: basic.time,
        type: mainType,
        sub_type: subType
      })
      .then(() => dispatch(asyncGetDateItinerary(projectId, dateId)))
    this.setState({
      step1: true,
      step4: false,
      step5: false,
      edit: false,
      mainType: '',
      subType: '',
      mapList: [],
      basic: {},
      nextTime: basic.nextTime
    })
  }
  updateItemToDb = () => {
    const { dispatch } = this.props;
    const { mapList, dateId, projectId, basic, itemId } = this.state
    dispatch(itemLoading(true))
    const db = firebase.firestore();
    db.collection('project').doc(projectId)
      .collection('itinerary').doc(dateId)
      .collection('dateItem').doc(itemId).update({
        content: {
          main: basic.main,
          map: mapList,
          sub: basic.sub
        },
        time: basic.time,
      })
      .then(() => dispatch(asyncGetDateItinerary(projectId, dateId)))
    this.setState({ step1: true, step4: false, step5: false, edit: false, mainType: '', subType: '', mapList: [], basic: {}, itemId: null })
  }
  componentDidMount() {
    const { projectId, dateId } = getQuery()
    this.setState({ projectId, dateId })
    const { dispatch } = this.props
    dispatch(asyncGetDateItinerary(projectId, dateId))
    dispatch(asyncGetDateBasic(projectId, dateId))
  }
  componentWillUnmount() {
    this.props.dispatch(removeDayList())
  }
  render() {
    const { step1, step2, step3, step4, step5, edit, projectId, dateId, mainType, subType, mapList, basic, time, nextTime } = this.state
    const { list, color, getCurrentTimeArr, compareTime, findMaxTime, topBasic, planList, loading, lang } = this.props
    if (topBasic && planList && list) {
      return (
        <div className='plan-container'>
          {step1 ?
            <List_page
              dateId={dateId}
              projectId={projectId}
              list={list}
              color={color}
              getCurrentTimeArr={getCurrentTimeArr}
              compareTime={compareTime}
              findMaxTime={findMaxTime}
              topBasic={topBasic}
              planList={planList}
              loading={loading}
              goToStep2={this.goToStep2}
              getEditData={this.getEditData}
              lang={lang} /> : null}
          {step2 ?
            <Main
              backToStep1={this.backToStep1}
              goToStep3={this.goToStep3}
              lang={lang} /> : null}
          {step3 ?
            <Sub
              mainType={mainType}
              backToStep2={this.backToStep2}
              goToStep4={this.goToStep4}
              lang={lang} /> : null}
          {step4 ?
            <Form
              mainType={mainType}
              subType={subType}
              topBasic={topBasic}
              planList={planList}
              backToStep1={this.backToStep1}
              backToStep2={this.backToStep2}
              backToStep3={this.backToStep3}
              goToStep5={this.goToStep5}
              setBasicInput={this.setBasicInput}
              basic={basic}
              dbTime={time}
              nextTime={nextTime}
              lang={lang}
            /> : null}
          {step5 ?
            <Map
              addMapList={this.addMapList}
              deleteMapList={this.deleteMapList}
              mapList={mapList}
              backToStep4={this.backToStep4}
              addItemToDb={this.addItemToDb}
              edit={edit}
              updateItemToDb={this.updateItemToDb}
              lang={lang} /> : null}
        </div>
      )
    }
    else {
      return (
        <Loading_Circle />
      )
    }
  }
}

const mapStateToProps = (state) => {
  let topBasic = state.itinerary.dateBasic
  topBasic = JSON.stringify(topBasic) !== "{}" ? topBasic : null
  let planList = state.itinerary.dateList
  console.log(planList)
  return {
    topBasic, planList
  }
}

export default connect(mapStateToProps)(List);