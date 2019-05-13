import React, { Component } from 'react';
import Type from '../share_element/input/Type';
import General from '../share_element/input/General';
import DateInput from '../share_element/input/DateInput';
import TimeInput from '../share_element/input/TimeInput';
import Group_Title from '../share_element/input/Group_Title';
import Submit from '../share_element/Submit';
import { plan_form as text } from '../../../../../../../../../data/Content';
class RoadTrip extends Component {
  state = {
    way: '',
    note: '',
    depart_l: '',
    depart_t: this.props.time,
    arrive_l: '',
    arrive_t: this.props.time,
  }
  setWay = (e) => { this.setState({ way: e.target.value }) }
  setNote = (e) => { this.setState({ note: e.target.value }) }
  setDepartLocation = (e) => { this.setState({ depart_l: e.target.value }) }
  setArriveLocation = (e) => { this.setState({ arrive_l: e.target.value }) }
  setDepartTime = (e) => { this.setState({ depart_t: e, arrive_t: e }) }
  setArriveTime = (e) => { this.setState({ arrive_t: e }) }
  bundleInput = () => {
    const { way, note, depart_l, depart_t, arrive_l, arrive_t } = this.state
    let obj = {
      main: {
        arrive: {
          location: arrive_l,
          time: arrive_t
        },
        depart: {
          location: depart_l,
          time: depart_t
        }
      },
      time: depart_t,
      sub: [
        { title: 'way', value: way },
        { title: 'note', value: note },
      ],
    }
    return obj
  }
  componentDidMount() {
    let { basic, dbTime } = this.props
    const { main, sub } = basic
    if (JSON.stringify(basic) !== '{}' && dbTime) {
      this.setState({
        time: new Date(dbTime * 1000),
        way: sub[0].value,
        note: sub[1].value,
        depart_l: main.depart.location,
        depart_t: new Date(main.depart.time.seconds * 1000),
        arrive_l: main.arrive.location,
        arrive_t: new Date(main.arrive.time.seconds * 1000),
      })
    }
  }
  render() {
    const { setBasicInput, goToStep5, lang } = this.props
    let {
      way,
      note,
      depart_l,
      depart_t,
      arrive_l,
      arrive_t } = this.state
    return (
      <>
        <div className='add-select-group'>
          <Type 
            typeLabel={text['content']['type'][lang]}
            typeValue={text['content']['road_trip'][lang]}/>
          <General
            label={text['content']['way'][lang]}
            placeholder={text['content']['optional'][lang]}
            value={way}
            setInput={this.setWay}/>
          <General
            label={text['content']['note'][lang]}
            placeholder={text['content']['optional'][lang]}
            value={note}
            setInput={this.setNote}/>
        </div>
        <div className='add-select-group'>
          <Group_Title title={text['content']['depart'][lang]}/>
          <General
            label={text['content']['location'][lang]}
            value={depart_l}
            setInput={this.setDepartLocation}/>
          <TimeInput 
            label={text['content']['time'][lang]}
            value={depart_t}
            setTime={this.setDepartTime}/>
        </div>
        <div className='add-select-group'>
          <Group_Title title={text['content']['arrive'][lang]}/>
          <General
            label={text['content']['location'][lang]}
            value={arrive_l}
            setInput={this.setArriveLocation}/>
          <DateInput 
            label={text['content']['date'][lang]}
            value={arrive_t}
            setTime={this.setArriveTime}/>
          <TimeInput 
            label={text['content']['time'][lang]}
            value={arrive_t}
            setTime={this.setArriveTime}/>
        </div>
        <Submit
          setBasicInput={setBasicInput}
          bundleInput={this.bundleInput}
          goToStep5={goToStep5}
          lang={lang} />
      </>    
    )
  }
}

export default RoadTrip