import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Type from '../share_element/input/Type';
import General from '../share_element/input/General';
import DateInput from '../share_element/input/DateInput';
import TimeInput from '../share_element/input/TimeInput';
import Group_Title from '../share_element/input/Group_Title';
import Submit from '../share_element/Submit';
import { plan_form as text } from '../../../../../../../../../data/Content';
class Train extends Component {
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
    return {
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
        { title: 'carrier', value: carrier },
        { title: 't_number', value: t_Number },
        { title: 'seat', value: seat },
        { title: 'note', value: note },
      ]
    }
  }
  componentDidMount() {
    let { basic, dbTime } = this.props
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
      arrive_t,
    } = this.state
    return (
      <>
        <div className='add-select-group'>
          <Type 
            typeLabel={text['content']['type'][lang]}
            typeValue={text['content']['train'][lang]}/>
          <General
            label={text['content']['carrier'][lang]}
            placeholder={text['content']['optional'][lang]}
            value={carrier}
            setInput={this.setCarrier}/>
          <General
            label={text['content']['t_number'][lang]}
            placeholder={text['content']['optional'][lang]}
            value={t_Number}
            setInput={this.setNumber}/>
          <General
            label={text['content']['seat'][lang]}
            placeholder={text['content']['optional'][lang]}
            value={seat}
            setInput={this.setSeat}/>
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

Train.propTypes = {
  time: PropTypes.object,
  basic: PropTypes.object,
  dbTime: PropTypes.number,
  setBasicInput: PropTypes.func,
  goToStep5: PropTypes.func,
  lang: PropTypes.number,
}

export default Train