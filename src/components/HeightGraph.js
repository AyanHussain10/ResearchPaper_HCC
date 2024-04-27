import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import styles from '../styles/HeightGraph.module.css';

const HeightGraph = ({ data }) => {
  console.log(data)
  const d3Container = useRef(null);

  useEffect(() => {
    if (data && d3Container.current) {
      const margin = { top: 20, right: 5, bottom: 30, left: 40 },
            width = 600 - margin.left - margin.right,
            height = 500 - margin.top - margin.bottom;

      const svg = d3.select(d3Container.current)
          .html('')
          .append('svg')
          .attr('width', width + margin.left + margin.right)
          .attr('height', height + margin.top + margin.bottom)
          .append('g')
          .attr('transform', `translate(${margin.left}, ${margin.top})`);

      const x = d3.scaleBand()
          .domain(data.map(d => d.category))
          .range([0, width])
          .padding(0.1);

      const y = d3.scaleLinear()
          .domain([0, d3.max(data, d => d3.max(d.values))])
          .nice()
          .range([height, 0]);

      svg.append('g')
         .call(d3.axisLeft(y));

      svg.append('g')
         .attr('transform', `translate(0, ${height})`)
         .call(d3.axisBottom(x));

      const dotGroups = svg.selectAll('.dot-group')
          .data(data)
          .enter().append('g')
          .attr('class', 'dot-group')
          .attr('transform', d => `translate(${x(d.category) + x.bandwidth() / 2}, 0)`);

      dotGroups.selectAll('.dot')
          .data(d => d.values.map(value => ({ category: d.category, value })))
          .enter().append('circle')
          .attr('class', 'dot')
          .attr('cx', 0)
          .attr('cy', d => y(d.value))
          .attr('r', 5)
          .style('fill', d => d3.schemeCategory10[data.map(d => d.category).indexOf(d.category)]);

      // Optional: Connect the dots with lines
      dotGroups.each(function(d) {
        d3.select(this).selectAll('.dot')
          .data(d.values.map(value => ({ category: d.category, value })))
          .enter().append('path')
          .attr('fill', 'none')
          .attr('stroke', 'grey')
          .attr('d', d3.line()
            .x(() => 0)
            .y(d => y(d.value))
          );
      });
    }
  }, [data]);

  return (
    <div className={styles.heightGraph}>
      <div ref={d3Container}></div>
    </div>
  );
};

export default HeightGraph;
