import React, { useState } from 'react';
import DimensionSelection from './components/DimensionSelection';
import SegmentView from './components/SegmentView';
import BranchView from './components/BranchView';
import './App.css';

function App() {

  const [dataUrls, setDataUrls] = useState([]);

  const fetchChartData = (filename) => {
    setDataUrls(prevUrls => [...prevUrls, filename]);
  };

  return (
    <div className="App">
      <DimensionSelection onFetchChartData={fetchChartData} />
      <SegmentView dataUrls={dataUrls} />
      <BranchView />
    </div>
  );
}

export default App;