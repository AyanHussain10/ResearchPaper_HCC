import React from 'react';
import { Scatter } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const HeightGraph = ({ dataMaps, colorMapping }) => {
  const getDatasets = (sampleObject, sampleKey) => {
    const datasets = [];
    const heights = [0, 5, 10, 15, 20];

    Object.entries(sampleObject).forEach(([dayKey, sampleDayObject], dayIndex) => {
      if (colorMapping[sampleKey] && colorMapping[sampleKey][dayIndex]) {
        const color = colorMapping[sampleKey][dayIndex];
        const data = heights.map((height) => ({
          x: dayIndex * 10,
          y: height,
          backgroundColor: color,
        }));

        datasets.push({
          label: `${sampleKey} - ${dayKey}`,
          data: data,
          backgroundColor: color,
          pointRadius: 5,
          pointHoverRadius: 7,
          showLine: true,
          borderColor: color,
          borderWidth: 1,
          pointStyle: 'circle',
          borderDash: [5, 5],
        });

        // Connect nodes between days
        if (dayIndex < Object.keys(sampleObject).length - 1) {
          const nextDayKey = Object.keys(sampleObject)[dayIndex + 1];
          const nextDayObject = sampleObject[nextDayKey];
          const nextColor = colorMapping[sampleKey][dayIndex + 1];

          heights.forEach((height, i) => {
            const currentNode = {
              x: dayIndex * 10,
              y: height,
              backgroundColor: color,
            };
            const nextNode = {
              x: (dayIndex + 1) * 10,
              y: heights[i],
              backgroundColor: nextColor,
            };

            datasets.push({
              label: `Connection ${sampleKey} - ${dayKey} to ${nextDayKey}`,
              data: [currentNode, nextNode],
              backgroundColor: nextColor,
              pointRadius: 0,
              showLine: true,
              borderColor: nextColor,
              borderWidth: 1,
            });
          });
        }
      }
    });

    return datasets;
  };

  const chartOptions = {
    scales: {
      x: {
        type: 'linear',
        position: 'bottom',
        title: {
          display: true,
          text: 'Days',
        },
        grid: {
          color: 'rgba(0, 0, 0, 0.1)',
          borderColor: 'rgba(0, 0, 0, 0.1)',
        },
        ticks: {
          stepSize: 10,
          callback: (value) => `Day ${value / 10 + 1}`,
        },
      },
      y: {
        title: {
          display: true,
          text: 'Height (cm)',
        },
        ticks: {
          callback: (value) => `${value} cm`,
        },
        grid: {
          color: 'rgba(0, 0, 0, 0.1)',
          borderColor: 'rgba(0, 0, 0, 0.1)',
        },
      },
    },
    plugins: {
      title: {
        display: true,
        text: 'Height Graph',
      },
      tooltip: {
        callbacks: {
          label: (context) => `(${context.raw.x.toFixed(2)}, ${context.raw.y.toFixed(2)} cm)`,
        },
      },
    },
    responsive: true,
    maintainAspectRatio: false,
    layout: {
      padding: {
        left: 10,
        right: 10,
        top: 10,
        bottom: 10,
      },
    },
    backgroundColor: 'rgba(192, 192, 192, 0.3)',
  };

  return (
    <div style={{ overflowX: 'scroll', whiteSpace: 'nowrap' }}>
      {Object.entries(dataMaps).map(([sampleKey, sampleObject], index) => (
        <div key={index} style={{ display: 'inline-block', width: '500px', height: '500px', marginRight: '10px' }}>
          <Scatter data={{ datasets: getDatasets(sampleObject, sampleKey) }} options={chartOptions} />
        </div>
      ))}
    </div>
  );
};

export default HeightGraph;
