//env
import React, { Component } from 'react'
//component
import Position_Item from '../elem/05_map/Position_Item';
import { plan_form as txt  } from '../../../../../data/Content'

class MapComp extends Component {
  state = {
    input: '',
  }
  map = null
  //取得輸入景點
  getInput = e => {
    this.setState({
      input: e.target.value
    })
  }
  popUp = (input) => {
    const { lang } = this.props
    return `<div class="confirm-wrap">
              <div class="confirm-title-wrap">
                <div class="confirm-tag-local">${txt['button']['position'][lang]}:</div>
                <div class="confirm-tag-local">${input}</div>
              </div>
              <div class="confirm-btn">
                <span>${txt['button']['add'][lang]}</span>
              </div>
            </div>`
  }
  //搜尋景點
  searchPosition = e => {
    e.preventDefault()
    let { input } = this.state
    if (input === '') return
    let geocoder, marker
    const icon =
    {
      path: 'M20,7.3c3.4,0,6.2,2.8,6.2,6.2S23.4,20,20,20s-6.2-3.1-6.2-6.5S16.6,7.3,20,7.3z',
      fillColor: '#FFFFFF',
      strokeWeight: 0,
      fillOpacity: 1
    }
    // anchor: new google.maps.Point(0,0)


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
        // marker.setIcon(
        // {
        //   path: 'M20,1.5c-7,0-12.7,5.6-12.7,12.6c0,11,12.7,21.4,12.7,21.4s12.7-10.4,12.7-21.4C32.7,7.1,27,1.5,20,1.5zM20,18.5c-2.5,0-4.5-2-4.5-4.5c0-2.5,2-4.5,4.5-4.5s4.5,2,4.5,4.5C24.5,16.5,22.5,18.5,20,18.5z',
        //   fillColor:'#308CFE',
        //   strokeWeight: 0,
        //   fillOpacity: 1,
        //   scale: 0.8},

        // )

        //地點確認框
        var infowindow = new google.maps.InfoWindow({
          content: this.popUp(input),
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
    const { mapList, deleteMapList, addItemToDb, backToStep4, edit, updateItemToDb,lang } = this.props
    const action = edit ? updateItemToDb : addItemToDb
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
              placeholder={txt['button']['serach_site'][lang]}
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
              {`${txt['button']['tag_list'][lang]}:`}
              </li>
              {mapList.map((el, index) =>
                <Position_Item
                  key={index}
                  name={el.name}
                  deleteMapList={deleteMapList}
                />
              )}
            </ul>
            <div
              className='add-map-info-submit-btn'
              onClick={action}>
              <div className='add-map-info-submit-btn-text'>{txt['button']['submit'][lang]}</div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default MapComp;


