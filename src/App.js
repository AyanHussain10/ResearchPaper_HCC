import React, { useState } from 'react';
import DimensionSelection from './components/DimensionSelection';
import SegmentView from './components/SegmentView';
import SegmentViewMap from './components/SegmentViewMap';
import BranchView from './components/BranchView';
import './App.css';

function App() {
  const colorMapping = {
    'KIT x HDNT': ['#FF6347', '#FF2400', '#B21800'],
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

  const [dataMaps, setDataMaps] = useState({ numIndex: 0 });
  const [equations, setEquations] = useState({
    equation1: '(R+G+B)/3',
    equation2: 'R/(G+B)',
    equation3: 'G/(R+B)',
    equation4: '(R+G)/B',
  });

  const fetchChartData = (filename) => {
    let parts = filename.split('_');
    let genotype = parts[0];
    let treatment = parts[1] === 'H' ? 'HDNT' : 'CONTROL';
    let genoTrtComb = `${genotype} x ${treatment}`;
    let timeSeq = parts[2];

    let indexGeno;
    switch (genotype) {
      case 'KIT':
        indexGeno = 0;
        break;
      case 'HO1':
        indexGeno = 1;
        break;
      case 'HO2':
        indexGeno = 2;
        break;
      case 'HC2':
        indexGeno = 3;
        break;
      case 'HC5':
        indexGeno = 4;
        break;
      default:
        indexGeno = 5;
        break;
    }

    let indexTrt;
    switch (treatment) {
      case 'CONTROL':
        indexTrt = 0;
        break;
      case 'HDNT':
        indexTrt = 1;
        break;
      default:
        indexTrt = 2;
        break;
    }

    let indexTime;
    switch (timeSeq) {
      case '4D':
        indexTime = 0;
        break;
      case '7D':
        indexTime = 1;
        break;
      default:
        indexTime = 2;
        break;
    }

    setDataMaps((prevDataMaps) => {
      const newDataMaps = { ...prevDataMaps };
      if (!(genoTrtComb in newDataMaps)) {
        newDataMaps.numIndex = prevDataMaps.numIndex + 1;
        newDataMaps[genoTrtComb] = {
          '4D': {
            sampleIndex: prevDataMaps.numIndex,
            genoIndex: indexGeno,
            treatIndex: indexTrt,
            dayIndex: 0,
            color: colorMapping[genoTrtComb][0],
          },
          '7D': {
            sampleIndex: prevDataMaps.numIndex,
            genoIndex: indexGeno,
            treatIndex: indexTrt,
            dayIndex: 1,
            color: colorMapping[genoTrtComb][1],
          },
          '10D': {
            sampleIndex: prevDataMaps.numIndex,
            genoIndex: indexGeno,
            treatIndex: indexTrt,
            dayIndex: 2,
            color: colorMapping[genoTrtComb][2],
          },
        };
      }
      newDataMaps[genoTrtComb][timeSeq] = {
        ...newDataMaps[genoTrtComb][timeSeq],
        link: filename,
        time: timeSeq,
      };
      return newDataMaps;
    });
  };

  const handleEquationChange = (name, value) => {
    setEquations((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="App">
      <DimensionSelection
        onFetchChartData={fetchChartData}
        equations={equations}
        onEquationChange={handleEquationChange}
      />
      <SegmentViewMap dataMaps={dataMaps} equations={equations} />
      <BranchView dataMaps={dataMaps} colorMapping={colorMapping} />
    </div>
  );
}

export default App;
