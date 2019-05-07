//env
import React, { Component } from 'react';

class Circle extends Component {
  componentDidMount() {
    const c = document.querySelector('.head-visual-big-circle')
    const mv = document.querySelector('.circle-group')
    const visual = document.querySelector('.head-visual')
    let interval = null
    let interval2 = null
    let counter = 0
    let count2 = 0
    c.style.backgroundImage = ` radial-gradient(rgba(255,255,255,0) 30%,
                              rgba(255,255,255,0.6),
                              white 95%)`
    mv.addEventListener('mouseover', start)

    function start() {
      interval = setInterval(trans, 20)
    }
    function trans() {
      mv.removeEventListener('mouseover', start)
      counter = parseFloat(counter + 0.2)
      c.style.backgroundImage = ` radial-gradient(rgba(255,255,255,0) ${30 + counter}%,
                                rgba(255,255,255,0.6),
                                white 95%)`
      if (counter + 30 >= 60) {
        counter = 0
        c.style.backgroundImage = ` radial-gradient(rgba(255,255,255,0) 60%,
                                rgba(255,255,255,0.6),
                                white 95%)`
        interval = clearInterval(interval)
        interval2 = setInterval(trans2, 20)
      }
    }

    function trans2() {
      count2 = parseFloat(count2 + 0.2)
      c.style.backgroundImage = ` radial-gradient(rgba(255,255,255,0) ${60 - count2}%,
                                rgba(255,255,255,0.6),
                                white 95%)`
      if (60 - count2 <= 29) {
        interval2 = clearInterval(interval2)
        mv.addEventListener('mouseover', start)
        count2 = 0
        c.style.backgroundImage = ` radial-gradient(rgba(255,255,255,0) 30%,
                                rgba(255,255,255,0.6),
                                white 95%)`
      }
    }






  }
  render() {
    const { addSiteTag, removeSiteTag } = this.props
    return (
      <div
        className="head-visual check-site"
        onMouseOver={addSiteTag}
      >
        <div className="head-visual-line outer-line check-site">
          <div className="head-visual-line-circle outer-circle check-site"></div>
        </div>
        <div className="head-visual-line inner-line check-site">
          <div className="head-visual-line-circle inner-circle check-site"></div>
        </div>
        <div className="circle-group check-site">
          <div className="head-visual-big-circle check-site"
          ></div>
          <div className="c check-site"></div>
        </div>
      </div>
    )
  }
}

export default Circle












