//env
import React, { Component } from 'react';
import 'element-theme-default';
//component
import Form_Submit_Btn from '../Share_elem/Form_Submit_Btn';
import Time from '../Share_elem/Time';
import Date_Time from '../Share_elem/Date_Time';
import { plan_form as txt } from '../../../../../../../data/Content';


class Bus_Form_Page extends Component {
  state = {
    carrier: '',
    t_Number: '',
    seat: '',
    note: '',
    depart_l: '',
    depart_t: this.props.time,
    arrive_l: '',
    arrive_t: this.props.time,
  }
  setCarrier = (e) => { this.setState({ carrier: e.target.value }) }
  setNumber = (e) => { this.setState({ t_Number: e.target.value }) }
  setSeat = (e) => { this.setState({ seat: e.target.value }) }
  setNote = (e) => { this.setState({ note: e.target.value }) }
  setDepartLocation = (e) => { this.setState({ depart_l: e.target.value }) }
  setArriveLocation = (e) => { this.setState({ arrive_l: e.target.value }) }
  setDepartTime = (e) => { this.setState({ depart_t: e, arrive_t: e }) }
  setArriveTime = (e) => { this.setState({ arrive_t: e }) }

  bundleInput = () => {
    const { carrier, t_Number, seat, note, depart_l, depart_t, arrive_l, arrive_t } = this.state
    let obj = {
      nextTime: new Date(arrive_t),
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
        { title: 't_number', value: t_Number },
        { title: 'seat', value: seat },
        { title: 'note', value: note },
      ],
    }
    return obj
  }

  componentDidMount() {
    let { basic, dbTime, nextTime } = this.props
    const { main, sub } = basic
    if (JSON.stringify(basic) !== '{}' && dbTime) {
      this.setState({
        time: new Date(dbTime * 1000),
        carrier: sub[0].value,
        t_Number: sub[1].value,
        seat: sub[2].value,
        note: sub[3].value,
        depart_l: main.depart.location,
        depart_t: new Date(main.depart.time.seconds * 1000),
        arrive_l: main.arrive.location,
        arrive_t: new Date(main.arrive.time.seconds * 1000),
      })
    }
    // else {
    //   this.setState({
    //     depart_t: nextTime,
    //     arrive_t: nextTime
    //   })
    // }
  }
  render() {
    const { setBasicInput, goToStep5, lang } = this.props
    let {
      carrier,
      t_Number,
      seat,
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
            <div className='add-select-input'>{txt['content']['bus'][lang]}</div>
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
            <label className='add-select-label'>{txt['content']['t_number'][lang]}</label>
            <input
              className='add-select-input'
              type='input'
              placeholder={txt['content']['optional'][lang]}
              value={t_Number}
              onChange={this.setNumber}
            />
          </div>
          <div className='add-select-input-wrap'>
            <label className='add-select-label'>{txt['content']['seat'][lang]}</label>
            <input
              className='add-select-input'
              type='input'
              placeholder={txt['content']['optional'][lang]}
              value={seat}
              onChange={this.setSeat}
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
                setTime={this.setArriveTime}
              />
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

export default Bus_Form_Page