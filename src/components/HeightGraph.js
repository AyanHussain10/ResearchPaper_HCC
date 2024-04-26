import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import styles from '../styles/HeightGraph.module.css';

const HeightGraph = ({ data }) => {
    const d3Container = useRef(null);

    useEffect(() => {
        if (data && d3Container.current) {
            const margin = { top: 20, right: 5, bottom: 20, left: 5 },
                width = 110 - margin.left - margin.right,
                height = 460 - margin.top - margin.bottom;

            const svg = d3
                .select(d3Container.current)
                .html('')
                .append('svg')
                .attr('width', width + margin.left + margin.right)
                .attr('height', height + margin.top + margin.bottom)
                .append('g')
                .attr('transform', `translate(${margin.left}, ${margin.top})`);

            const color = d3.scaleOrdinal(d3.schemeCategory10);

            const x = d3
                .scaleBand()
                .domain(data.map(d => d.category))
                .range([0, width])
                .padding(0.1);

            const y = d3
                .scaleLinear()
                .domain([0, d3.max(data.flatMap(d => d.values))])
                .range([height, 0]);

            svg
                .selectAll('.line')
                .data(data)
                .enter()
                .append('line')
                .attr('x1', d => x(d.category) + x.bandwidth() / 2)
                .attr('x2', d => x(d.category) + x.bandwidth() / 2)
                .attr('y1', 0)
                .attr('y2', height)
                .attr('stroke', 'darkgray')
                .style('stroke-dasharray', '3,3');

            svg
                .selectAll('.dot')
                .data(data.flatMap(d => d.values.map(value => ({ category: d.category, value }))))
                .enter()
                .append('circle')
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