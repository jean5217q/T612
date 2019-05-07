import React, { Component } from 'react';
import Main_Cata_Top from './elem/Main_Cata_Top';
import Main_Cata_Button from './elem/Main_Cata_Bottom';

class Main_Cata_page extends Component {
  render() {
    const { backToStep1, goToStep3,lang } = this.props
    return (
      <div className='edit-cata-wrap'>
        <Main_Cata_Top
          backToStep1={backToStep1}
          lang={lang} />
        <Main_Cata_Button
          goToStep3={goToStep3}
          lang={lang} />
      </div>
    )
  }
}

export default Main_Cata_page;