import React, { useState } from 'react';
import DimensionSelection from './components/DimensionSelection';
import SegmentView from './components/SegmentView';
import BranchView from './components/BranchView';
import './App.css';

function App() {
  const [dataMap, setDataMap] = useState({ '4D': {}, '7D': {}, '10D': {} });
  const [dataUrls, setDataUrls] = useState([]);
  const [heightData, setHeightData] = useState([]);  // State to hold processed height data

  // Function to generate height data from JSON
  const generateHeightData = (jsonData) => {
    // Extract height data from each branch and store it
    const branches = jsonData.branch || {};
    return Object.keys(branches).map(key => {
      const { branchHeight } = branches[key];
      return {
        category: key,  // Use branch index as category
        values: [branchHeight]  // Values array with the branch height
      };
    });
  };

  const fetchChartData = async (filename) => {
    setDataUrls(prevUrls => [...prevUrls, filename]);
    const parts = filename.split('_');
    const genotype = parts[0];
    const treatment = parts[1] === 'H' ? 'HDNT' : 'CONTROL';
    const time = parts[2]; // e.g., "4D"

    try {
      const response = await fetch(`/data/${filename}`);
      const jsonData = await response.json();

      // Process height data on fetch
      const processedData = generateHeightData(jsonData);
      setHeightData(processedData);  // Store processed height data for the graph

      // Check if time key exists in the dataMap, then update the nested structure
      setDataMap(prevDataMap => {
        const newDataMap = { ...prevDataMap };
        
        // Ensure the time key has an initialized object
        if (!newDataMap[time]) {
          newDataMap[time] = {};
        }
        
        // Initialize the genotype key if not already
        if (!newDataMap[time][genotype]) {
          newDataMap[time][genotype] = {};
        }

        // Add or update the treatment data for this genotype
        newDataMap[time][genotype][treatment] = {
          link: filename,
          genotype: genotype,
          treatment: treatment
        };
        return newDataMap;
      });
    } catch (error) {
      console.error('Error fetching or processing data:', error);
    }
  };

  return (
    <div className="App">
      <DimensionSelection onFetchChartData={fetchChartData} />
      <SegmentView dataUrls={dataUrls} />
      <BranchView dataMap={dataMap} heightData={heightData} />
    </div>
  );
}

export default App;
