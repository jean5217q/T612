//env
import React, { Component } from 'react';
import { connect } from 'react-redux';
//component
import Flight_Form_page from './elem/01_Trans_Form/Flight_Form_page';
import Train_Form_page from './elem/01_Trans_Form/Train_Form_page';
import Cruise_Form_page from './elem/01_Trans_Form/Cruise_Form_page';
import Bus_Form_page from './elem/01_Trans_Form/Bus_Form_page';
import Taxi_Form_page from './elem/01_Trans_Form/Taxi_Form_page';
import Road_Trip_Form_page from './elem/01_Trans_Form/Road_Trip_form_page';
import Activity_Form_page from './elem/02_Activity_Form/Activity_Form_page';
import Food_Form_page from './elem/03_Food_Form/Food_Form_page';
import Hotel_Form_page from './elem/04_Hotel_Form/Hotel_Form_page';
import Form_Top_Bar from './elem/Share_elem/Form_Top_Bar';
import Form_Submit_Btn from './elem/Share_elem/Form_Submit_Btn';
import { itemLoading } from '../../../../../action/itinerary';


class Detail extends Component {
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
    const { mainType, subType, topBasic, backToStep1,
      backToStep2, backToStep3,
      setBasicInput, goToStep5, basic, dbTime, lang, nextTime, planList } = this.props
    let time = new Date(topBasic.time.seconds * 1000)
    console.log(topBasic)
    if (planList.length > 0) {
      let lastItem = planList[planList.length - 1]
      console.log(planList)
      let type = lastItem.item.type
      if (type === 'trans') {
        time = new Date(lastItem.item.content.main.arrive.time.seconds * 1000)
      }
      else {
        time = new Date(lastItem.item.time.seconds * 1000)
      }
    }

    console.log(time)

    // let time = nextTime
    return (
      <div className='plan-form-wrap'>
        <Form_Top_Bar
          text={mainType}
          backToStep1={backToStep1}
          backToStep2={backToStep2}
          backToStep3={backToStep3}
          lang={lang} />
        <div className='add-act-bottom-wrap-select'>
          {mainType === 'trans' && subType === 'flight' ?
            <Flight_Form_page
              type={subType}
              time={time}
              dbTime={dbTime}
              setBasicInput={setBasicInput}
              backToStep1={backToStep1}
              goToStep5={goToStep5}
              basic={basic}
              lang={lang}
              nextTime={nextTime}
            /> : null}
          {mainType === 'trans' && subType === 'train' ?
            <Train_Form_page
              type={subType}
              time={time}
              dbTime={dbTime}
              setBasicInput={setBasicInput}
              backToStep1={backToStep1}
              goToStep5={goToStep5}
              basic={basic}
              lang={lang}
              nextTime={nextTime}
            /> : null}
          {mainType === 'trans' && subType === 'cruise' ?
            <Cruise_Form_page
              type={subType}
              time={time}
              dbTime={dbTime}
              setBasicInput={setBasicInput}
              backToStep1={backToStep1}
              goToStep5={goToStep5}
              basic={basic}
              lang={lang}
              nextTime={nextTime}
            /> : null}
          {mainType === 'trans' && subType === 'bus' ?
            <Bus_Form_page
              type={subType}
              time={time}
              dbTime={dbTime}
              setBasicInput={setBasicInput}
              backToStep1={backToStep1}
              goToStep5={goToStep5}
              basic={basic}
              lang={lang}
              nextTime={nextTime}
            /> : null}
          {mainType === 'trans' && subType === 'taxi' ?
            <Taxi_Form_page
              type={subType}
              time={time}
              dbTime={dbTime}
              setBasicInput={setBasicInput}
              backToStep1={backToStep1}
              goToStep5={goToStep5}
              basic={basic}
              lang={lang}
              nextTime={nextTime}
            /> : null}
          {mainType === 'trans' && subType === 'road_trip' ?
            <Road_Trip_Form_page
              type={subType}
              time={time}
              dbTime={dbTime}
              setBasicInput={setBasicInput}
              backToStep1={backToStep1}
              goToStep5={goToStep5}
              basic={basic}
              lang={lang}
              nextTime={nextTime}
            /> : null}
          {mainType === 'activity' ?
            <Activity_Form_page
              type={subType}
              time={time}
              dbTime={dbTime}
              setBasicInput={setBasicInput}
              backToStep1={backToStep1}
              goToStep5={goToStep5}
              basic={basic}
              lang={lang}
              nextTime={nextTime}
            /> : null}
          {mainType === 'food' ?
            <Food_Form_page
              type={subType}
              time={time}
              dbTime={dbTime}
              setBasicInput={setBasicInput}
              backToStep1={backToStep1}
              goToStep5={goToStep5}
              basic={basic}
              lang={lang}
              nextTime={nextTime}
            /> : null}
          {mainType === 'hotel' ?
            <Hotel_Form_page
              type={subType}
              time={time}
              dbTime={dbTime}
              setBasicInput={setBasicInput}
              backToStep1={backToStep1}
              goToStep5={goToStep5}
              basic={basic}
              lang={lang}
              nextTime={nextTime}
            /> : null}

        </div>
      </div>
    )
  }
}




export default Detail
