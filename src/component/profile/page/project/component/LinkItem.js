import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { setDateToNumber } from '../../../../base';

class Link extends Component {
  state = {
    circleMouse: false,
    left: 0,
    top: 0
  }
  setMouseAxis = (x, y) => this.setState({left: x,top: y})
  startMouse = () => this.setState({circleMouse: true})
  moveMouse = (e) => {
    e.preventDefault()
    e.stopPropagation()
    let bound = e.currentTarget.getBoundingClientRect()
    this.setMouseAxis(e.clientX - bound.left, e.clientY - bound.top)
  }
  removeMouse = () => this.setState({circleMouse: false })
  render() {
    const { circleMouse, left, top } = this.state
    const { item, id, openDeletePopBlock } = this.props
    let time = setDateToNumber(item['time'].seconds)
    const { country } = item
    return (
      <div
        className='profile-project-item'
        onMouseEnter={this.startMouse}
        onMouseMove={this.moveMouse}
        onMouseLeave={this.removeMouse}>
        {/* 球 */}
        <div
          style={circleMouse?{ left: left, top: top }:null}
          className={`project-item-circle ${circleMouse?'show':null}`}>
        </div>
        <div
          className='plan-delete profile'
          onClick={() => openDeletePopBlock(id, item.title)}>
          <div className='plan-delete-icon'></div>
        </div>
        <NavLink
          className='plan-content profile'
          to={{ pathname: '/edit/basic', search: `?project=${id}` }}>
          <div className='plan-country-wrap'>
            {
              country.map((country, index) =>
                <div
                  key={index}
                  className='country-flag'
                  style={{ backgroundImage: 'url(' + require(`../../../../../images/country/${country}.svg`) + ')' }}>
                </div>
              )
            }
          </div>
          <div className='plan-main-text profile'>{item.title}</div>
          <div className='plan-sub-text profile'>{time.y}.{time.m}</div>
        </NavLink>
      </div>
    )
  }
}

export default Link;