//env
import React, { Component } from 'react';

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
        className="head-text-wrap"
        onMouseOver={decorMouse ? this.animateDecorLine : null}>
        <h3 className={`head-title lang-${lang}`}>
          {homepage['main_title'][lang]}
        </h3>
        <div
          className="head-decor">
          <div className={`head-decor-line ${decor && 'move'}`}></div>
          <i className="fas fa-plane head-decor-icon"></i>
        </div>
        <h4 className="sub-title">
          {homepage['sub_title'][lang]}
        </h4>
        <div
          className="enter-btn"
          onClick={this.props.start}>Start</div>
      </div>
    )
  }
}

export default Heading