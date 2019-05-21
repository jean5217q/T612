import React, { Component } from 'react';
import PropTypes from 'prop-types';
import CountryCircle from './CountryCircle';

class Heading extends Component {
  state = {
    decorMouse: true,
    decor: false
  }
  animateDecorLine = () => {
    this.setState({ decor: true, decorMouse: false }, () => {
      setTimeout(() => {
        this.setState({
          decor: false,
          decorMouse: true
        })
      }, 1000)
    })
  }
  render() {
    const { lang, homepage } = this.props
    const { decor, decorMouse } = this.state
    return (
      <div
        className="heading-wrap"
        onMouseOver={decorMouse ? this.animateDecorLine : null}>
        <h3 className={`heading-title lang-${lang}`}>
          {homepage['main_title'][lang]}
        </h3>
        <div
          className="heading-line-wrap">
          <div className={`heading-line ${decor && 'move'}`}></div>
          <i className="fas fa-plane heading-line-icon"></i>
        </div>
        <h4 className="heading-sub-title">
          {homepage['sub_title'][lang]}
        </h4>
        <div
          className="enter-btn-wrap"
          onClick={this.props.start}>
          <div className='enter-btn-text'>start</div>
        </div>
        <CountryCircle />
      </div>
    )
  }
}

Heading.propTypes = {
  lang: PropTypes.number,
  homepage: PropTypes.object,
  start: PropTypes.func
}

export default Heading