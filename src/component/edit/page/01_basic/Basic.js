import React, { Component } from 'react';
import { connect } from 'react-redux';
import Title_Block from './component/Title_Block';
import Date_Block from './component/Date_Block';
import Country_Block from './component/Country_Block';
import Board_Controller from './countryBoard/Board_Controller';
import { getQueryId, db } from '../../../base';
import { asyncGetProjectBasic } from '../../../../action/itinerary';
import Circle_Loading from '../../../loading/Circle_Loading';
import { topBar } from '../../../../data/Content'

class Basic extends Component {
  state = {
    countryList: [],
    original_countryList: [],
    selected_countryList: [],
    countryBlockShowing: false
  }
  addToCountryList = (country) => {
    const { selected_countryList } = this.state
    if (selected_countryList.includes(country)) return
    this.setState(prevState=>({
      selected_countryList: [...prevState.selected_countryList, country]
    }))
  }
  removeFromCountryList = (country) => {
    this.setState({
      selected_countryList: 
      this.state.selected_countryList
      .filter(el => el !== country)
    })
  }
  showCountryBlock = () => { this.setState({ countryBlockShowing: true }) }
  //關閉選擇國家
  hideCountryBlock = () => {
    this.setState({
      countryBlockShowing: false,
      selected_countryList: this.state.original_countryList
    })
  }
  //變更國家
  updateCountryList = () => {
    const { projectId } = getQueryId()
    db.collection('project').doc(projectId).update({
      country: this.state.selected_countryList
    })
    .then(() => {
      this.emptyCountryList()
      this.props.dispatch(asyncGetProjectBasic(projectId))
      this.getCountryFromDb()
    })
    .catch(err => alert('Error'))
  }
  emptyCountryList = () => {
    this.setState({
      countryList: [],
      selected_countryList: [],
      original_countryList: [],
      countryBlockShowing: false
    })
  }
  //接國家資料
  getCountryFromDb = () => {
    const { projectId } = getQueryId();
    db.collection('project').doc(projectId).get()
    .then(doc => {
      const dbCountryList = doc.data().country
      dbCountryList.forEach(country => {
        db.collection('nation').where('id', '==', country).get()
        .then(q => q.forEach(doc => this.setCountryList(doc)))
      })
    })
    .catch(err => alert('Error'))
  }
  setCountryList = (doc) => {
    this.setState(prevState => ({
      countryList: [...prevState.countryList, doc.data()],
      selected_countryList: [...prevState.selected_countryList, doc.data().id],
      original_countryList: [...prevState.original_countryList, doc.data().id],
    }))
  }
  componentDidMount(){
    this.getCountryFromDb()
  }
  render() {
    const {
      basic,
      projectId,
      dayList,
      user,
      color,
      lang } = this.props
    const {
      countryList,
      selected_countryList,
      countryBlockShowing } = this.state
    if (countryList.length > 0) {
      const { title } = basic
      const startDay = dayList[0].item.time.seconds
      const endDay = dayList[dayList.length - 1].item.time.seconds
      return (
        <div className='edit-main-wrap'>
          <div className='edit-list-wrap basic'>
            <div className={`list-top color-${color}`}>
              <div className='list-top-inner'>
                <div className={`top-title lang-${lang}`}>
                  {topBar['basic'][lang]}
                </div>
                <div className="top-block"></div>
              </div>
            </div>
            <div className='list-bottom basic'>
              <Title_Block
                title={title}
                projectId={projectId}
                lang={lang} 
              />
              <Date_Block
                startDay={startDay}
                endDay={endDay}
                lang={lang} 
              />
              <Country_Block
                user={user}
                lang={lang}
                countryList={countryList}
                showCountryBlock={this.showCountryBlock}
              />
              <div
                style={countryBlockShowing ? { display: 'block' } : { display: 'none' }}
                className='edit-country_board'>
                <div
                  className='edit-country_layout'
                  onClick={this.hideCountryBlock}>
                </div>
                <Board_Controller
                  lang={lang}
                  selected_countryList={selected_countryList}
                  addToCountryList={this.addToCountryList}
                  removeFromCountryList={this.removeFromCountryList}
                  updateCountryList={this.updateCountryList}
                  hideCountryBlock={this.hideCountryBlock}
                />
              </div>
            </div>
          </div>
        </div>
      )
    }
    else return (<Circle_Loading />)
  }
}

const mapStateToProps = (state) => {
  return {
    basic: state.itinerary.projectBasic,
    dayList: state.itinerary.projectDayIdList,
  }
}

export default connect(mapStateToProps)(Basic);