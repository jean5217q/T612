import React, { Component } from 'react'
import PropTypes from 'prop-types';
import MapItem from './component/MapItem';
import { plan_form as text  } from '../../../../../../../data/Content'

class Step4 extends Component {
  state = {
    input: '',
  }
  map = null
  getInput = e => this.setState({input: e.target.value})
  showPopUpInfo = (input) => {
    const { lang } = this.props
    return `<div class="confirm-wrap">
              <div class="confirm-title-wrap">
                <div class="confirm-tag-local">${text['button']['position'][lang]}:</div>
                <div class="confirm-tag-local">${input}</div>
              </div>
              <div class="confirm-btn">
                <span>${text['button']['add'][lang]}</span>
              </div>
            </div>`
  }
  //搜尋景點
  searchPosition = e => {
    e.preventDefault()
    let { input } = this.state
    if (input === '') return
    let geocoder, marker
    geocoder = new google.maps.Geocoder()
    geocoder.geocode({ address: input }, (res, status) => {
      if (status == 'OK') {
        //重新定位(抓取原本的地圖/定位/可拖動)
        this.map.setCenter(res[0].geometry.location)
        marker = new google.maps.Marker({
          map: this.map,
          position: res[0].geometry.location,
          draggable: true
        })

        //地點確認框
        var infowindow = new google.maps.InfoWindow({
          content: this.showPopUpInfo(input),
          maxWidth: 600
        })
        //一開始就顯示
        infowindow.open(this.map, marker)
        this.setState({
          input: ''
        })
        const lat = marker.position.lat()
        const lng = marker.position.lng()
        //載入popup執行存入redux
        infowindow.addListener('domready', () => {
          const btn = document.querySelector('.confirm-btn');
          btn.addEventListener('click', () => {
            infowindow.close()
            let flag = false
            this.props.mapList.forEach(el => {
              if (el.name === input) {
                alert('same name')
                flag = true
                marker.setMap(null);
                return
              }
              else if (el.position === res[0].geometry.location) {
                alert('you have the same position')
                flag = true
                marker.setMap(null);
                return
              }
            })
            if (!flag) {
              let obj = {
                name: input,
                position: new firebase.firestore.GeoPoint(lat, lng)
              }
              this.props.addMapList(obj)
              marker.setMap(null);
            }

          })
        })
      } else {
        alert('no-response')
      }
    })
  }
  //初始化
  componentDidMount() {
    this.map = new google.maps.Map(document.getElementById('map'), {
      center: { lat: -34.397, lng: 150.644 },
      zoom: 12
    })
  }
  render() {
    const { 
      mapList, 
      deleteMapList, 
      addItemToDb, 
      backToStep4, 
      isEditing, 
      updateItemToDb,
      lang 
    } = this.props
    const action = isEditing ? updateItemToDb : addItemToDb
    return (
      <div className='add-map-container'>
        <div className="add-map-inner">
          {/*SEARCH*/}
          <form
            className="add-map-search-wrap"
            onSubmit={this.searchPosition}>
            <div
              onClick={backToStep4}
              className='back-icon map'></div>
            <input
              value={this.state.input}
              type="text"
              id="search-input"
              placeholder={text['button']['serach_site'][lang]}
              className="add-map-search-input"
              onChange={this.getInput}
            />
            <button type="submit" className="add-map-search-icon" />
          </form>
          {/*MAP*/}
          <div id="map" className="add-map-content" />
          {/*INFO*/}
          <div className="add-map-info-wrap">

            {/*LIST*/}
            <ul className="add-map-local-list">
              <li className="add-map-local-item-list-name">
              {`${text['button']['tag_list'][lang]}:`}
              </li>
              {mapList.map((el, index) =>
                < MapItem
                  key={index}
                  name={el.name}
                  deleteMapList={deleteMapList}
                />
              )}
            </ul>
            <div
              className='add-map-info-submit-btn'
              onClick={action}>
              <div className='add-map-info-submit-btn-text'>{text['button']['submit'][lang]}</div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

Step4.propTypes = {
  lang: PropTypes.number,
  mapList: PropTypes.array, 
  deleteMapList: PropTypes.func, 
  addItemToDb: PropTypes.func,
  backToStep4: PropTypes.func,
  addMapList: PropTypes.func,
  isEditing: PropTypes.bool,
  updateItemToDb: PropTypes.func,
}

export default Step4;


