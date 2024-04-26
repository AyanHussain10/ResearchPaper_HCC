import React, { useState } from 'react';
import DimensionSelection from './components/DimensionSelection';
import SegmentView from './components/SegmentView';
import BranchView from './components/BranchView';
import './App.css';

function App() {

  const [dataMap, setDataMap] = useState({ 
    '4D': {}, 
    '7D': {}, 
    '10D': {} });
  const [dataUrls, setDataUrls] = useState([]);

  const fetchChartData = (filename) => {
    setDataUrls(prevUrls => [...prevUrls, filename]);

    let parts = filename.split('_');
    let genotype = parts[0];
    let treatment = parts[1] === 'H' ? 'HDNT' : 'CONTROL';
    let genoTrtComb = `${genotype} x ${treatment}`;
    let time = parts[2];


    setDataMap(prevDataMap => {
      const newDataMap = { ...prevDataMap };
      newDataMap[genoTrtComb] = {
        '4D': {}, '7D': {}, '10D': {}
      };
      newDataMap[genoTrtComb][time] = {
        link: filename,
        genotype: genotype,
        treatment: treatment,
        time: time
      };

      // if (!newDataMap[time]) { newDataMap[time] = {}; }
      // if (!newDataMap[time][genotype]) { newDataMap[time][genotype] = {};}
      // newDataMap[time][genotype][treatment] = {
      //   link: filename,
      //   genotype: genotype,
      //   treatment: treatment
      // };
      
      console.log("***************************");
      console.log(newDataMap);
      return newDataMap;
    });
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
