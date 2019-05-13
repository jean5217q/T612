import React, { Component } from 'react'
import { NavLink } from 'react-router-dom';
import { select_text as text } from '../../../data/Content';

class LinkItem extends Component {
  state = {
    scale: 1,
    opacity: 1,
    stop: false,
    scaleInterval: null,
    opacityInterval: null
  }
  setCircleScale = () => {
    this.setState(prevState => ({
      scale: (prevState.scale + 1)
    }), () => {
      if (this.state.scale * 0.2 >= 15) {
        this.setState({
          scaleInterval: clearInterval(this.state.scaleInterval),
          opacityInterval: setInterval(this.setCircleOpacity, 15)
        })
        return
      }
    })
  }
  setCircleOpacity = () => {
    this.setState(prevState => ({
      opacity: prevState.opacity - 0.05
    }), () => {
      if (this.state.opacity <= 0) {
        this.setState({
          scale: 0,
          opacity: 1,
          stop: false,
          opacityInterval: clearInterval(this.state.opacityInterval)
        })
        return
      }
    })
  }
  animateCircle = () => {
    if (window.innerWidth < 768) return
    this.setState({
      stop: true,
      scale: 0,
      scaleInterval: setInterval(this.setCircleScale, 5)
    }, () => console.log(this.state))
  }
  render() {
    const { stop, scale, opacity } = this.state
    const { lang, path, cata } = this.props
    return (
      <NavLink
        to={path}
        className="select-box-block">
        <div
          className={`select-box-circle ${cata}`}
          onMouseEnter={!stop ? this.animateCircle : null}>
          <div
            style={{
              transform: `scale(${scale * 0.2})`,
              opacity: `${opacity}`
            }}
            className="select-box-circle-inner">
          </div>
        </div>
        <div className="select-box-title">
          <span className="side">
            {text[`${cata}_sm`][lang]}
          </span>
          <span className={`main lang-${lang} ${cata}`}>
            {text[`${cata}_lg`][lang]}
          </span>
        </div>
        <div className="select-box-link"></div>
      </NavLink>
    )
  }
}

export default LinkItem;
