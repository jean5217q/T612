import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Flight from './component/transportation/Flight';
import Train from './component/transportation/Train';
import Cruise from './component/transportation/Cruise';
import Bus from './component/transportation/Bus';
import Taxi from './component/transportation/Taxi';
import Road_Trip from './component/transportation/Road';
import Activity from './component/activity/Activity';
import Food from './component/food/Food';
import Hotel from './component/hotel/Hotel';
import TopBar from './component/share_element/TopBar';

class Form extends Component {
  formateDayTime = (time) => {
    let t = new Date(time * 1000)
    let y = t.getFullYear()
    let m = t.getMonth()
    let d = t.getDate()
    let n = new Date()
    let tt = n
    tt = n.setYear(y)
    tt = n.setMonth(m)
    tt = n.setDate(d)
    return tt
  }
  render() {
    const { 
      color,
      mainType, 
      subType, 
      topBasic, 
      backToStep1,
      backToStep2, 
      backToStep3,
      setBasicInput, 
      goToStep5, 
      basic, 
      dbTime, 
      lang, 
      nextTime, 
      planList 
    } = this.props
      
    let time = new Date(topBasic.time.seconds * 1000)
    if (planList.length > 0) {
      let lastItem = planList[planList.length - 1]
      let type = lastItem.item.type
      if (type === 'trans') {
        time = new Date(lastItem.item.content.main.arrive.time.seconds * 1000)
      }
      else {
        time = new Date(lastItem.item.time.seconds * 1000)
      }
    }
    console.log(basic)
    return (
      <div className='plan-form-wrap'>
        <TopBar
          type={mainType}
          lang={lang}
          color={color}
          backToStep1={backToStep1}
          backToStep2={backToStep2}
          backToStep3={backToStep3}
        />
        <div className='add-plan-bottom-select'>
          {mainType === 'trans' && subType === 'flight' ?
            <Flight
              type={subType}
              time={time}
              dbTime={dbTime}
              nextTime={nextTime}
              basic={basic}
              lang={lang}
              setBasicInput={setBasicInput}
              backToStep1={backToStep1}
              goToStep5={goToStep5}
            /> : null}
          {mainType === 'trans' && subType === 'train' ?
            <Train
              type={subType}
              time={time}
              dbTime={dbTime}
              basic={basic}
              lang={lang}
              nextTime={nextTime}
              setBasicInput={setBasicInput}
              backToStep1={backToStep1}
              goToStep5={goToStep5}
            /> : null}
          {mainType === 'trans' && subType === 'cruise' ?
            <Cruise
              type={subType}
              time={time}
              dbTime={dbTime}
              basic={basic}
              lang={lang}
              nextTime={nextTime}
              setBasicInput={setBasicInput}
              backToStep1={backToStep1}
              goToStep5={goToStep5}
            /> : null}
          {mainType === 'trans' && subType === 'bus' ?
            <Bus
              type={subType}
              time={time}
              dbTime={dbTime}
              basic={basic}
              lang={lang}
              nextTime={nextTime}
              setBasicInput={setBasicInput}
              backToStep1={backToStep1}
              goToStep5={goToStep5}
            /> : null}
          {mainType === 'trans' && subType === 'taxi' ?
            <Taxi
              type={subType}
              time={time}
              dbTime={dbTime}
              basic={basic}
              lang={lang}
              nextTime={nextTime}
              setBasicInput={setBasicInput}
              backToStep1={backToStep1}
              goToStep5={goToStep5}
            /> : null}
          {mainType === 'trans' && subType === 'road_trip' ?
            <Road_Trip
              type={subType}
              time={time}
              dbTime={dbTime}
              basic={basic}
              lang={lang}
              nextTime={nextTime}
              setBasicInput={setBasicInput}
              backToStep1={backToStep1}
              goToStep5={goToStep5}
            /> : null}
          {mainType === 'activity' ?
            <Activity
              type={subType}
              time={time}
              dbTime={dbTime}
              basic={basic}
              lang={lang}
              nextTime={nextTime}
              setBasicInput={setBasicInput}
              backToStep1={backToStep1}
              goToStep5={goToStep5}
            /> : null}
          {mainType === 'food' ?
            <Food
              type={subType}
              time={time}
              dbTime={dbTime}
              basic={basic}
              lang={lang}
              nextTime={nextTime}
              setBasicInput={setBasicInput}
              backToStep1={backToStep1}
              goToStep5={goToStep5}
            /> : null}
          {mainType === 'hotel' ?
            <Hotel
              type={subType}
              time={time}
              dbTime={dbTime}
              basic={basic}
              lang={lang}
              nextTime={nextTime}
              setBasicInput={setBasicInput}
              backToStep1={backToStep1}
              goToStep5={goToStep5}
            /> : null}
        </div>
      </div>
    )
  }
}

Form.propTypes = {
  color: PropTypes.string,
  name: PropTypes.string,
  mainType: PropTypes.string, 
  subType: PropTypes.string, 
  topBasic: PropTypes.object, 
  backToStep1: PropTypes.func,
  backToStep2: PropTypes.func, 
  backToStep3: PropTypes.func,
  setBasicInput: PropTypes.func, 
  goToStep5: PropTypes.func, 
  basic: PropTypes.object, 
  dbTime: PropTypes.number, 
  lang: PropTypes.number, 
  nextTime: PropTypes.object, 
  planList: PropTypes.array
}

export default Form
