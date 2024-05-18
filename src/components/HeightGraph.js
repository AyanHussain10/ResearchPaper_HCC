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
  const getData = (color) => {
    const heights = [0, 5, 10, 15, 20];
    return heights.map((height) => ({
      x: Array.from({ length: 10 }, () => Math.random() * 20),
      y: Array.from({ length: 10 }, () => height),
      backgroundColor: color,
    }));
  };

  const datasets = [];
  Object.entries(dataMaps).forEach(([sampleKey, sampleObject]) => {
    Object.entries(sampleObject).forEach(([dayKey, sampleDayObject]) => {
      if (colorMapping[sampleKey] && colorMapping[sampleKey][sampleDayObject.dayIndex]) {
        const color = colorMapping[sampleKey][sampleDayObject.dayIndex];
        const data = getData(color).flatMap((d) => d.x.map((x, i) => ({ x, y: d.y[i] })));
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
      }
    });
  });

  const chartData = { datasets };

  const options = {
    scales: {
      x: {
        type: 'linear',
        position: 'bottom',
        title: {
          display: true,
          text: 'Data Points',
        },
        grid: {
          color: 'rgba(0, 0, 0, 0.1)',
          borderColor: 'rgba(0, 0, 0, 0.1)',
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
    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
      <div style={{ width: '90%', height: '500px', backgroundColor: 'rgba(192, 192, 192, 0.3)' }}>
        <Scatter data={chartData} options={options} />
      </div>
    </div>
  );
};

export default HeightGraph;
