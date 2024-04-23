import React, { useState } from 'react';
import DimensionSelection from './components/DimensionSelection';
import SegmentView from './components/SegmentView';
import BranchView from './components/BranchView';
import './App.css';

function App() {

  const [filename, setFilename] = useState('');

  const handleFetchChartData = (filename) => {
    setFilename(filename);
  };

  return (
    <div className="App">
      <DimensionSelection onFetchChartData={handleFetchChartData} />
      <SegmentView filename={filename} />
      <BranchView />
    </div>
  );
}

export default App;
