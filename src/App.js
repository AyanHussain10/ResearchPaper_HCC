import React, { useState } from 'react';
import DimensionSelection from './components/DimensionSelection';
import SegmentView from './components/SegmentView';
import BranchView from './components/BranchView';
import './App.css';

function App() {

  const colorMapping = {
    'KIT x HDNT':  ['#FF6347', '#FF2400', '#B21800'],
    'KIT x CONTROL': ['#6699CC', '#0047AB', '#002D6F'],
    'HC5 x HDNT': ['#80D641', '#4CBB17', '#347C0E'],
    'HC5 x CONTROL': ['#FFD700', '#FFBF00', '#B18904'],
    'HO1 x HDNT': ['#D783FF', '#8F00FF', '#5C00CC'],
    'HO1 x CONTROL': ['#8FEBEB', '#40E0D0', '#287C7D'],
    'HO2 x HDNT': ['#FFA785', '#FF7F50', '#CC3C1E'],
    'HO2 x CONTROL': ['#A2B3BF', '#708090', '#4C606D'],
    'HC2 x HDNT': ['#FF66FF', '#FF00FF', '#B300B3'],
    'HC2 x CONTROL': ['#B3B300', '#808000', '#505000'],
  };

  const [dataMap, setDataMap] = useState({});
  const [dataUrls, setDataUrls] = useState([]);

  const fetchChartData = (filename) => {
    setDataUrls(prevUrls => [...prevUrls, filename]);

    let parts = filename.split('_');
    let genotype = parts[0];
    let treatment = parts[1] === 'H' ? 'HDNT' : 'CONTROL';
    let genoTrtComb = `${genotype} x ${treatment}`;
    let timeSeq = parts[2];
    let indexTime;
    if (timeSeq === "4D") {
      indexTime = 0;
    } else if (timeSeq === "7D") {
      indexTime = 1;
    } else {
      indexTime = 2;
    }

    setDataMap(prevDataMap => {
      const newDataMap = { ...prevDataMap };
      if (!newDataMap[genoTrtComb]) {
        newDataMap[genoTrtComb] = {
          '4D': {}, '7D': {}, '10D': {}
        };
      } 
      newDataMap[genoTrtComb][timeSeq] = {
        link: filename,
        genotype: genotype,
        treatment: treatment,
        time: timeSeq,
        color: colorMapping[genoTrtComb][indexTime]
      };
      
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
