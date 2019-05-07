//env
import React, { Component } from 'react'
import { NavLink } from 'react-router-dom';
import { select_text } from '../../data/Content';
import { connect } from 'react-redux';
import { getLangFromCookie } from '../../action/user';

class Select_Page extends Component {
  state = {
    scale: 0
  }
  an = (e) => {
    if (window.innerWidth < 768) return
    const target = e.currentTarget
    const child = e.currentTarget.childNodes[0]
    target.removeEventListener('mouseenter', this.an)
    let scale = 0
    let interval = setInterval(a, 5)
    let opa = 1
    let opainterval = null
    const o = () => {
      opa = opa - 0.05
      child.style.opacity = `${opa}`
      if (opa <= 0) {
        target.addEventListener('mouseenter', this.an)
        scale = 0
        child.style.transform = `scale(1)`
        child.style.opacity = 1
        opainterval = clearInterval(opainterval)
        return
      }
    }
    function a() {
      scale++
      child.style.transform = `scale(${scale * 0.2})`
      if (scale * 0.2 >= 15) {
        interval = clearInterval(interval)
        opainterval = setInterval(o, 15)
        return
      }
    }
  }
  componentDidMount() {
    this.props.dispatch(getLangFromCookie())
    const cir = document.querySelectorAll('.select-box-circle')
    cir.forEach(el => el.addEventListener('mouseenter', this.an))
  }
  render() {
    const { lang } = this.props
    return (
      <div className="all-container select-page">
        <div className="select-page-box">
          <div
            className="select-box-inner">
            <NavLink
              to='./create_project'
              className="select-box-block"
            >
              <div className="select-box-circle it">
                <div className="select-box-circle-inner"></div>
              </div>
              <div className="select-box-title">
                <span className="side">{select_text['make_sm'][lang]}</span>
                <span className={`main lang-${lang} plan`}>{select_text['make_lg'][lang]}</span>
              </div>
              <div className="select-box-link"></div>
            </NavLink>
            <NavLink
              to='./profile'
              className="select-box-block">
              <div className="select-box-circle">
                <div className="select-box-circle-inner"></div>
              </div>
              <div className="select-box-title">
                <span className="side">{select_text['check_sm'][lang]}</span>
                <span className={`main lang-${lang} member`}>{select_text['check_lg'][lang]}</span>
              </div>
              <div className="select-box-link"></div>
            </NavLink>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  let lang = state.user.lang
  return {
    lang
  }
}
export default connect(mapStateToProps)(Select_Page)
