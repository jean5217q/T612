import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Item_Show from './Item_show';
import Item_Edit from './Item_edit';

class ListItem extends Component {
  state = {
    isMoving: false,
    moveStart: null,
    moveEnd: null,
    editBoardShowing: false
  }
  closeEditBoard = () => this.setState({editBoardShowing: false})
  showEditBoard = () => {
    this.setState({
      editBoardShowing: true,
      isMoving: false
    })
  }
  toggleEditSlide = () => this.setState({ isMoving: !this.state['isMoving'] })
  mouseDown = (e) => {this.setState({ moveStart: e.clientX })}
  mouseUp = (e) => {
    if (e.target.classList.contains('budget-show-item-edit-icon')) return
    const { moveStart } = this.state
    const moveEnd = e.clientX
    this.setSlideDirection(moveStart,moveEnd)
  }
  mobileTouchDown = (e) => this.setState({ moveStart: e.targetTouches[0].pageX })
  mobileTouchMove = (e) => this.setState({ moveEnd: e.targetTouches[0].pageX })
  mobileTouchUp = () => {
    const { moveStart, moveEnd } = this.state
    this.setSlideDirection(moveStart,moveEnd)
  }
  setSlideDirection = (start,end) => {
    if (start - end > 25) this.setState({ isMoving: true })
    else if (end - start > 25) this.setState({ isMoving: false })
    this.setState({ moveStart: null, moveEnd: null })
  }
  render() {
    const {
      lang,
      text,
      index,
      item,
      type,
      projectId,
      dateId,
      user_currency,
      currencyList,
      deleteItem,
      updateItem,
      formateAmount
    } = this.props

    const { isMoving, editBoardShowing } = this.state
    return (
      <li className='b-item'>
        <Item_Show
          text={text}
          user_currency={user_currency}
          isMoving={isMoving}
          index={index}
          item={item}
          type={type}
          projectId={projectId}
          dateId={dateId}
          deleteItem={deleteItem}
          toggleEditSlide={this.toggleEditSlide}
          showEditBoard={this.showEditBoard}
          mouseDown={this.mouseDown}
          mouseUp={this.mouseUp}
          mobileTouchDown={this.mobileTouchDown}
          mobileTouchMove={this.mobileTouchMove}
          mobileTouchUp={this.mobileTouchUp}
          formateAmount={formateAmount}
        />
        <Item_Edit
          lang={lang}
          text={text}
          user_currency={user_currency}
          currencyList={currencyList}
          index={index}
          item={item}
          projectId={projectId}
          dateId={dateId}
          type={type}
          editBoardShowing={editBoardShowing}
          closeEditBoard={this.closeEditBoard}
          updateItem={updateItem} 
        />
      </li>
    )
  }
}

ListItem.propTypes = {
  lang: PropTypes.number,
  text: PropTypes.object,
  index: PropTypes.number,
  item: PropTypes.object,
  type: PropTypes.string,
  projectId: PropTypes.string,
  dateId: PropTypes.string,
  user_currency: PropTypes.string,
  currencyList: PropTypes.array,
  deleteItem: PropTypes.func,
  updateItem: PropTypes.func,
  formateAmount: PropTypes.func,
}

export default ListItem;
