import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { basic_text } from '../../../../../../data/Content';

class Title_Text extends Component {
  render() {
    const { lang, cata } = this.props
    if (lang == 0) {
      return (
        <>
          <div className="basic-sub-title-block lang-0">
            <span className="big">{basic_text[cata][lang][0]}</span>
            <span className="normal">{basic_text[cata][lang][1]}</span>
          </div>
          <div className="basic-sub-title-block lang-0">
            <span className="big">{basic_text[cata][lang][2]}</span>
            <span className="normal">{basic_text[cata][lang][3]}</span>
          </div>
        </>
      )
    }
    else {
      return (
        <div className="basic-sub-title-block lang1">
          <span className="big">{basic_text[cata][lang]}</span>
        </div>
      )
    }
  }
}

Title_Text.propTypes = {
  lang: PropTypes.number,
  cata: PropTypes.string,
}

export default Title_Text