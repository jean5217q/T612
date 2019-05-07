//env
import React, { Component } from 'react';


class Sm_Cricle extends Component {
  componentDidMount(){
    const circle1 = document.querySelector('.decor-circle1-wrap')
    const circle1Text = document.querySelector('.decor-text1')
    let c1Interval1 = null
    let c1Interval2 = null
    let opaIncrease1 = 0
    let opaDecrease1 = 1
    let randomCountryArray = ['Taiwan','Germany','France','Korea','Japan','China','India','America','England','Turkey','Australia']

    function randomCountry(array){
      let countryIndex = parseInt(Math.random()*array.length)
      let selectCountry = null
      array.forEach((el,index)=>{
        if(index===countryIndex) {
          selectCountry = el
        }
      })
      return selectCountry
    }



handleShowCircle1()
// setInterval(handleShowCircle1,9000)
function handleShowCircle1(){
  circle1Text.textContent=randomCountry(randomCountryArray)
  c1Interval1 = setInterval(OpacityC1To1,20)
}

OpacityC1To1()
function OpacityC1To1(){
  opaIncrease1+=0.01
  circle1.style.opacity=opaIncrease1
  if(opaIncrease1>=1) {
    circle1.style.opacity=1
    c1Interval1 = clearInterval(c1Interval1)
    setTimeout(()=>{
      c1Interval2 = setInterval(OpacityC1To0,20)
      opaIncrease1=0
    },3500)
  }
}

function OpacityC1To0(){
  opaDecrease1=opaDecrease1-0.01
  circle1.style.opacity=opaDecrease1
  if(opaDecrease1<=0) {
    circle1.style.opacity=0
    c1Interval2 = clearInterval(c1Interval2)
    setTimeout(()=>{
      circle1Text.textContent=randomCountry(randomCountryArray)
      c1Interval1 = setInterval(OpacityC1To1,20)
      opaDecrease1=1
    },3500)
  }
}
  }
  render(){
    return(
      <div className="decor-circle1-wrap">
        <div className="decor-circle1"></div>
        <div className="decor-text1">TAIPEI </div>
      </div>
    )
  }
}

export default Sm_Cricle