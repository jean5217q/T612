//env
import React, { Component } from 'react'
//component
import Top_Bar from '../share/Top_Bar';
import Form from './share/Form'

class TrainsPortation extends Component {
  render() {
    const {type,time} = this.props
    return(
      <div className='add-select-container'>
        <Top_Bar
          text='Add Transporation Info'/>
        <Form 
          type={type}
          time={time}/>
      </div>
    )
  }
}

export default TrainsPortation