import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import styles from '../styles/SpreadOfBranchesGraph.module.css';

const SpreadOfBranchesGraph = ({ data }) => {
    const canvasRef = useRef(null);

    useEffect(() => {
        if (!canvasRef.current) return;
        const context = canvasRef.current.getContext('2d');

        const chart = new Chart(context, {
            type: 'bar',
            data: {
                labels: data.labels,
                datasets: data.datasets
            },
            options: {
                scales: {
                    x: {
                        stacked: true
                    },
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });

        return () => chart.destroy();
    }, [data]);

    return <canvas ref={canvasRef} className={styles.spreadOfBranchesGraph}></canvas>;
};

export default SpreadOfBranchesGraph;
