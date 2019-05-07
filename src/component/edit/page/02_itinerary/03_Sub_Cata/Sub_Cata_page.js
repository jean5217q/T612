//env
import React, { Component } from 'react';
//component
import Sub_Cata_Top from './elem/Sub_Cata_Top';
import Sub_Cata_Bottom from './elem/Sub_Cata_Bottom';


class Sub_Cata_page extends Component {
  render() {
    const { mainType, backToStep2, goToStep4,lang } = this.props
    return (
      <div className='edit-cata-wrap'>
        <Sub_Cata_Top
          text='Choose Type'
          backToStep2={backToStep2}
          lang={lang} />

        <Sub_Cata_Bottom
          mainType={mainType}
          goToStep4={goToStep4}
          lang={lang}
        />
      </div>
    )
  }
}

export default Sub_Cata_page