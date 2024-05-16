import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import styles from '../styles/SpreadOfBranchesGraph.module.css';

const SpreadOfBranchesGraph = ({ data, label }) => {
    const canvasRef = useRef(null);

    useEffect(() => {
        if (!canvasRef.current) return;
        const context = canvasRef.current.getContext('2d');

        const chart = new Chart(context, {
            type: 'bar',
            data: {
                labels: data.labels,
                datasets: [{
                    label,
                    data: data.datasets[0].data,
                    backgroundColor: data.datasets[0].backgroundColor,
                }]
            },
            options: {
                scales: {
                    x: {
                        beginAtZero: true
                    },
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });

        return () => chart.destroy();
    }, [data, label]);

    return <canvas ref={canvasRef} className={styles.spreadOfBranchesGraph}></canvas>;
};

export default SpreadOfBranchesGraph;
