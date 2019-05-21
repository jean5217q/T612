import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import LinkItem from './component/LinkItem'
import { getLangFromCookie } from '../../action/user';

class Select extends Component {
  componentDidMount() {
    this.props.dispatch(getLangFromCookie())
  }
  render() {
    const { lang } = this.props
    return (
      <div className="all-container select-page">
        <div className="select-page-box">
          <div className="select-box-inner">
            <LinkItem
              lang={lang}
              path='./create'
              cata='plan' />
            <LinkItem
              lang={lang}
              path='profile'
              cata='member' />
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    lang: state.user.lang
  }
}

Select.propTypes = {
  lang: PropTypes.number,
  dispatch: PropTypes.func
}

export default connect(mapStateToProps)(Select)