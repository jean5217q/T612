import React, { Component } from 'react';
import TopBar from './component/TopBar';
import Board from './component/BottomBoard';

class Step1 extends Component {
  render() {
    const { 
      lang, 
      backToStep1, 
      goToStep3 } = this.props
    return (
      <div className='edit-cata-wrap'>
        <TopBar
          lang={lang}
          backToStep1={backToStep1}
        />
        <Board
          lang={lang}
          goToStep3={goToStep3}
        />
      </div>
    )
  }
}

export default Step1;