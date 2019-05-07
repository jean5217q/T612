//env
import React, { Component } from 'react';

import Form_Submit_Btn from '../Share_elem/Form_Submit_Btn';
import Time from '../Share_elem/Time';
import Date_Time from '../Share_elem/Date_Time';
import { plan_form as txt } from '../../../../../../../data/Content';


class Taxi_Form_Page extends Component {
  state = {
    carrier: '',
    phone: '',
    note: '',
    depart_l: '',
    depart_t: this.props.time,
    arrive_l: '',
    arrive_t: this.props.time,
  }
  setCarrier = (e) => { this.setState({ carrier: e.target.value }) }
  setPhone = (e) => { this.setState({ phone: e.target.value }) }
  setNote = (e) => { this.setState({ note: e.target.value }) }
  setDepartLocation = (e) => { this.setState({ depart_l: e.target.value }) }
  setArriveLocation = (e) => { this.setState({ arrive_l: e.target.value }) }
  setDepartTime = (e) => { this.setState({ depart_t: e, arrive_t: e }) }
  setArriveTime = (e) => { this.setState({ arrive_t: e }) }
  bundleInput = () => {
    const { carrier, phone, note, depart_l, depart_t, arrive_l, arrive_t } = this.state
    let obj = {
      main: {
        arrive: {
          location: arrive_l,
          time: new Date(arrive_t)
        },
        depart: {
          location: depart_l,
          time: new Date(depart_t)
        }
      },
      time: new Date(depart_t),
      sub: [
        { title: 'carrier', value: carrier },
        { title: 'phone', value: phone },
        { title: 'note', value: note },
      ],
    }
    return obj
  }
  componentDidMount() {
    let { basic, dbTime, lang } = this.props
    const { main, sub } = basic
    if (JSON.stringify(basic) !== '{}' && dbTime) {
      this.setState({
        time: new Date(dbTime * 1000),
        carrier: sub[0].value,
        phone: sub[1].value,
        note: sub[2].value,
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
      carrier,
      phone,
      note,
      depart_l,
      depart_t,
      arrive_l,
      arrive_t } = this.state
    return (
      <div>
        <div className='add-select-group'>
          <div className='add-select-input-wrap'>
            <label className='add-select-label'>{txt['content']['type'][lang]}</label>
            <div className='add-select-input'>{txt['content']['taxi'][lang]}</div>
          </div>
          <div className='add-select-input-wrap'>
            <label className='add-select-label'>{txt['content']['carrier'][lang]}</label>
            <input
              className='add-select-input'
              type='input'
              placeholder={txt['content']['optional'][lang]}
              value={carrier}
              onChange={this.setCarrier}
            />
          </div>
          <div className='add-select-input-wrap'>
            <label className='add-select-label'>{txt['content']['phone'][lang]}</label>
            <input
              className='add-select-input'
              type='input'
              placeholder={txt['content']['optional'][lang]}
              value={phone}
              onChange={this.setPhone}
            />
          </div>
          <div className='add-select-input-wrap'>
            <label className='add-select-label'>{txt['content']['note'][lang]}</label>
            <input
              className='add-select-input'
              type='input'
              placeholder={txt['content']['optional'][lang]}
              value={note}
              onChange={this.setNote}
            />
          </div>
        </div>
        <div className='add-select-group'>
          <div className='add-select-title-wrap'>
            <div className='add-select-title-decor'></div>
            <div className='add-select-title-text'>{txt['content']['depart'][lang]}</div>
          </div>
          {/*城市*/}
          <div className='add-select-input-wrap'>
            <label className='add-select-label'>{txt['content']['location'][lang]}</label>
            <input
              className='add-select-input'
              type='text'
              value={depart_l}
              onChange={this.setDepartLocation}
            />
          </div>
          {/*時間*/}
          <div className='add-select-input-wrap time'>
            <label className='add-select-label'>{txt['content']['time'][lang]}</label>
            <div className='add-select-input date'>
              <Time

                time={depart_t}
                setTime={this.setDepartTime} />
            </div>
          </div>
        </div>
        <div className='add-select-group'>
          <div className='add-select-title-wrap'>
            <div className='add-select-title-decor'></div>
            <div className='add-select-title-text'>{txt['content']['arrive'][lang]}</div>
          </div>
          <div className='add-select-input-wrap'>
            <label className='add-select-label'>{txt['content']['location'][lang]}</label>
            <input
              className='add-select-input'
              type='text'
              value={arrive_l}
              onChange={this.setArriveLocation}
            />
          </div>
          <div className='add-select-input-wrap time'>
            <label className='add-select-label'>{txt['content']['date'][lang]}</label>
            <div className='add-select-input date'>
              <Date_Time
                time={arrive_t}
                setTime={this.setArriveTime} />
            </div>
          </div>
          <div className='add-select-input-wrap time'>
            <label className='add-select-label'>{txt['content']['time'][lang]}</label>
            <div className='add-select-input date'>
              <Time
                time={arrive_t}
                setTime={this.setArriveTime}
              />
            </div>
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

export default Taxi_Form_Page