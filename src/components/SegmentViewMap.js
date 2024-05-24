import React, { useEffect, useState } from 'react';
import styles from '../styles/SegmentView.module.css';
import SegementIndividualRadar from './SegementIndividualRadar';
import SegementTimeDiff from './SegementTimeDiff';
import SegementGenoDiff from './SegementGenoDiff';
import SegementTrtDiff from './SegementTrtDiff';
import { evaluate } from 'mathjs';

// Function to calculate the user-defined vegetation index
function calculateVegetationIndex(equation, data) {
  const { colAvgR: R, colAvgG: G, colAvgB: B } = data.panicle;
  try {
    return evaluate(equation, { R, G, B });
  } catch (error) {
    console.error('Error evaluating equation:', error);
    return 0;
  }
}

// Function to transform JSON data into a suitable format for the RadarChartComponent
function transformDataForRadarChart(jsonData, equations) {
  const { colAvgR, colAvgG, colAvgB } = jsonData.panicle;
  const dataForChart = [
    { axis: "Height", value: jsonData.panicle.height / 300 },
    { axis: "Volume", value: jsonData.panicle.volume / 10000 },
    { axis: "Spread", value: jsonData.panicle.maxSpreadVal / 50 },
    { axis: "Branches", value: jsonData.panicle.noTopSeeds / 20 },
    { axis: "Avg Red", value: colAvgR },
    { axis: "Avg Green", value: colAvgG },
    { axis: "Avg Blue", value: colAvgB },
    { axis: "Vegetation Index 1", value: calculateVegetationIndex(equations.equation1, jsonData) },
    { axis: "Vegetation Index 2", value: calculateVegetationIndex(equations.equation2, jsonData) },
    { axis: "Vegetation Index 3", value: calculateVegetationIndex(equations.equation3, jsonData) },
    { axis: "Vegetation Index 4", value: calculateVegetationIndex(equations.equation4, jsonData) },
  ];
  return [dataForChart]; // RadarChart expects an array of these data arrays
}

// Function to transform JSON data into a suitable format for the RadarChartComponent
function transformDataForNone() {
  const dataForChart = [
    { axis: "Height", value: 0 },
    { axis: "Volume", value: 0 },
    { axis: "Spread", value: 0 },
    { axis: "Branches", value: 0 },
    { axis: "Avg Red", value: 0 },
    { axis: "Avg Green", value: 0 },
    { axis: "Avg Blue", value: 0 },
    { axis: "Vegetation Index 1", value: 0 },
    { axis: "Vegetation Index 2", value: 0 },
    { axis: "Vegetation Index 3", value: 0 },
    { axis: "Vegetation Index 4", value: 0 },
  ];
  return [dataForChart]; // RadarChart expects an array of these data arrays
}

const SegmentViewMap = ({ dataMaps, equations }) => {
  const [chartsData, setChartsData] = useState(dataMaps);

  useEffect(() => {
    setChartsData((prevData) => ({ ...prevData, numIndex: dataMaps.numIndex }));
    Object.entries(dataMaps).forEach(([sampleKey, sampleObject]) => {
      Object.entries(sampleObject).forEach(([dayKey, sampleDayObject]) => {
        if (sampleDayObject.link) {
          fetch(`/data/${sampleDayObject.link}`)
            .then((response) => response.json())
            .then((data) => {
              let radarData = transformDataForRadarChart(data, equations);
              setChartsData((prevData) => ({
                ...prevData,
                [sampleKey]: {
                  ...prevData[sampleKey],
                  [dayKey]: {
                    ...sampleDayObject,
                    data: radarData,
                  },
                },
              }));
            })
            .catch((error) => console.error('Error fetching data:', error));
        } else {
          let radarData = transformDataForNone(equations);
          setChartsData((prevData) => ({
            ...prevData,
            [sampleKey]: {
              ...prevData[sampleKey],
              [dayKey]: {
                ...sampleDayObject,
                data: radarData,
              },
            },
          }));
        }
      });
    });
  }, [dataMaps, equations]);

  return (
    <div className={styles.segmentView}>
      <h2 className={styles.segmentTitle}>Segment View</h2>
      <div className={styles.segmentIndividualTimeDiff}>
        <div className={styles.segmentIndividual}>
          <div className={styles.segmentIndividualName}>Individual Sample</div>
          <SegementIndividualRadar chartsData={chartsData} />
        </div>
        <div className={styles.segmentTimeDiff}>
          <div className={styles.segmentTimeDiffName}>TIME DIFF</div>
          <SegementTimeDiff chartsData={chartsData} />
        </div>
      </div>
      <div className={styles.segmentTrtDiff}>
        <div className={styles.segmentTrtDiffName}>TREATMENT DIFF</div>
        <SegementTrtDiff chartsData={chartsData} />
      </div>
      <div className={styles.segmentGenoDiff}>
        <div className={styles.segmentGenoDiffName}>GENOTYPE DIFF</div>
        <SegementGenoDiff chartsData={chartsData} />
      </div>
    </div>
  );
};

export default SegmentViewMap;