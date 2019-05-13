import React, { Component } from 'react';
import Type from '../share_element/input/Type';
import General from '../share_element/input/General';
import TimeInput from '../share_element/input/TimeInput';
import Group_Title from '../share_element/input/Group_Title';
import Submit from '../share_element/Submit';
import { plan_form as text } from '../../../../../../../../../data/Content';

class Activity extends Component {
  state = {
    location: '',
    time: this.props.time,
    address: '',
    business_hour: '',
    note: '',
  }
  setLocation = (e) => { this.setState({ location: e.target.value }) }
  setAddress = (e) => { this.setState({ address: e.target.value }) }
  setBusinessHour = (e) => { this.setState({ business_hour: e.target.value }) }
  setNote = (e) => { this.setState({ note: e.target.value }) }
  setTime = (e) => { this.setState({ time: e }) }
  bundleInput = () => {
    const { location, address, business_hour, note, time } = this.state
    return  {
      main: { location: location },
      time: time,
      sub: [
        { title: 'address', value: address },
        { title: 'business_hours', value: business_hour },
        { title: 'note', value: note },
      ],
    }
  }
  componentDidMount() {
    let { basic, dbTime } = this.props
    const { main, sub } = basic
    if (JSON.stringify(basic) !== '{}' && dbTime) {
      this.setState({
        location: main.location,
        time: new Date(dbTime * 1000),
        address: sub[0].value,
        business_hour: sub[1].value,
        note: sub[2].value,
      })
    }
  }
  render() {
    const { type, setBasicInput, goToStep5, lang } = this.props
    let {
      location,
      time,
      address,
      business_hour,
      note } = this.state
    return (
      <div>
        <div className='add-select-group'>
          <Type 
            typeLabel={text['content']['type'][lang]}
            typeValue={text['content'][type][lang]}/>
          <General
            label={text['content']['location'][lang]}
            placeholder={text['content']['optional'][lang]}
            value={location}
            setInput={this.setLocation}/>
          <TimeInput 
            label={text['content']['time'][lang]}
            value={time}
            setTime={this.setTime}/>
        </div>
        <div className='add-select-group'>
          <Group_Title title={text['content']['info'][lang]}/>
          <General
            label={text['content']['address'][lang]}
            placeholder={text['content']['optional'][lang]}
            value={address}
            setInput={this.setAddress}/>
          <General
            label={text['content']['business_hours'][lang]}
            placeholder={text['content']['optional'][lang]}
            value={business_hour}
            setInput={this.setBusinessHour}/>
          <General 
            label={text['content']['note'][lang]}
            placeholder={text['content']['optional'][lang]}
            value={note}
            setInput={this.setNote}/>
        </div>
        <Submit
          setBasicInput={setBasicInput}
          bundleInput={this.bundleInput}
          goToStep5={goToStep5}
          lang={lang} />
      </div>
    )
  }
}

export default Activity