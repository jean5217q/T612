import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Type from '../share_element/input/Type';
import General from '../share_element/input/General';
import TimeInput from '../share_element/input/TimeInput';
import Submit from '../share_element/Submit';
import { plan_form as text } from '../../../../../../../../../data/Content';
class Hotel extends Component {
  state = {
    name: '',
    address: '',
    phone: '',
    email: '',
    note: '',
    check_in: this.props.time,
    check_out: this.props.time,
    time: this.props.time,
  }
  setName = (e) => { this.setState({ name: e.target.value }) }
  setAddress = (e) => { this.setState({ address: e.target.value }) }
  setPhone = (e) => { this.setState({ phone: e.target.value }) }
  setEmail = (e) => { this.setState({ email: e.target.value }) }
  setNote = (e) => { this.setState({ note: e.target.value }) }
  setTime = (e) => { this.setState({ time: e }) }
  bundleInput = () => {
    const { name, address, phone, email, note, time } = this.state
    return {
      main: { location: name },
      time: time,
      sub: [
        { title: 'address', value: address },
        { title: 'phone', value: phone },
        { title: 'email', value: email },
        { title: 'note', value: note },
      ],
    }
  }
  componentDidMount() {
    let { basic, dbTime } = this.props
    const { main, sub } = basic
    if (JSON.stringify(basic) !== '{}' && dbTime) {
      this.setState({
        name: main.location,
        time: new Date(dbTime * 1000),
        address: sub[0].value,
        phone: sub[1].value,
        email: sub[2].value,
        note: sub[3].value,
      })
    }
  }
  render() {
    const { setBasicInput, goToStep5, lang } = this.props
    let {
      name,
      address,
      phone,
      email,
      time,
      note } = this.state
    return (
      <div>
        <div className='add-select-group'>
          <Type 
            typeLabel={text['content']['type'][lang]}
            typeValue={text['content']['hotel'][lang]}/>
          <General
            label={text['content']['name'][lang]}
            placeholder={text['content']['optional'][lang]}
            value={name}
            setInput={this.setName}/>
          <TimeInput 
            label={text['content']['check_in'][lang]}
            value={time}
            setTime={this.setTime} />
          <General
            label={text['content']['address'][lang]}
            placeholder={text['content']['optional'][lang]}
            value={address}
            setInput={this.setAddress}/>
          <General
            label={text['content']['phone'][lang]}
            placeholder={text['content']['optional'][lang]}
            value={phone}
            setInput={this.setPhone}/>
          <General
            label={text['content']['email'][lang]}
            placeholder={text['content']['optional'][lang]}
            value={email}
            setInput={this.setEmail}/>
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

Hotel.propTypes = {
  time: PropTypes.object,
  basic: PropTypes.object,
  dbTime: PropTypes.number,
  setBasicInput: PropTypes.func,
  goToStep5: PropTypes.func,
  lang: PropTypes.number,
}

export default Hotel