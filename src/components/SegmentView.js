import React, { useEffect, useState } from 'react';
import styles from '../styles/SegmentView.module.css';
import RadarChartComponent from './RadarChartComponent';

const colorMapping = {
  'KIT x HDNT':  ['#FF6347', '#FF2400', '#B21800'],
  'HC5 x HDNT': ['#6699CC', '#0047AB', '#002D6F'],
  'KIT x CONTROL': ['#80D641', '#4CBB17', '#347C0E'],
  'HC5 x CONTROL': ['#FFD700', '#FFBF00', '#B18904'],
  'HO1 x HDNT': ['#D783FF', '#8F00FF', '#5C00CC'],
  'HO1 x CONTROL': ['#8FEBEB', '#40E0D0', '#287C7D'],
  'HO2 x HDNT': ['#FFA785', '#FF7F50', '#CC3C1E'],
  'HO2 x CONTROL': ['#A2B3BF', '#708090', '#4C606D'],
  'HC2 x HDNT': ['#FF66FF', '#FF00FF', '#B300B3'],
  'HC2 x CONTROL': ['#B3B300', '#808000', '#505000'],
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
    'KIT x HDNT':  ['#FF6347', '#FF2400', '#B21800'],
    'HC5 x HDNT': ['#6699CC', '#0047AB', '#002D6F'],
    'KIT x CONTROL': ['#80D641', '#4CBB17', '#347C0E'],
    'HC5 x CONTROL': ['#FFD700', '#FFBF00', '#B18904'],
    'HO1 x HDNT': ['#D783FF', '#8F00FF', '#5C00CC'],
    'HO1 x CONTROL': ['#8FEBEB', '#40E0D0', '#287C7D'],
    'HO2 x HDNT': ['#FFA785', '#FF7F50', '#CC3C1E'],
    'HO2 x CONTROL': ['#A2B3BF', '#708090', '#4C606D'],
    'HC2 x HDNT': ['#FF66FF', '#FF00FF', '#B300B3'],
    'HC2 x CONTROL': ['#B3B300', '#808000', '#505000'],
  };

  const [chartsData, setChartsData] = useState([]);
  
  chartsData.forEach(function(element, index) {
    console.log(index, element);
    console.log("********");
  });
  
  useEffect(() => {
    dataUrls.forEach(url => {
      console.log(url);
      fetch(`/data/${url}`)
        .then(response => response.json())
        .then(data => {
          const radarData = transformDataForRadarChart(data);

          const urlParts = url.split('_');
          console.log(urlParts);
          const genotype = urlParts[0];
          const treatmentCode = urlParts[1][0];
          const treatment = treatmentCode === 'H' ? 'HDNT' : 'Control';
          const colorKey = `${genotype} x ${treatment}`;
          const color = colorMapping[colorKey] || 'gray'; // Fetch color from mapping
          setChartsData(prevData => 
            [...prevData, { data: radarData, color: color }]);
        })
        .catch(error => console.error('Error fetching data:', error));
    });
  }, [dataUrls]);
  
  // chartsData.forEach((chartData, index) => {
  //   console.log("********")
  //   console.log(chartData)   
  // })
  

  
  
  return (
    <div className={styles.segmentView}>

      <h2 className={styles.segmentTitle}>Segment View</h2>

      <div className={styles.segmentIndividualTimeDiff}>
        <div className={styles.segmentIndividual}>

          <div className={styles.segmentIndividualName}> 
            Individual Sample  
          </div>

          <div className={styles.segmentIndividualCharts}> 
            {chartsData.map((chartData, index) => (
              <RadarChartComponent key={index} 
                data={chartData.color} color={chartData.color} />
            ))}
          </div>
        </div>

        <div className={styles.segmentTimeDiff} >
          <div className={styles.segmentTimeDiffName}> 
            TIME DIFF
          </div>
          {chartsData.map((chartData, index) => (
            <RadarChartComponent key={index} 
              data={chartData.color} color={chartData.color} />
          ))}
        </div>
        
      </div>
      <div className={styles.segmentTrtDiff}>
        <div className={styles.segmentTrtDiffName}> 
          TREATMENT DIFF
        </div>
        {chartsData.map((chartData, index) => (
          <RadarChartComponent key={index} 
            data={chartData.color} color={chartData.color} />
        ))}
      </div>
      <div className={styles.segmentGenoDiff}>
        <div className={styles.segmentGenoDiffName}> 
          GENOTYPE DIFF
        </div>
        {chartsData.map((chartData, index) => (
          <RadarChartComponent key={index} 
            data={chartData.color} color={chartData.color} />
        ))}
      </div>
      
    </div>
  );
};

export default SegmentView;
