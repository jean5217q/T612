//env
import React, { Component } from 'react';
import { basic_text } from '../../../../../data/Content';

class Basic_Sub_Title extends Component {
  render() {
    const { lang } = this.props
    if (lang == 0) {
      return (
        <div className="basic-sub-title">
          <div className="basic-sub-title-block lang-0">
            <span className="big lang-0">{basic_text['sub_period'][lang][0]}</span>
            <span className="normal">{basic_text['sub_period'][lang][1]}</span>
          </div>
          <div className="basic-sub-title-block">
            <span className="big lang-0">{basic_text['sub_period'][lang][2]}</span>
            <span className="normal">{basic_text['sub_period'][lang][3]}</span>
          </div>
        </div>
      )
    }
    else {
      return (
        <div className="basic-sub-title">
          <div className="basic-sub-title-block">
            <span className="big lang-1">{basic_text['sub_period'][lang]}</span>
          </div>
        </div>
      )
    }
  }
}

export default Basic_Sub_Title