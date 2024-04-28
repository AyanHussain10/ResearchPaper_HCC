import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import styles from '../styles/HeightGraph.module.css';

const HeightGraph = ({ data }) => {
  const d3Container = useRef(null);

  useEffect(() => {
    if (data && d3Container.current) {
      const margin = { top: 20, right: 20, bottom: 30, left: 40 };
      const width = 960 - margin.left - margin.right;
      const height = 500 - margin.top - margin.bottom;

      const svg = d3.select(d3Container.current)
        .html('')
        .append('svg')
        .attr('width', width + margin.left + margin.right)
        .attr('height', height + margin.top + margin.bottom)
        .append('g')
        .attr('transform', `translate(${margin.left}, ${margin.top})`);

      // Set up the color scale
      const color = d3.scaleOrdinal(d3.schemeCategory10)
                      .domain(data.map(d => d.category));

      const x = d3.scaleBand()
                  .domain(data.map(d => d.category))
                  .range([0, width])
                  .padding(0.1);

      const y = d3.scaleLinear()
                  .domain([0, d3.max(data, d => d3.max(d.values))])
                  .range([height, 0]);

      svg.append('g')
         .attr('transform', `translate(0,${height})`)
         .call(d3.axisBottom(x));

      svg.append('g')
         .call(d3.axisLeft(y));

      svg.selectAll('.dot')
         .data(data.flatMap(d => d.values.map(value => ({ category: d.category, value }))))
         .enter().append('circle')
         .attr('cx', d => x(d.category) + x.bandwidth() / 2)
         .attr('cy', d => y(d.value))
         .attr('r', 5)
         .style('fill', d => color(d.category));
    }
  }, [data]);

  return (
    <div className={styles.heightGraph}>
      <div ref={d3Container}></div>
    </div>
  );
};

export default HeightGraph;
