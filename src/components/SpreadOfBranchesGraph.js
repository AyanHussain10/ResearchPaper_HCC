import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import styles from '../styles/SpreadOfBranchesGraph.module.css';

const SpreadOfBranchesGraph = ({ data, colorMapping }) => {
    const canvasRef = useRef(null);

    useEffect(() => {
        if (!canvasRef.current) return;
        const context = canvasRef.current.getContext('2d');

        // Assuming data is structured correctly
        const labels = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"]; // Labels for each group
        const redData = [20, 30, 45, 60, 20, 65, 75, 85, 95, 100, 60, 80]; // Example data for red bars
        const greenData = [15, 25, 35, 45, 55, 20, 40, 60, 80, 90, 70, 50]; // Example data for green bars

        const datasets = [{
            label: 'Red Data',
            data: redData,
            backgroundColor: 'red'
        }, {
            label: 'Green Data',
            data: greenData,
            backgroundColor: 'green'
        }];

        const chart = new Chart(context, {
            type: 'bar',
            data: { labels, datasets },
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
    }, [data]); // Removed colorMapping from dependencies as it's not used directly

    return <canvas ref={canvasRef} className={styles.spreadOfBranchesGraph}></canvas>;
};

export default SpreadOfBranchesGraph;
