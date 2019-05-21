import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Step1 from './component/step1_country/Step1';
import Step2 from './component/step2_info/Step2'
import Circle from './component/Circle';
import { checkLogInStatus, formateStartDate, db } from '../base';
import { getLangFromCookie } from '../../action/user';

class Create_page extends Component {
  state = {
    uid: null,
    project: '',
    selected_countryList: [],
    startDate: new Date(),
    endDate: new Date(),
    step2: false,
    creating: false
  }
  setProject = (e) => this.setState({ project: e.target.value })
  setStartDate = (e) => { this.setState({ startDate: e, endDate: e }) }
  setEndDate = (e) => this.setState({ endDate: e })
  setUid = (uid) => this.setState({ uid: uid })
  goToStep2 = () => this.setState({ step2: true })
  backToStep1 = () => this.setState({ step2: false })

  addToCountryList = (country) => {
    const { selected_countryList } = this.state
    if (selected_countryList.includes(country)) return
    this.setState(prevState => ({
      selected_countryList: [...prevState.selected_countryList, country]
    }))
  }
  removeFromCountryList = (country) => {
    this.setState(prevState => ({
      selected_countryList: prevState.selected_countryList.filter(el => el !== country)
    }))
  }
  getNextDay = (dayIndex) => {
    const { startDate } = this.state
    return startDate.setDate(startDate.getDate() + dayIndex)
  }
  getTotalDay = () => {
    const { startDate, endDate } = this.state
    const totalDay = Math.ceil((endDate - startDate) / 86400000)
    let dateList = [formateStartDate(new Date(startDate))]
    for (let i = 1; i <= totalDay; i++) {
      const nextDay = new Date(this.getNextDay(1))
      const formateDay = new Date(formateStartDate(nextDay))
      dateList.push(formateDay)
    }
    return dateList
  }
  setBudgetDefault = (inputDate) => {
    return {
      time: inputDate,
      transportation: [],
      shopping: [],
      food: [],
      hotel: [],
      others: [],
      entertainment: []
    }
  }
  createProject = (e) => {
    e.preventDefault()
    const { startDate, endDate, uid, project, selected_countryList } = this.state;
    if (project === '') return;
    this.setState({ creating: true })
    db.collection("project").add({
      uid: uid,
      title: project,
      time: formateStartDate(startDate),
      end_time: formateStartDate(endDate),
      country: selected_countryList
    })
    .then(doc => {
      const totalDay = this.getTotalDay();
      db.collection("project").doc(doc.id)
        .collection("budget").add(this.setBudgetDefault(new Date("1970 00:00:00")))
      totalDay.forEach(date => {
        db.collection("project").doc(doc.id)
          .collection("itinerary").add({
            time: date,
            country: selected_countryList[0]
          })
        db.collection("project").doc(doc.id)
          .collection("budget").add(this.setBudgetDefault(date))
      })
      this.props.history.push(`edit/basic?project=${doc.id}`)
    })
  }
  componentDidMount() {
    this.props.dispatch(getLangFromCookie());
    checkLogInStatus(this.setUid, this.props);
    this.setState({ creating: false });
    document.querySelector('body').classList.add('create_page');

  }
  componentWillUnmount() {
    document.querySelector('body').classList.remove('create_page')
  }
  render() {
    const {
      step2,
      startDate,
      endDate,
      project,
      creating,
      selected_countryList
    } = this.state
    const { lang } = this.props
    return (
      <div className="linear-gradient-bg create">
        <Step1
          lang={lang}
          step2={step2}
          selected_countryList={selected_countryList}
          addToCountryList={this.addToCountryList}
          removeFromCountryList={this.removeFromCountryList}
          goToStep2={this.goToStep2}
        />
        <Step2
          lang={lang}
          startDate={startDate}
          endDate={endDate}
          project={project}
          step2={step2}
          creating={creating}
          setProject={this.setProject}
          setStartDate={this.setStartDate}
          setEndDate={this.setEndDate}
          backToStep1={this.backToStep1}
          createProject={this.createProject}
        />
        <Circle direction='left' />
        <Circle direction='right' />
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    lang: state.user.lang
  }
}

Create_page.propTypes = {
  lang: PropTypes.number,
  dispatch: PropTypes.func,
  history: PropTypes.object

}

export default connect(mapStateToProps)(Create_page)