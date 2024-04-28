import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import styles from '../styles/HeightGraph.module.css';

const HeightGraph = ({ data }) => {
    const d3Container = useRef(null);

    useEffect(() => {
        if (data && d3Container.current) {
            // Define dimensions
            const margin = {top: 20, right: 20, bottom: 30, left: 40};
            const width = 800 - margin.left - margin.right;
            const height = 400 - margin.top - margin.bottom;

            // Clear any previous SVG
            d3.select(d3Container.current).selectAll("*").remove();

            // Append the SVG object to the container
            const svg = d3.select(d3Container.current)
                .append('svg')
                .attr('width', width + margin.left + margin.right)
                .attr('height', height + margin.top + margin.bottom)
                .append('g')
                .attr('transform', `translate(${margin.left},${margin.top})`);

            // Create X and Y axes scales
            const x = d3.scaleBand()
                .domain(data.map(d => d.category))
                .range([0, width])
                .paddingInner(0.3)
                .paddingOuter(0.2);

            const y = d3.scaleLinear()
                .domain([0, d3.max(data.flatMap(d => d.values))])
                .nice() // Rounds the domain extents to nice round numbers
                .range([height, 0]);

            // Add X axis
            svg.append('g')
                .attr('transform', `translate(0, ${height})`)
                .call(d3.axisBottom(x))
                .selectAll('text')
                .attr('transform', 'translate(-10,0)rotate(-45)')
                .style('text-anchor', 'end');

            // Add Y axis
            svg.append('g')
                .call(d3.axisLeft(y));

            // Add Y gridlines
            svg.append('g')
                .attr('class', 'grid')
                .call(d3.axisLeft(y)
                    .tickSize(-width)
                    .tickFormat('')
                );

            // Color scale
            const color = d3.scaleOrdinal(d3.schemeCategory10)
                .domain(data.map(d => d.category));

            // Draw the dots
            svg.selectAll('.dot')
                .data(data.flatMap(d => d.values.map(value => ({category: d.category, value}))))
                .enter()
                .append('circle')
                .attr('cx', d => x(d.category) + x.bandwidth() / 2)
                .attr('cy', d => y(d.value))
                .attr('r', 4)
                .attr('fill', d => color(d.category));

            // Add vertical dotted lines
            svg.selectAll('.vline')
                .data(x.domain())
                .enter()
                .append('line')
                .style('stroke', 'grey')
                .style('stroke-width', 1)
                .style('stroke-dasharray', ('2,2'))
                .attr('x1', d => x(d) + x.bandwidth() / 2)
                .attr('x2', d => x(d) + x.bandwidth() / 2)
                .attr('y1', 0)
                .attr('y2', height);
        }
    }, [data]); // Rerun when data changes

    return (
        <div className={styles.heightGraph}>
            <div ref={d3Container}></div>
        </div>
    );
};

export default HeightGraph;
