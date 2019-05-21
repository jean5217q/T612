import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as d3 from "d3";

class Pie extends Component {
  state = {
    w: 240,
    h: 240,
    r: 120,
    type: ['transportation', 'shopping', 'entertainment', 'food', 'hotel', 'others'],
  }
  getDynamicUnit = () => {
    // console.log('d')
    if (window.innerWidth < 576) {
      this.setState({ w: 200, h: 200, r: 100 }, () => this.drawPie())
    }
    else {
      this.setState({ w: 240, h: 240, r: 120 }, () => this.drawPie())
    }
  }
  drawPie = () => {
    const domPie = document.querySelector('.pie-wrap')
    if (domPie) {
      domPie.parentElement.removeChild(domPie)
    }


    // document.getElementById('#chart').innerHTML = ''
    const { costList, total } = this.props;
    const { w, h, r } = this.state
    const colors = ['#ff2d70', '#00c4e8', '#ff6c2d', '#ffc300', '#6073ff', '#00bc84']
    let data = []
    data = costList.map((num, index) => {
      return {
        ...num,
        color: colors[index],
        percentage: Math.round((num.value / total) * 100)
      }
    })
    const arc = d3.arc()
      .outerRadius(r)
      .innerRadius(r / 3)
    const pie = d3.pie()
      .sort(null)
      .value(d => d.percentage)
    // console.log(pie(data))
    const svg = d3.select('#chart').append('svg')
      .attr('width', w)
      .attr('height', h)
      .attr('class', 'pie-wrap')
      .append('g')
      .attr('transform', `translate(${w / 2},${h / 2})`)

    const g = svg.selectAll('.arc')
      .data(pie(data))
      .enter()

    g.append('path')
      .attr('d', arc)
      .style('fill', d => d.data.color)
    g.append('text')
      .attr("transform", function (d) {
        return "translate(" + arc.centroid(d) + ")";
      })
      .attr('font-size', '14px')
      .attr('font-weight', '300')
      .attr("text-anchor", "middle")
      .attr('fill', 'white')
      .text(d => {
        if (d.data.percentage < 5) {
          return ''
        }
        else return `${d.data.percentage}%`
      })
  }
  componentDidMount() {
    this.getDynamicUnit()
    window.onresize = () => this.getDynamicUnit();
  }
  render() {
    this.drawPie()
    return (
      <div className='budget-analysis-block top'>
        <div id="chart"></div>
      </div>
    )
  }
}

Pie.propTypes = {
  costList: PropTypes.array,
  total: PropTypes.number,
}

export default Pie;