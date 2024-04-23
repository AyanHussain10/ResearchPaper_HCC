import React, { useEffect, useState } from 'react';
import styles from '../styles/SegmentView.module.css';
import RadarChartComponent from './RadarChartComponent';

// Function to calculate the user-defined vegetation index
function calculateVegetationIndex(data) {
  // Placeholder function for your vegetation index calculation
  return 0.5; // Example static value, adjust based on your actual calculation
}

// Function to transform JSON data into a suitable format for the RadarChartComponent
function transformDataForRadarChart(jsonData) {
  const dataForChart = [
    {
      axis: "Height",
      value: jsonData.panicle.height / 300, // Normalize the height
    },
    {
      axis: "Volume",
      value: jsonData.panicle.volume / 10000, // Normalize the volume
    },
    {
      axis: "Spread",
      value: jsonData.panicle.maxSpreadVal / 50, // Normalize the max spread
    },
    {
      axis: "Branches",
      value: Object.keys(jsonData.branch).length / 20, // Number of branches, normalized
    },
    {
      axis: "Avg Red",
      value: jsonData.panicle.colAvgR,
    },
    {
      axis: "Avg Green",
      value: jsonData.panicle.colAvgG,
    },
    {
      axis: "Avg Blue",
      value: jsonData.panicle.colAvgB,
    },
    {
      axis: "Vegetation Index",
      value: calculateVegetationIndex(jsonData), // Calculate the user-defined vegetation index
    },
  ];

  return [dataForChart]; // RadarChart expects an array of these data arrays
}

const SegmentView = ({ dataUrls }) => {
  const [chartsData, setChartsData] = useState([]);

  useEffect(() => {
    dataUrls.forEach(url => {
      fetch(`/data/${url}`)
        .then(response => response.json())
        .then(data => {
          const radarData = transformDataForRadarChart(data);
          setChartsData(prevData => [...prevData, radarData]);
        })
        .catch(error => console.error('Error fetching data:', error));
    });
  }, [dataUrls]);

  return (
    <div className={styles.segmentView}>
      <h2 className={styles.segmentTitle}>Segment View</h2>
      <div className={styles.segmentIndividualTimeDiff}>
        <div className={styles.segmentIndividual}>
          <div className={styles.segmentIndividualName}> 
            Individual Sample
          </div>
          {chartsData.map((chartData, index) => (
        <RadarChartComponent key={index} data={chartData} />
      ))}
        </div>
        <div className={styles.segmentTimeDiff} >
          <div className={styles.segmentTimeDiffName}> 
            TIME DIFF
          </div>
          {chartsData.map((chartData, index) => (
        <RadarChartComponent key={index} data={chartData} />
      ))}
        </div>
        
      </div>
      <div className={styles.segmentTrtDiff}>
        <div className={styles.segmentTrtDiffName}> 
          TREATMENT DIFF
        </div>
        {chartsData.map((chartData, index) => (
        <RadarChartComponent key={index} data={chartData} />
      ))}
      </div>
      <div className={styles.segmentGenoDiff}>
        <div className={styles.segmentGenoDiffName}> 
          GENOTYPE DIFF
        </div>
        {chartsData.map((chartData, index) => (
        <RadarChartComponent key={index} data={chartData} />
      ))}
      </div>
      
    </div>
  );
};

export default SegmentView;
