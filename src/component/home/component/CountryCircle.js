import React, { Component } from 'react';

class CountryCircle extends Component {
  state = {
    countryList: ['Taiwan','Germany','France','Korea','Japan','China','India','America','England','Turkey','Australia'],
    circleText: 'Taipei',
    showInterval: null,
    hideInterval: null,
    opacity: 0,
  }
  randomCountry = () => {
    const { countryList } = this.state
    const countryIndex = parseInt(Math.random()*countryList.length)
    let selectedCountry = null
    countryList.forEach((country,index)=>{
      if(index===countryIndex) {
        selectedCountry = country
      }
    })
    return selectedCountry
  }
  startAnimate = () => {
    this.setState({
      circleText: this.randomCountry(),
      showInterval: setInterval(this.showCircle,20)
    })
  }
  showCircle = () => {
    this.setState(prevState=>({
      opacity: prevState.opacity+0.01
    }),()=>{
      if(this.state.opacity>=1) {
        this.setState({
          opacity: 1,
          showInterval: clearInterval(this.state.showInterval)
        },()=>{
          setTimeout(()=>{
            this.setState({
              hideInterval: setInterval(this.hideCircle,15)
            })
          },2000)
        })
      }
    })
  }
  hideCircle = () => {
    this.setState(prevState=>({
      opacity: prevState.opacity-0.01
    }),()=>{
      if(this.state.opacity<=0) {
        this.setState({
          opacity: 0,
          hideInterval: clearInterval(this.state.hideInterval)
        },()=>{
          setTimeout(()=>{
            this.setState({
              circleText: this.randomCountry(),
              showInterval: setInterval(this.showCircle,15)
            })
          },2000)
        })
      }
    })
  }
  componentDidMount(){
    this.startAnimate();
    this.showCircle();
  }
  render(){
    const { circleText, opacity } = this.state
    return(
      <div 
        className="decor-circle1-wrap"
        style={{opacity: opacity}}>
        <div className="decor-circle1"></div>
        <div className="decor-text1">{circleText}</div>
      </div>
    )
  }
}

export default CountryCircle