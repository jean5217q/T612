//env
import React, { Component } from 'react';
import { basic_text } from '../../../../../data/Content';

class Basic_Sub_Title_Country extends Component {
  render() {
    const { lang, openSelectCountry } = this.props
    if (lang == 0) {
      return (
        <div className="basic-sub-title">
          <div className="basic-sub-title-block lang-0">
            <span className="big">{basic_text['sub_country'][lang][0]}</span>
            <span className="normal">{basic_text['sub_country'][lang][1]}</span>
          </div>
          <div className="basic-sub-title-block lang-0">
            <span className="big">{basic_text['sub_country'][lang][2]}</span>
            <span className="normal">{basic_text['sub_country'][lang][3]}</span>
          </div>
          <div
            className="basic-title-edit-icon-wrap"
            onClick={openSelectCountry}>
            <div className='basic-title-edit-icon'></div>
          </div>
        </div>
      )
    }
    else {
      return (
        <div className="basic-sub-title">
          <div className="basic-sub-title-block lang1">
            <span className="big">{basic_text['sub_country'][lang]}</span>
          </div>
          <div
            className="basic-title-edit-icon-wrap"
            onClick={openSelectCountry}>
            <div className='basic-title-edit-icon'></div>
          </div>
        </div>
      )
    }
  }
}

export default Basic_Sub_Title_Country