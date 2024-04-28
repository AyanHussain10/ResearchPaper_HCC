import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import styles from '../styles/HeightGraph.module.css';

const HeightGraph = ({ data }) => {
  const d3Container = useRef(null);

  useEffect(() => {
    if (data && d3Container.current) {
      const margin = { top: 20, right: 40, bottom: 40, left: 60 };
      const width = 960 - margin.left - margin.right;
      const height = 500 - margin.top - margin.bottom;

      d3.select(d3Container.current).selectAll("*").remove();

      const svg = d3.select(d3Container.current)
        .append('svg')
        .attr('width', width + margin.left + margin.right)
        .attr('height', height + margin.top + margin.bottom)
        .append('g')
        .attr('transform', `translate(${margin.left},${margin.top})`);

      const x = d3.scaleBand()
        .domain(data.map(d => d.category))
        .range([0, width])
        .padding(0.1);

      const y = d3.scaleLinear()
        .domain([0, d3.max(data.flatMap(d => d.values.map(v => v.value)))])
        .range([height, 0]);

      svg.append('g')
        .attr('transform', `translate(0, ${height})`)
        .call(d3.axisBottom(x))
        .selectAll('text')
        .style('text-anchor', 'end');

      svg.append('g')
        .call(d3.axisLeft(y));

      const color = d3.scaleOrdinal(d3.schemeCategory10)
        .domain(data.map(d => d.category));

      data.forEach(series => {
        const line = d3.line()
          .x(d => x(series.category) + x.bandwidth() / 2)
          .y(d => y(d.value))
          .curve(d3.curveMonotoneX);

        svg.append("path")
          .datum(series.values)
          .attr("fill", "none")
          .attr("stroke", color(series.category))
          .attr("stroke-width", 1.5)
          .attr("d", line);
      });

      data.forEach(series => {
        svg.selectAll(".dot")
          .data(series.values)
          .enter().append("circle")
          .attr('cx', d => x(series.category) + x.bandwidth() / 2)
          .attr('cy', d => y(d.value))
          .attr('r', 5)
          .attr('fill', color(series.category));
      });
    }
  }, [data]);

  return <div className={styles.heightGraph}><div ref={d3Container}></div></div>;
};

export default HeightGraph;
