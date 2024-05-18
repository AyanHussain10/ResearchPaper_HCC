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

const HeightGraph = () => {
  // Sample data
  const heights = [0, 5, 10, 15, 20];
  const data1 = heights.map((height) => ({
    x: Array.from({ length: 10 }, () => Math.random() * 20),
    y: Array.from({ length: 10 }, () => height),
  }));
  const data2 = heights.map((height) => ({
    x: Array.from({ length: 10 }, () => Math.random() * 20),
    y: Array.from({ length: 10 }, () => height),
  }));

  const redData = {
    datasets: [
      {
        label: 'Red Data Set',
        data: data1.flatMap((d) => d.x.map((x, i) => ({ x, y: d.y[i] }))),
        backgroundColor: 'red',
        pointRadius: 5,
        pointHoverRadius: 7,
        showLine: true,
        borderColor: 'red',
        borderWidth: 1,
        pointStyle: 'circle',
        borderDash: [5, 5],
      },
    ],
  };

  const greenData = {
    datasets: [
      {
        label: 'Green Data Set',
        data: data2.flatMap((d) => d.x.map((x, i) => ({ x, y: d.y[i] }))),
        backgroundColor: 'green',
        pointRadius: 5,
        pointHoverRadius: 7,
        showLine: true,
        borderColor: 'green',
        borderWidth: 1,
        pointStyle: 'circle',
        borderDash: [5, 5],
      },
    ],
  };

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
      <div style={{ width: '45%', height: '500px', backgroundColor: 'rgba(192, 192, 192, 0.3)' }}>
        <Scatter data={redData} options={options} />
      </div>
      <div style={{ width: '45%', height: '500px', backgroundColor: 'rgba(192, 192, 192, 0.3)' }}>
        <Scatter data={greenData} options={options} />
      </div>
    </div>
  );
};

export default HeightGraph;
