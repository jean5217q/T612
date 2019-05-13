import React, { Component } from 'react';
import { connect } from 'react-redux';
import Circle_Loading from '../../../../loading/Circle_Loading';
import PlanBoard from './component/PlanBoard/PlanBoard';
import Main from './component/step1_MainCata/Step1_MainCata';
import Sub from './component/step2_SubCata/Step2_SubCata';
import Form from './component/step3_Form/Form';
import Map from './component/Step4_Map/Step4_Map';
import {
  asyncGetDateBasic,
  asyncGetDatePlanList,
  itemLoading,
  removeDayList
} from '../../../../../action/itinerary';
import { getQueryId, db } from '../../../../base';

class List extends Component {
  state = {
    step1: true, //list
    step2: false, //main
    step3: false, //sub
    step4: false, //form
    step5: false, //map
    isEditing: false,
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
  backToStep1 = () => { this.setState({ step1: true, step2: false, step4: false, basic: {} }) }
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
    this.setState(prevState => ({ mapList: [...prevState.mapList, obj] }))
  }
  deleteMapList = (name) => {
    this.setState(prevState => ({ mapList: prevState.mapList.filter(el => el.name !== name) }))
  }
  setBasicInput = (obj) => {
    console.log(obj)
    const { isEditing } = this.state
    this.setState({ basic: obj }, () => {
      isEditing ? this.updateItemToDb() : this.addItemToDb()
    })
  }
  getEditData = (itemId) => {
    const { projectId, dateId } = this.state
    db.collection('project').doc(projectId)
      .collection('itinerary').doc(dateId)
      .collection('dateItem').doc(itemId).get()
      .then(doc => {
        this.setState({
          time: doc.data().time.seconds,
          basic: doc.data().content,
          mapList: doc.data().content.map,
          mainType: doc.data().type,
          subType: doc.data().sub_type,
          step4: true,
          isEditing: true,
          step1: false,
          itemId: itemId
        },()=>console.log(this.state))
      })
      .catch(err => alert('error'))
  }
  addItemToDb = () => {
    const { dispatch } = this.props;
    const { mainType, subType, mapList, dateId, projectId, basic } = this.state
    dispatch(itemLoading(true))
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
      .then(() => dispatch(asyncGetDatePlanList(projectId, dateId)))
    this.setState({
      step1: true,
      step4: false,
      step5: false,
      isEditing: false,
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
      .then(() => dispatch(asyncGetDatePlanList(projectId, dateId)))
    this.setState({ step1: true, step4: false, step5: false, isEditing: false, mainType: '', subType: '', mapList: [], basic: {}, itemId: null })
  }
  componentDidMount() {
    const { projectId, dateId } = getQueryId()
    this.setState({ projectId, dateId })
    const { dispatch } = this.props
    dispatch(asyncGetDatePlanList(projectId, dateId))
    dispatch(asyncGetDateBasic(projectId, dateId))
  }
  componentWillUnmount() {
    this.props.dispatch(removeDayList())
  }
  render() {
    const { step1, step2, step3, step4, step5, isEditing, projectId, dateId, mainType, subType, mapList, basic, time, nextTime } = this.state
    const { list, color, getTimeList, findSameDay, findMaxTime, topBasic, planList, loading, lang } = this.props
    if (topBasic && planList && list) {
      return (
        <div className='plan-container'>
          {step1 &&
            <PlanBoard
              lang={lang}
              dateId={dateId}
              projectId={projectId}
              list={list}
              color={color}
              topBasic={topBasic}
              planList={planList}
              loading={loading}
              getTimeList={getTimeList}
              findSameDay={findSameDay}
              findMaxTime={findMaxTime}
              goToStep2={this.goToStep2}
              getEditData={this.getEditData}
            />}
          {step2 &&
            <Main
              lang={lang}
              backToStep1={this.backToStep1}
              goToStep3={this.goToStep3}
            />}
          {step3&&
            <Sub
              lang={lang}
              mainType={mainType}
              backToStep2={this.backToStep2}
              goToStep4={this.goToStep4}
            />}
          {step4&&
            <Form
            lang={lang} 
              basic={basic}
              dbTime={time}
              nextTime={nextTime}
              mainType={mainType}
              subType={subType}
              topBasic={topBasic}
              planList={planList}
              backToStep1={this.backToStep1}
              backToStep2={this.backToStep2}
              backToStep3={this.backToStep3}
              goToStep5={this.goToStep5}
              setBasicInput={this.setBasicInput}
              /> }
          {step5&&
            <Map  
              lang={lang}
              mapList={mapList}
              isEditing={isEditing}
              backToStep4={this.backToStep4}
              addMapList={this.addMapList}
              updateItemToDb={this.updateItemToDb}
              deleteMapList={this.deleteMapList}
              addItemToDb={this.addItemToDb}
            /> }
        </div>
      )
    }
    else return (<Circle_Loading />)
  }
}

const mapStateToProps = (state) => {
  let topBasic = state.itinerary.dateBasic
  let planList = state.itinerary.dateList
  return {
    topBasic, planList
  }
}

export default connect(mapStateToProps)(List);