import React, { useEffect, useState } from 'react';
import styles from '../styles/SegmentView.module.css';
import RadarChartComponent from './RadarChartComponent';

const colorMapping = {
  'KIT x HDNT': 'crimson',
  'HC5 x HDNT': 'navy',
  'KIT x CONTROL': '#50C878',
  'HC5 x CONTROL': 'gold', // Changed from 'mustard' to 'gold' which is a recognized CSS color
  'HO1 x HDNT': 'purple', // Changed from 'royalpurple' to 'purple' which is a recognized CSS color
  'HO1 x CONTROL': 'orange', // Changed from 'burntorange' to 'orange' which is a recognized CSS color
  'HO2 x HDNT': 'teal', // Changed from 'tealblue' to 'teal' which is a recognized CSS color
  'HO2 x CONTROL': 'fuchsia', // Changed from 'magenta' to 'fuchsia' which is a recognized CSS color
  'HC2 x HDNT': 'pink', // 'pink' is a recognized CSS color
  'HC2 x CONTROL': 'turquoise', // 'turquoise' is a recognized CSS color
};

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

  const colorMapping = {
    'KIT x HDNT': 'crimson',
    'HC5 x HDNT': 'navy',
    'KIT x CONTROL': '#50C878',
    'HC5 x CONTROL': 'gold', // Changed from 'mustard' to 'gold' which is a recognized CSS color
    'HO1 x HDNT': 'purple', // Changed from 'royalpurple' to 'purple' which is a recognized CSS color
    'HO1 x CONTROL': 'orange', // Changed from 'burntorange' to 'orange' which is a recognized CSS color
    'HO2 x HDNT': 'teal', // Changed from 'tealblue' to 'teal' which is a recognized CSS color
    'HO2 x CONTROL': 'fuchsia', // Changed from 'magenta' to 'fuchsia' which is a recognized CSS color
    'HC2 x HDNT': 'pink', // 'pink' is a recognized CSS color
    'HC2 x CONTROL': 'turquoise', // 'turquoise' is a recognized CSS color
  };
  
  const [chartsData, setChartsData] = useState([]);
  useEffect(() => {
    dataUrls.forEach(url => {
      fetch(`/data/${url}`)
        .then(response => response.json())
        .then(data => {
          const radarData = transformDataForRadarChart(data);
          const urlParts = url.split('_');
          const genotype = urlParts[0];
          const treatmentCode = urlParts[1][0]; // 'H' or 'C', assuming the URL is like 'KIT_H_7D_Info.json'
          const treatment = treatmentCode === 'H' ? 'HDNT' : 'Control';
          const colorKey = `${genotype} x ${treatment}`;
          const color = colorMapping[colorKey] || 'gray'; // Fetch color from mapping
          setChartsData(prevData => [...prevData, { data: radarData, color: color }]);
        })
        .catch(error => console.error('Error fetching data:', error));
    });
  }, [dataUrls]);

  // useEffect(() => {
  //   dataUrls.forEach(url => {
  //     fetch(`/data/${url}`)
  //       .then(response => response.json())
  //       .then(data => {
  //         const radarData = transformDataForRadarChart(data);
  //         const urlParts = url.split('_');
  //         const genotype = urlParts[0];
  //         const treatmentCode = urlParts[1]; // Assuming URL like 'KIT_H_7D_Info.json'
  //         const treatment = treatmentCode === 'H' ? 'HDNT' : 'CONTROL';
  //         const colorKey = `${genotype} x ${treatment}`;
  //         const color = colorMapping[colorKey] || 'gray'; // Default to gray if not found
  //         setChartsData(prevData => [...prevData, { data: radarData, color }]);
  //       })
  //       .catch(error => console.error('Error fetching data:', error));
  //   });
  // }, [dataUrls]);

  return (
    <div className={styles.segmentView}>
      <h2 className={styles.segmentTitle}>Segment View</h2>
      <div className={styles.segmentIndividualTimeDiff}>
        <div className={styles.segmentIndividual}>
          <div className={styles.segmentIndividualName}> 
            Individual Sample
          </div>
          {chartsData.map((item, index) => (
        <RadarChartComponent key={index} data={item.data} color={item.color} />
      ))}
        </div>
        <div className={styles.segmentTimeDiff} >
          <div className={styles.segmentTimeDiffName}> 
            TIME DIFF
          </div>
          {chartsData.map((item, index) => (
        <RadarChartComponent key={index} data={item.data} color={item.color} />
      ))}
        </div>
        
      </div>
      <div className={styles.segmentTrtDiff}>
        <div className={styles.segmentTrtDiffName}> 
          TREATMENT DIFF
        </div>
        {chartsData.map((item, index) => (
        <RadarChartComponent key={index} data={item.data} color={item.color} />
      ))}
      </div>
      <div className={styles.segmentGenoDiff}>
        <div className={styles.segmentGenoDiffName}> 
          GENOTYPE DIFF
        </div>
        {chartsData.map((item, index) => (
        <RadarChartComponent key={index} data={item.data} color={item.color} />
      ))}
      </div>
      
    </div>
  );
};

export default SegmentView;