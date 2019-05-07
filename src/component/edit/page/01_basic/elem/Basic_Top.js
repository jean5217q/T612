import React, { Component } from 'react';
import { connect } from 'react-redux';
import { asyncGetProjectBasic } from '../../../../../action/itinerary';

class Basic_Top extends Component {
  state = {
    title: this.props.title,
    originTitle: this.props.title,
    edit: false
  }
  editText = (e) => { this.setState({ title: e.target.value }) }
  editHandler = () => { this.setState({ edit: true }) }
  cancelEdit = () => { this.setState({ edit: false, title: this.state.originTitle }) }
  updateTitle = () => {
    const { projectId, dispatch } = this.props
    const { title } = this.state
    this.setState({ edit: false, originTitle: title })
    const db = firebase.firestore();
    db.collection('project').doc(projectId).update({ title })
      .then(() => dispatch(asyncGetProjectBasic(projectId)))
      .catch(err => console.log(err))
  }
  render() {
    return (
      <div className="basic-container top">
        <h1
          style={this.state.edit ? { display: 'none' } : { display: 'block' }}
          className="basic-title">{this.state.title}
        </h1>
        <input
          style={this.state.edit ? { display: 'block' } : { display: 'none' }}
          type='text'
          className='basic-title-edit'
          value={this.state.title}
          onChange={this.editText}
        />
        <div
          style={this.state.edit ? { display: 'none' } : { display: 'flex' }}
          className="basic-title-edit-icon-wrap"
          onClick={this.editHandler}>
          <div className='basic-title-edit-icon'></div>
        </div>
        {/* 修改或取消 */}
        <div
          className='basic-title-confirm-group'
          style={this.state.edit ? { display: 'flex' } : { display: 'none' }}>
          <div
            className='basic-title-btn edit'
            onClick={this.updateTitle}>
            <div className='basic-title-btn-icon edit'></div>
          </div>
          <div
            className='basic-title-btn cancel'
            onClick={this.cancelEdit}>
            <div className='basic-title-btn-icon cancel'></div>
          </div>
        </div>
      </div>
    )
  }
}

export default connect()(Basic_Top);