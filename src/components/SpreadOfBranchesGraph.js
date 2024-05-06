import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import styles from '../styles/SpreadOfBranchesGraph.module.css';

const SpreadOfBranchesGraph = ({ data, colorMapping }) => {
    const canvasRef = useRef(null);
    console.log("Spread of Brnaches")
    useEffect(() => {
        console.log('Data received:', data);
        console.log('Color Mapping:', colorMapping);

        if (!canvasRef.current) return;
        const context = canvasRef.current.getContext('2d');

        // Processing the data to split into two datasets based on conditions or index
        const labels = data.map(item => item.label);
        const dataValues = data.map(item => item.value);
        const backgroundColors = data.map(item => {
            const colorIndex = labels.indexOf(item.label) % 2 === 0 ? 0 : 1; // Example condition to alternate colors
            return colorMapping[item.label] ? colorMapping[item.label][colorIndex] : '#FFFFFF'; // Fallback color if undefined
        });

        const datasets = [{
            label: 'Spread of Branches',
            data: dataValues,
            backgroundColor: backgroundColors
        }];

        const chart = new Chart(context, {
            type: 'bar',
            data: { labels, datasets },
            options: {
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });

        return () => chart.destroy();
    }, [data, colorMapping]);

    return <canvas ref={canvasRef} className={styles.spreadOfBranchesGraph}></canvas>;
};

export default SpreadOfBranchesGraph;
