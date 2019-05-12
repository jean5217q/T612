import React, { Component } from 'react';

class Planet extends Component {
  state = {
    interval1: null,
    interval2: null,
    evtStop: false,
    step: 0,
    percent: 30
  }
  startAnimate = () => {
    this.setState({
      interval1: setInterval(this.startGradient1,20)
    })
  }
  startGradient1 = () => {
    this.setState(prevState=>({
      evtStop: true,
      step: prevState.step+0.2,
      percent: prevState.step+0.2+30
    }),()=>{
      if(this.state.percent>=60) {
        this.setState({
          step: 0,
          percent: 60,
          interval1: clearInterval(this.state.interval1),
          interval2: setInterval(this.startGradient2,20)
        })
      }
    })
  }
  startGradient2 = () => {
    this.setState(prevState=>({
      step: prevState.step+0.2,
      percent: 60-prevState.step+0.2
    }),()=>{
      if(this.state.percent<30) {
        this.setState({
          evtStop: false,
          step: 0,
          percent: 30,
          interval2: clearInterval(this.state.interval2)
        })
      }
    })
  }
  render() {
    const { addSiteTag } = this.props
    const { evtStop, percent } = this.state
    return (
      <div
        className="head-visual check-site"
        onMouseOver={addSiteTag}>
        <div className="head-visual-line outer-line check-site">
          <div className="head-visual-line-circle outer-circle check-site"></div>
        </div>
        <div className="head-visual-line inner-line check-site">
          <div className="head-visual-line-circle inner-circle check-site"></div>
        </div>
        <div 
          className="circle-group check-site"
          onMouseOver={!evtStop?this.startAnimate:null}>
          <div 
            className="head-visual-big-circle check-site"
            style={{
              backgroundImage : `radial-gradient(rgba(255,255,255,0) ${percent}%,
                                  rgba(255,255,255,0.6),
                                  white 95%)`
              }}>
          </div>
          <div className="c check-site"></div>
        </div>
      </div>
    )
  }
}

export default Planet












