import React, { Component } from 'react';
import TopBar from './component/TopBar';
import BottomBar from './component/BottomBoard'

class Step2 extends Component {
  render() {
    const { lang, mainType, backToStep2, goToStep4 } = this.props
    return (
      <div className='edit-cata-wrap'>
        <TopBar
          lang={lang}
          backToStep2={backToStep2}
        />
        <BottomBar
          lang={lang}
          mainType={mainType}
          goToStep4={goToStep4}  
        />
      </div>
    )
  }
}

export default Step2