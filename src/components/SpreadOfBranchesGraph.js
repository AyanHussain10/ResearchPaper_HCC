import React, { useEffect, useRef, useState } from 'react';
import Chart from 'chart.js/auto';
import styles from '../styles/SpreadOfBranchesGraph.module.css';

const SpreadOfBranchesGraph = ({ dataMaps, colorMapping }) => {
  const [chartsData, setChartsData] = useState({});
  const canvasRef = useRef(null);

  useEffect(() => {
    console.log(dataMaps);
    Object.entries(dataMaps).forEach(([sampleKey, sampleObject]) => {
      Object.entries(sampleObject).forEach(([dayKey, sampleDayObject]) => {
        if (sampleDayObject.link) {
          fetch(`/data/${sampleDayObject.link}`)
            .then((response) => response.json())
            .then((data) => {
              console.log('Fetched data:', data);
              const segmentIndices = Object.keys(data.segment).filter(key => key.startsWith('segmentInd_'));
              const spreadData = segmentIndices.map(key => data.segment[key].maxSpreadSegVal);

              setChartsData((prevData) => ({
                ...prevData,
                [sampleKey]: {
                  ...prevData[sampleKey],
                  [dayKey]: {
                    data: spreadData,
                    color: colorMapping[sampleKey][sampleDayObject.dayIndex]
                  },
                },
              }));
            })
            .catch((error) => console.error('Error fetching data:', error));
        }
      });
    });
  }, [dataMaps, colorMapping]);

  useEffect(() => {
    if (!canvasRef.current || !Object.keys(chartsData).length) return;

    const context = canvasRef.current.getContext('2d');
    const datasets = Object.entries(chartsData).map(([sampleKey, sampleObject]) => {
      return Object.entries(sampleObject).map(([dayKey, dayData]) => {
        if (!dayData || !dayData.data) return null;
        return {
          label: `${sampleKey} - ${dayKey}`,
          data: dayData.data,
          backgroundColor: dayData.color,
        };
      }).filter(Boolean);  // Remove null values
    }).flat();

    const labels = Object.keys(chartsData).length > 0 ? chartsData[Object.keys(chartsData)[0]]['4D']?.data.map((_, idx) => `Segment ${idx + 1}`) : [];

    const chart = new Chart(context, {
      type: 'bar',
      data: {
        labels: labels,
        datasets: datasets,
      },
      options: {
        scales: {
          x: {
            beginAtZero: true
          },
          y: {
            beginAtZero: true
          }
        },
        plugins: {
          legend: {
            display: false, // Hide the legend
          },
        },
      }
    });

    return () => chart.destroy();
  }, [chartsData]);

  return (
    <div style={{ overflowX: 'scroll', whiteSpace: 'nowrap' }}>
      <canvas ref={canvasRef} className={styles.spreadOfBranchesGraph}></canvas>
    </div>
  );
};

export default SpreadOfBranchesGraph;
