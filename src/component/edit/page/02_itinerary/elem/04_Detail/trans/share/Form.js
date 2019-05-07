//env
import React, { Component } from 'react'
//component
import Depart from './Depart';
import Arrive from './Arrive';
import Btn from '../../share/Submit';
import Flight from '../elem/Flight';
import Train from '../elem/Train';
import Bus from '../elem/Bus';
import Cruise from '../elem/Cruise';
import Taxi from '../elem/Taxi';
import Road_Trip from '../elem/Road_Trip'

class Form extends Component {
  state = {
    main: {
      arrive: {
        ar_l: this.props.type,
        ar_time: new Date(),
      },
      depart: {
        dp_l: '',
        dp_time: new Date(),
      }
    },
    //sub
    sub: {
      Carrier: '',
      T_Number: '',
      Seat: '',
      Phone: '',
      Way: '',
      Airline: '',
    },
    //type
    type: 'trans',
    sub_type: this.props.type
  }
  setDepartLocation = (e) => {
    let value = e.target.value
    this.setState(prevState=>{
      return {
        ...prevState,
        main: {
          ...prevState.main,
          depart: {
            ...prevState.main.depart,
            dp_l: value
          }
        }
      }
    })
  }
  setDepartTime = (e) => {
    let value = e
    this.setState(prevState=>{
      return {
        ...prevState,
        main: {
          ...prevState.main,
          depart: {
            ...prevState.main.depart,
            dp_time: value
          }
        }
      }
    })
  }
  setArriveLocation = (e) => {
    let value = e.target.value
    this.setState(prevState=>{
      return {
        ...prevState,
        main: {
          ...prevState.main,
          arrive: {
            ...prevState.main.arrive,
            ar_l: value
          }
        }
      }
    })
  }
  setArriveTime = (e) => {
    let value = e
    this.setState(prevState=>{
      return {
        ...prevState,
        main: {
          ...prevState.main,
          arrive: {
            ...prevState.main.arrive,
            ar_time: value
          }
        }
      }
    })
  }
  setAirline = (e) => {
    this.setState({
      Airline: e.target.value
    })
  }
  setWay = (e) => {
    this.setState({
      Way: e.target.value
    })
  }
  setPhone = (e) => {
    this.setState({
      Phone: e.target.value
    })
  }
  setSeat = (e) => {
    this.setState({
      Seat: e.target.value
    })
  }
  setNumber = (e) => {
    this.setState({
      T_Number: e.target.value
    })
  }
  setCarrier = (e) => {
    this.setState({
      Carrier: e.target.value
    })
  }
  addItem = (e) => {
    let sub = this.state.sub
    let list = []
    for(let title in sub) {
      list.push({title: title,value: sub[title]})
    }
    list = list.filter(el=>el.value!=='')
    let obj = {
      main: this.state.main,
      sub: list,
      type: this.state.type,
      sub_type: this.state.sub_type
    }
    console.log(obj)
  }
  componentDidUpdate() {
    console.log(this.state)
  }
  render() {
    const {type,time} = this.props
    const { main } = this.state
    const { arrive,depart } = main
    console.log()
    return(
      <div className='add-act-bottom-wrap-select'>
        {type==='flight' ? 
          <Flight 
            Airline ={this.state.Airline}
            T_Number = {this.state.T_Number}
            Seat={this.state.Seat}
            setSeat={this.setSeat}
            setNumber={this.setNumber}
            setAirline={this.setAirline}/> : null}
        {type==='train' ? 
          <Train
            Carrier={this.state.Carrier}
            T_Number = {this.state.T_Number}
            Seat={this.state.Seat}
            setSeat={this.setSeat}
            setNumber={this.setNumber}
            setCarrier={this.setCarrier}/> : null}
        {type==='cruise' ? 
          <Cruise
            Carrier={this.state.Carrier}
            T_Number = {this.state.T_Number}
            Seat={this.state.Seat}
            setSeat={this.setSeat}
            setNumber={this.setNumber}
            setCarrier={this.setCarrier}/> : null}
        {type==='bus' ?
          <Bus
            Carrier={this.state.Carrier}
            T_Number = {this.state.T_Number}
            Seat={this.state.Seat}
            setSeat={this.setSeat}
            setNumber={this.setNumber}
            setCarrier={this.setCarrier}/> : null}
        {type==='taxi' ? 
          <Taxi
            Carrier={this.state.Carrier}
            Phone={this.state.Phone}
            setCarrier={this.setCarrier}
            setPhone={this.setPhone}/> : null}
        {type==='road-trip' ? 
          <Road_Trip
            Way={this.state.Way}
            setWay={this.setWay}/> : null}
        <Depart
          dp_l={depart.dp_l}
          dp_time={this.state.dp_time}
          setDepartLocation ={this.setDepartLocation }
          setDepartTime={this.setDepartTime}/>
        <Arrive
          ar_l={arrive.ar_l}
          ar_time={this.state.ar_time}
          setArriveLocation ={this.setArriveLocation }
          setArriveTime={this.setArriveTime}/>
        <Btn addItem={this.addItem}/>
      </div>
    )
  }
}

export default Form