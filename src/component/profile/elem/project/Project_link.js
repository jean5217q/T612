import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { formateMonthDay } from '../../../base';

class Link extends Component {
  state = {
    edit: false,
    circle: false,
    left: 0,
    top: 0
  }
  toggleEdit = () => {
    this.setState({
      edit: !this.state['edit']
    })
  }
  closeEdit = () => {
    this.setState({
      edit: false
    })
  }
  mouse = (x, y) => {
    this.setState({
      left: x,
      top: y
    })
  }
  circleStart = () => {
    this.setState({
      circle: true
    })
  }
  circleMove = (e) => {
    e.preventDefault()
    e.stopPropagation()
    let bound = e.currentTarget.getBoundingClientRect()
    this.mouse(e.clientX - bound.left, e.clientY - bound.top)
    // const target = e.target
    // if (target.classList.contains('project-item-circle')) return
    // if (target.classList.contains('profile-project-main-text')) {
    //   !this.state.mouseBig && this.setState({ mouseBig: true })
    // }
    // else this.setState({ mouseBig: false })
  }
  circleRemove = () => {
    this.setState({
      circle: false
    })
  }
  render() {
    const { circle, left, top } = this.state
    const { item, id, openPopUp } = this.props
    let time = formateMonthDay(item['time'].seconds)
    const { country } = item
    return (
      <div
        className='profile-project-item'
        onMouseEnter={this.circleStart}
        onMouseMove={this.circleMove}
        onMouseLeave={this.circleRemove}>
        {/* 球 */}
        <div
          style={circle ? { left: left, top: top } : null}
          className={`project-item-circle ${circle ? 'show' : null}`}></div>
        {/* 刪除 */}
        <div
          className='plan-delete profile'
          onClick={() => openPopUp(id, item.title)}
        // onClick={() => { deleteDay(id, this.closeEdit) }}
        >
          <div className='plan-delete-icon'></div>
        </div>
        <NavLink
          className='plan-content profile'
          to={{ pathname: '/edit/basic', search: `?project=${id}` }}>
          <div className='plan-country-wrap'>
            {
              country.map((el, index) =>
                <div
                  key={index}
                  className='country-flag'
                  style={{ backgroundImage: 'url(' + require(`../../../../images/country/${el}.svg`) + ')' }}
                >
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

export default connect()(Link);