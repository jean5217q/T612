import React, { Component } from 'react';
import Lg_Select from './Lg_Select';
import Sm_Select from './Sm_Select';
import Step1_Submit from './Submit';
import * as n from '../../../../../data/country'

class Board extends Component {
  state = {
    states: n.states,
    area: n.areas,
    Asia: n.Asia,
    Europe: n.Europe,
    Americas: n.Americas,
    Africa: n.Africa,
    Oceania: n.Oceania,
    current_area_array: [],
    current_country_array: [],
    current_state: 'Asia',
    current_area: 'Eastern_Asia',
    current_country: 'China'
  }
  getRenderArea = (id) => {
    this.setState({
      current_area_array: this.state.area[id],
      current_state: id,
      current_area: this.state.area[id][0],
      current_country_array: this.state[id][this.state.area[id][0]]
    })
  }
  smgetRenderArea = (e) => {
    const target = e.target.value
    this.setState({
      current_area_array: this.state.area[target],
      current_state: target,
      current_area: this.state.area[target][0],
      current_country_array: this.state[target][this.state.area[target][0]],
      current_country: this.state[target][this.state.area[target][0]][0]
    })
  }
  getRenderCountry = (id) => {
    this.setState({
      current_country_array: this.state[this.state.current_state][id],
      current_area: id
    })
  }
  smgetRenderCountry = (e) => {
    const target = e.target.value
    this.setState({
      current_country_array: this.state[this.state.current_state][target],
      current_area: target,
      current_country: this.state[this.state.current_state][target][0]
    })
  }
  smgetTargetCountry = (e) => {
    this.setState({ current_country: e.target.value })
  }

  componentWillMount() {
    this.setState({
      current_area_array: this.state.area['Asia'],
      current_country_array: this.state.Asia['Eastern_Asia']
    })
  }
  render() {
    const {
      states,
      current_area_array,
      current_country_array,
      current_state,
      current_area,
      current_country
    } = this.state
    const {
      addToCountryList,
      removeFromCountryList,
      countryList,
      modifyCountry,
      lang,
      closeSelectCountry
    } = this.props
    return (
      <div
        className='all-select-counrey-wrap modify'>
        <div className='select-close-bar'>
          <div
            className='select-close-icon-wrap'
            onClick={closeSelectCountry}
          >
            <div className='select-close-icon'></div>
          </div>
        </div>
        <Lg_Select
          states={states}
          area={current_area_array}
          country={current_country_array}
          getRenderArea={this.getRenderArea}
          getRenderCountry={this.getRenderCountry}
          formateCountry={n.Country}
          formateArea={n.Area}
          formateState={n.State}
          current_state={current_state}
          current_area={current_area}
          addToCountryList={addToCountryList}
          lang={lang} />
        <Sm_Select
          states={states}
          area={current_area_array}
          country={current_country_array}
          smgetRenderArea={this.smgetRenderArea}
          smgetRenderCountry={this.smgetRenderCountry}
          smgetTargetCountry={this.smgetTargetCountry}
          formateCountry={n.Country}
          formateArea={n.Area}
          formateState={n.State}
          current_state={current_state}
          current_area={current_area}
          current_country={current_country}
          addToCountryList={addToCountryList}
          lang={lang} />
        {
          countryList.length > 0 ?
            <Step1_Submit
              removeFromCountryList={removeFromCountryList}
              countryList={countryList}
              modifyCountry={modifyCountry}
              formateCountry={n.Country}
              lang={lang}
            />
            : null
        }

      </div>
    )
  }
}



export default Board;