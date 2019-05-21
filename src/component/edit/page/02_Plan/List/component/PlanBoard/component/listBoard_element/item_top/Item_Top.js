import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Type_Icon from './element/Type_Icon';
import Time_Text from './element/Time_Text';
import Drop_Icon from './element/Drop_Icon';
import Content_Trans from './element/Content/Transportation';
import Content_Others from './element/Content/OtherCata';
import { formateTime } from '../../../../../../../../../base';

class Item_Top extends Component {
  state = {
    isMoving: false,
    moveStart: null,
    moveEnd: null,
    hideEditing: false
  }
  toggleEditing = () => this.setState({ isMoving: !this.state['isMoving'] })
  mouseDown = (e) => {
    if (this.stopSliding(e)) return
    this.setState({ moveStart: e.clientX })
  }
  mouseUp = (e) => {
    if (this.stopSliding(e)) return
    const { moveStart } = this.state
    const moveEnd = e.clientX
    this.setSlideDirection(moveStart,moveEnd)
  }
  mobileTouchDown = (e) => {
    if (this.stopSliding(e)) return
    this.setState({ moveStart: e.targetTouches[0].pageX })
  }
  
  mobileTouchMove = (e) => {
    if (this.stopSliding(e)) return
    this.setState({ moveEnd: e.targetTouches[0].pageX })
  }
  mobileTouchUp = (e) => {
    if (this.stopSliding(e)) return
    const { moveStart, moveEnd } = this.state
    this.setSlideDirection(moveStart,moveEnd)
  }
  setSlideDirection = (start,end) => {
    if (start - end > 25) this.setState({ isMoving: true })
    else if (end - start > 25) this.setState({ isMoving: false })
    this.setState({ moveStart: null, moveEnd: null })
  }
  stopSliding = (e) => {
    const EditBtn = e.target.classList.contains('show-item-edit-icon')
    const DropBtn = e.target.classList.contains('map-open-btn')
    if (EditBtn || DropBtn) return true
  }
  render() {
    const { hideEditing, isMoving } = this.state
    let {
      toggleSubItem,
      main,
      type,
      time,
      sub_type,
      sub,
      map,
      getEditData,
      deleteItem,
      id } = this.props
    sub = sub.filter(el => el.value !== '')
    time = time.seconds
    return (
      <div
        style={hideEditing ? { display: 'none' } : { display: 'flex' }}
        id={`item-top-${id}`}
        className={`i-item-top plan ${isMoving && 'right'}`}
        onMouseUp={this.mouseUp}
        onMouseDown={this.mouseDown}
        onTouchStart={this.mobileTouchDown}
        onTouchMove={this.mobileTouchMove}
        onTouchEnd={this.mobileTouchUp}
      >
        <div className="i-item-top-inner">
          <Time_Text time={formateTime(time)} />
          <Type_Icon 
            type={type}
            sub_type={sub_type}
            />
          {
            type === 'trans'
              ?
              <Content_Trans
                main={main}
                sub_type={sub_type} />
              :
              <Content_Others
                main={main}/>
          }
          {
            map.length > 0 || sub.length > 0?
              <Drop_Icon
                id={id}
                toggleSubItem={toggleSubItem} />:null
          }
          <div
            className='i-top-block edit'
            onClick={this.toggleEditing} >
            <div className='show-item-edit-icon'></div>
          </div>
        </div>
        <div className='i-item-edit-wrap'>
          <div
            className="i-item-edit-btn edit"
            onClick={() => getEditData(id)}>
            <div className="i-item-edit-icon edit"></div>
          </div>
          <div
            className="i-item-edit-btn delete"
            onClick={() => deleteItem(id)}>
            <div className="i-item-edit-icon delete"></div>
          </div>
        </div>
      </div>
    )
  }
}

Item_Top.propTypes = {
  lang: PropTypes.number,
  toggleSubItem: PropTypes.func,
  main: PropTypes.object,
  type: PropTypes.string,
  time: PropTypes.object,
  sub_type: PropTypes.string,
  sub: PropTypes.array,
  map: PropTypes.array,
  getEditData: PropTypes.func,
  deleteItem: PropTypes.func,
  id: PropTypes.string
}

export default Item_Top;
