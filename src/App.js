import React, { useState } from 'react';
import DimensionSelection from './components/DimensionSelection';
import SegmentView from './components/SegmentView';
import BranchView from './components/BranchView';
import './App.css';

function App() {
  const [dataMap, setDataMap] = useState({ '4D': {}, '7D': {}, '10D': {} });
  const [dataUrls, setDataUrls] = useState([]);

  const fetchChartData = (filename) => {
    setDataUrls(prevUrls => [...prevUrls, filename]);
    const parts = filename.split('_');
    const genotype = parts[0];
    const treatment = parts[1] === 'H' ? 'HDNT' : 'CONTROL';
    const time = parts[2]; // e.g., "4D"

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
  };

  return (
    <div className="App">
      <DimensionSelection onFetchChartData={fetchChartData} />
      <SegmentView dataUrls={dataUrls} />
      <BranchView dataMap={dataMap} />
    </div>
  );
}

export default App;
