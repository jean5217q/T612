import React, { Component } from 'react';
//component
import Basic_Top from './elem/Basic_Top';
import Basic_Middle from './elem/Basic_Middle';
import Basic_Bottom from './elem/Basic_Bottom';
import { connect } from 'react-redux';
import { getQuery } from '../../../base';
import Board from './country/Board';
import { asyncGetProjectBasic } from '../../../../action/itinerary';
import Loading_Circle from '../../../loading/Loading_Circle';
import { topBar } from '../../../../data/Content'
//firebase 國家資訊 / 大標題 / 開始結束日
class Basic extends Component {
  state = {
    country: [],
    origin_country: [],
    modify_country: [],
    selectCountry: false
  }
  //加入國家
  addToCountryList = (country) => {
    const { modify_country } = this.state
    if (modify_country.includes(country)) return
    this.setState(prevState => {
      return {
        modify_country: [
          ...prevState.modify_country, country
        ]
      }
    })
  }
  //移除國家
  removeFromCountryList = (country) => {
    this.setState({
      modify_country: this.state.modify_country.filter(el => el !== country)
    })
  }
  //展開選擇國家
  openSelectCountry = () => { this.setState({ selectCountry: true }) }
  //關閉選擇國家
  closeSelectCountry = () => {
    this.setState({
      selectCountry: false,
      modify_country: this.state.origin_country
    })
  }
  //變更國家
  modifyCountry = () => {
    const { projectId } = getQuery()
    const db = firebase.firestore();
    db.collection('project').doc(projectId).update({
      country: this.state.modify_country
    })
      .then(doc => {
        this.setState({
          country: [],
          modify_country: [],
          selectCountry: false
        })
        this.props.dispatch(asyncGetProjectBasic(projectId))
        this.getCountryData()
      })
      .catch(err => console.log(err))
  }
  //接國家資料
  getCountryData = () => {
    const { projectId } = getQuery();
    const db = firebase.firestore();
    db.collection('project').doc(projectId).get()
      .then(doc => {
        const countryList = doc.data().country
        countryList.forEach(country => {
          db.collection('nation').where('id', '==', country)
            .get()
            .then(q => {
              q.forEach(doc => {
                this.setState(prevState => ({
                  country: [...prevState.country, doc.data()],
                  modify_country: [...prevState.modify_country, doc.data().id],
                  origin_country: [...prevState.origin_country, doc.data().id],
                }), () => console.log(this.state))
              })
            })
        })
      })
      .catch(err => console.log(err))

  }
  componentWillMount() {
    this.getCountryData()
  }
  render() {
    const {
      basic,
      projectId,
      dayList,
      user,
      color,
      lang } = this.props
    const country = this.state.country
    const modify_country = this.state.modify_country
    if (country.length > 0) {
      //旅行名字
      const { title } = basic
      //旅行開始日
      const start = dayList[0].item.time.seconds
      //旅行結束日
      const end = dayList[dayList.length - 1].item.time.seconds
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
              <Basic_Top
                title={title}
                projectId={projectId}
                lang={lang} />
              <Basic_Middle
                start={start}
                end={end}
                lang={lang} />
              <Basic_Bottom
                user={user}
                country={country}
                openSelectCountry={this.openSelectCountry}
                lang={lang} />
              <div
                style={this.state.selectCountry ? { display: 'block' } : { display: 'none' }}
                className='edit-country_board'>
                <div
                  className='edit-country_layout'
                  onClick={this.closeSelectCountry}></div>
                <Board
                  countryList={modify_country}
                  addToCountryList={this.addToCountryList}
                  removeFromCountryList={this.removeFromCountryList}
                  modifyCountry={this.modifyCountry}
                  closeSelectCountry={this.closeSelectCountry}
                  lang={lang} />
              </div>
            </div>
          </div>
        </div>
      )
    }
    else {
      return (
        <Loading_Circle />
      )
    }

  }
}


const mapStateToProps = (state) => {
  let basic = state.itinerary.projectBasic
  let dayList = state.itinerary.projectDayIdList
  basic = JSON.stringify(basic) !== "{}" ? basic : null
  return {
    basic: basic,
    dayList: dayList,
  }
}

export default connect(mapStateToProps)(Basic);