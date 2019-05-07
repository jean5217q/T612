import React, { Component } from 'react';
import { checkLogInStatus } from '../checkLog';
import Step1 from './Select_elem/Step1';
import Step2 from './Select_elem/Step2';
import { formateStartDate } from '../base';
import { connect } from 'react-redux';
import { getLangFromCookie } from '../../action/user';
import Circle_Lift from './Circle_left';
import Circle_Right from './Circle_right';

class Create_page extends Component {
  state = {
    project: '',
    countryList: [],
    fromDate: new Date(),
    toDate: new Date(),
    uid: null,
    toStep2: false,
    creating: false
  }
  //加入國家
  addToCountryList = (country) => {
    const { countryList } = this.state
    if (countryList.includes(country)) return
    this.setState(prevState => {
      return {
        countryList: [
          ...prevState.countryList, country
        ]
      }
    })
  }
  //移除國家
  removeFromCountryList = (country) => {
    this.setState(prevState => ({
      countryList: prevState.countryList.filter(el => el !== country)
    }))
  }
  //專案名稱
  setProject = (e) => this.setState({ project: e.target.value })
  //出發日
  setFromDate = (e) => { this.setState({ fromDate: e, toDate: e }) }
  //返程日
  setToDate = (e) => this.setState({ toDate: e })
  //跳到第二步
  goToStep2 = () => this.setState({ toStep2: true })
  //回到第一步
  backToStep1 = () => this.setState({ toStep2: false })
  //計算總共有幾天
  getTotalDay = () => {
    let start = this.state.fromDate
    let end = this.state.toDate
    let gap = Math.ceil((end - start) / (1000 * 60 * 60 * 24))
    let dateArray = [formateStartDate(new Date(start))]
    console.log(dateArray)
    const getNextDay = (days) => {
      return start.setDate(start.getDate() + days)
    }
    for (let i = 1; i <= gap; i++) {
      let a = new Date(getNextDay(1))
      let b = new Date(formateStartDate(a))
      dateArray.push(b)
    }
    return dateArray
  }
  createProject = (e) => {
    e.preventDefault()
    const { fromDate, toDate, uid, project, countryList } = this.state;
    if (project === '') return;
    this.setState({
      creating: true
    })
    const db = firebase.firestore();
    db.collection("project").add({
      uid: uid,
      title: project,
      time: formateStartDate(fromDate),
      end_time: formateStartDate(toDate),
      country: countryList
    })
      .then(doc => {
        //行前預算
        let totalDay = this.getTotalDay()
        db.collection("project").doc(doc.id)
          .collection("budget").add({
            time: new Date("1970 00:00:00"),
            transportation: [],
            shopping: [],
            food: [],
            hotel: [],
            others: [],
            entertainment: []
          })
        totalDay.forEach(el => {
          db.collection("project").doc(doc.id)
            .collection("itinerary").add({
              time: el,
              country: this.state.countryList[0]
            })
          db.collection("project").doc(doc.id)
            .collection("budget").add({
              time: el,
              transportation: [],
              shopping: [],
              food: [],
              hotel: [],
              others: [],
              entertainment: []
            })
        })
        this.props.history.push(`edit/basic?project=${doc.id}`)
      })
  }
  getUid = (uid) => {
    this.setState({ uid: uid })
  }
  componentDidMount() {
    this.props.dispatch(getLangFromCookie())
    document.querySelector('body').classList.add('create_page');
    checkLogInStatus(this.getUid, this.props);
    this.setState({ creating: false })

  }
  componentWillUnmount() {
    document.querySelector('body').classList.remove('create_page')
  }
  render() {
    const {
      toStep2,
      fromDate,
      toDate,
      project,
      creating
    } = this.state
    const { lang } = this.props
    return (
      <div className="linear-gradient-bg create">
        <Step1
          toStep2={toStep2}
          addToCountryList={this.addToCountryList}
          removeFromCountryList={this.removeFromCountryList}
          countryList={this.state.countryList}
          goToStep2={this.goToStep2}
          lang={lang}
        />
        <Step2
          toStep2={toStep2}
          setProject={this.setProject}
          setFromDate={this.setFromDate}
          setToDate={this.setToDate}
          fromDate={fromDate}
          toDate={toDate}
          project={project}
          backToStep1={this.backToStep1}
          createProject={this.createProject}
          lang={lang}
          creating={creating}
        />
        <Circle_Lift />
        <Circle_Right />
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  let lang = state.user.lang
  return {
    lang
  }
}
export default connect(mapStateToProps)(Create_page)