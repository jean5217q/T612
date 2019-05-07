//env
import React, { Component } from 'react';
import 'element-theme-default';
//component
import Form_Submit_Btn from '../Share_elem/Form_Submit_Btn';
import Time from '../Share_elem/Time';
import { plan_form as txt } from '../../../../../../../data/Content';


class Food_Form_page extends Component {
  state = {
    place: '',
    time: this.props.time,
    address: '',
    business_hour: '',
    note: '',
  }
  setPlace = (e) => { this.setState({ place: e.target.value }) }
  setAddress = (e) => { this.setState({ address: e.target.value }) }
  setBusinessHour = (e) => { this.setState({ business_hour: e.target.value }) }
  setNote = (e) => { this.setState({ note: e.target.value }) }
  setTime = (e) => { this.setState({ time: e }) }
  bundleInput = () => {
    const { place, address, business_hour, note, time } = this.state
    let obj = {
      main: { location: place },
      time: new Date(time),
      sub: [
        { title: 'address', value: address },
        { title: 'business_hours', value: business_hour },
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
        place: main.location,
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
      place,
      time,
      address,
      business_hour,
      note } = this.state
    return (
      <div>
        <div className='add-select-group'>
          <div className='add-select-input-wrap'>
            <label className='add-select-label'>{txt['content']['type'][lang]}</label>
            <div className='add-select-input'>{txt['content'][type][lang]}</div>
          </div>
          <div className='add-select-input-wrap'>
            <label className='add-select-label'>{txt['content']['place'][lang]}</label>
            <input
              className='add-select-input'
              type='input'
              value={place}
              onChange={this.setPlace} />
          </div>
          <div className='add-select-input-wrap time'>
            <label className='add-select-label'>{txt['content']['time'][lang]}</label>
            <div className='add-select-input date'>
              <Time
                time={time}
                setTime={this.setTime} />
            </div>
          </div>
        </div>
        <div className='add-select-group'>
          <div className='add-select-title-wrap'>
            <div className='add-select-title-decor'></div>
            <div className='add-select-title-text'>{txt['content']['info'][lang]}</div>
          </div>
          <div className='add-select-input-wrap'>
            <label className='add-select-label'>{txt['content']['address'][lang]}</label>
            <input
              className='add-select-input'
              type='input'
              placeholder={txt['content']['optional'][lang]}
              value={address}
              onChange={this.setAddress} />
          </div>
          <div className='add-select-input-wrap'>
            <label className='add-select-label'>{txt['content']['business_hours'][lang]}</label>
            <input
              className='add-select-input'
              type='input'
              placeholder={txt['content']['optional'][lang]}
              value={business_hour}
              onChange={this.setBusinessHour} />
          </div>
          <div className='add-select-input-wrap'>
            <label className='add-select-label'>{txt['content']['note'][lang]}</label>
            <input
              className='add-select-input'
              type='input'
              placeholder={txt['content']['optional'][lang]}
              value={note}
              onChange={this.setNote} />
          </div>
        </div>
        <Form_Submit_Btn
          setBasicInput={setBasicInput}
          bundleInput={this.bundleInput}
          goToStep5={goToStep5}
          lang={lang} />
      </div>
    )
  }
}

export default Food_Form_page