import React, { Component } from 'react';
import Country_Board_lg from './Country_Board_lg';
import Country_Board_sm from './Country_Board_sm';
import * as nation from '../../../data/country';
import { country_text as text } from '../../../data/Content';

class Board_Wrap extends Component {
  state = {
    stateList: nation.states,
    areaList: nation.areas,
    Asia: nation.Asia,
    Europe: nation.Europe,
    Americas: nation.Americas,
    Africa: nation.Africa,
    Oceania: nation.Oceania,
    selected_areaList: [],
    selected_countryList: [],
    selected_state: 'Asia',
    selected_area: 'Eastern_Asia',
    selected_country: 'China'
  }
  //從選擇的州別取得區域與國家(預設第０項)
  setAreaList = (state) => {
    const { areaList } = this.state
    this.setState({
      selected_state: state,
      selected_area: areaList[state][0],
      selected_country: this.state[state][areaList[state][0]][0],
      selected_areaList: areaList[state],
      selected_countryList: this.state[state][areaList[state][0]],
    })
  }
  getSelectedState_lg = (state) => this.setAreaList(state)
  getSelectedState_sm = (e) => this.setAreaList(e.target.value)
  //從選擇的區域取得國家(預設第０項)
  setCountryList = (target) => {
    this.setState({
      selected_area: target,
      selected_countryList: this.state[this.state.selected_state][target]
    })
  }
  getSelectedArea_lg = (area) => this.setCountryList(area)
  getSelectedArea_sm = (e) => this.setCountryList(e.target.value)
  setCountry = (e) => this.setState({ selected_country: e.target.value })
  componentDidMount(){
    this.setState({
      selected_areaList: this.state.areaList['Asia'],
      selected_countryList: this.state.Asia['Eastern_Asia']
    })
  }
  render() {
    const {
      stateList,
      selected_areaList,
      selected_countryList,
      selected_state,
      selected_area,
      selected_country
    } = this.state
    const {
      lang,
      addToCountryList,
    } = this.props
    return (
      <div className='select-counrey-wrap-inner'>
        <Country_Board_lg
          stateList={stateList}
          areaList={selected_areaList}
          countryList={selected_countryList}
          getSelectedState={this.getSelectedState_lg}
          getSelectedArea={this.getSelectedArea_lg}
          formateCountry={nation.Country}
          formateArea={nation.Area}
          formateState={nation.State}
          selected_state={selected_state}
          selected_area={selected_area}
          selected_country={selected_country}
          addToCountryList={addToCountryList}
          stateTitle = {text['state'][lang]}
          areaTitle={text['area'][lang]}
          countryTitle={text['country'][lang]}
          lang={lang} />
        <Country_Board_sm
          stateList={stateList}
          areaList={selected_areaList}
          countryList={selected_countryList}
          getSelectedState={this.getSelectedState_sm}
          getSelectedArea={this.getSelectedArea_sm}
          setCountry={this.setCountry}
          formateCountry={nation.Country}
          formateArea={nation.Area}
          formateState={nation.State}
          selected_state={selected_state}
          selected_area={selected_area}
          selected_country={selected_country}
          addToCountryList={addToCountryList}
          stateTitle = {text['state'][lang]}
          areaTitle={text['area'][lang]}
          countryTitle={text['country'][lang]}
          lang={lang} />
      </div>
    )
  }
}



export default Board_Wrap;