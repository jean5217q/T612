//env
import React, { Component } from 'react';
//component
import Form_Submit_Btn from '../Share_elem/Form_Submit_Btn';
import Time from '../Share_elem/Time';
import { plan_form as txt } from '../../../../../../../data/Content';

class Hotel_Form_page extends Component {
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
    let obj = {
      main: { location: name },
      time: new Date(time),
      sub: [
        { title: 'address', value: address },
        { title: 'phone', value: phone },
        { title: 'email', value: email },
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
          <div className='add-select-input-wrap'>
            <label className='add-select-label'>{txt['content']['type'][lang]}</label>
            <div className='add-select-input'>{txt['content']['hotel'][lang]}</div>
          </div>
          <div className='add-select-input-wrap'>
            <label className='add-select-label'>{txt['content']['name'][lang]}</label>
            <input
              className='add-select-input'
              type='input'
              value={name}
              onChange={this.setName} />
          </div>
          <div className='add-select-input-wrap time'>
            <label className='add-select-label'>{txt['content']['check_in'][lang]}</label>
            <div className='add-select-input date'>
              <Time
                time={time}
                setTime={this.setTime} />
            </div>
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
            <label className='add-select-label'>{txt['content']['phone'][lang]}</label>
            <input
              className='add-select-input'
              type='input'
              placeholder={txt['content']['optional'][lang]}
              value={phone}
              onChange={this.setPhone} />
          </div>
          <div className='add-select-input-wrap'>
            <label className='add-select-label'>{txt['content']['email'][lang]}</label>
            <input
              className='add-select-input'
              type='input'
              placeholder={txt['content']['optional'][lang]}
              value={email}
              onChange={this.setEmail} />
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
        {/* <div className='add-select-group'>
            <div className='add-select-title-wrap'>
              <div className='add-select-title-decor'></div>
              <div className='add-select-title-text'>Check-in</div>
            </div>
            <div className='add-select-input-wrap time'>
          <label className='add-select-label'>Date</label>
          <div className='add-select-input date'>
            <Date_Time
              time={check_in}
              setTime={this.setCheckInTime}/>
          </div>  
        </div>
        </div>
          <div className='add-select-group'> */}
        {/* <div className='add-select-title-wrap'>
          <div className='add-select-title-decor'></div>
          <div className='add-select-title-text'>Check-out</div>
        </div>
        <div className='add-select-input-wrap time'>
          <label className='add-select-label'>Date</label>
          <div className='add-select-input date'>
            <Date_Time
              time={check_out}
              setTime={this.setCheckOutTime}/>
          </div>  
        </div>
      </div> */}
        <Form_Submit_Btn
          setBasicInput={setBasicInput}
          bundleInput={this.bundleInput}
          goToStep5={goToStep5}
          lang={lang} />
      </div>

    )
  }
}

export default Hotel_Form_page