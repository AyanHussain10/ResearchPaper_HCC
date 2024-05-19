import React, { useEffect, useState } from 'react';
import HeightGraph from './HeightGraph';
import SpreadOfBranchesGraph from './SpreadOfBranchesGraph';
import BranchDay10GraphView from './BranchDay10GraphView';
import styles from '../styles/BranchView.module.css';

const BranchView = ({ dataMaps, colorMapping }) => {
  const [chartsBranchData, setChartsBranchData] = useState({});
  const [spreadRedData, setSpreadRedData] = useState({ labels: [], datasets: [] });
  const [spreadGreenData, setSpreadGreenData] = useState({ labels: [], datasets: [] });

  useEffect(() => {
    console.log('dataMaps: ', dataMaps);

    const labels = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'];
    const redData = new Array(labels.length).fill(0);
    const greenData = new Array(labels.length).fill(0);

    Object.entries(dataMaps).forEach(([sampleKey, sampleObject]) => {
      Object.entries(sampleObject).forEach(([dayKey, sampleDayObject]) => {
        if (dayKey === '10D' && sampleDayObject.link) {
          fetch(`/data/${sampleDayObject.link}`)
            .then((response) => response.json())
            .then((data) => {
              console.log('Fetched data: ', data);

              // Extract the spread data based on the segment index
              Object.entries(data.segment).forEach(([segmentKey, segmentData]) => {
                const segmentIndex = parseInt(segmentKey.split('_')[1]);
                redData[segmentIndex] = segmentData.maxSpreadSegVal; // Assuming the spread value for the segment is `maxSpreadSegVal`
                greenData[segmentIndex] = segmentData.colAvgG; // Assuming the green value for the segment is `colAvgG`
              });

              setSpreadRedData({
                labels,
                datasets: [
                  {
                    label: 'Red Data',
                    data: redData,
                    backgroundColor: 'red',
                  },
                ],
              });

              setSpreadGreenData({
                labels,
                datasets: [
                  {
                    label: 'Green Data',
                    data: greenData,
                    backgroundColor: 'green',
                  },
                ],
              });
            })
            .catch((error) => console.error('Error fetching data:', error));
        }
      });
    });
  }, [dataMaps]);

  return (
    <div className={styles.branchView}>
      <h2 className={styles.branchTitle}>Branch View</h2>

      <div className={styles.branchHeight}>
        <div className={styles.branchHeightName}>Branch Height</div>
        <div className={styles.branchHeightPlot}>
          <HeightGraph dataMaps={dataMaps} colorMapping={colorMapping} />
        </div>
      </div>

      <div className={styles.branchSpread}>
        <div className={styles.branchSpreadName}>Branch Spread (Red)</div>
        <div className={styles.branchSpreadPlot}>
          {spreadRedData.labels.length > 0 && (
            <SpreadOfBranchesGraph data={spreadRedData} label="Red Data" />
          )}
        </div>
      </div>

      <div className={styles.branchSpread}>
        <div className={styles.branchSpreadName}>Branch Spread (Green)</div>
        <div className={styles.branchSpreadPlot}>
          {spreadGreenData.labels.length > 0 && (
            <SpreadOfBranchesGraph data={spreadGreenData} label="Green Data" />
          )}
        </div>
      </div>

      <div className={styles.dayTenView}>
        <div className={styles.dayTenViewName}>Day 10 View</div>
        {Object.keys(chartsBranchData).length > 0 && (
          <div className={styles.dayTenViewPlot}>
            <BranchDay10GraphView chartsBranchData={chartsBranchData} />
          </div>
        )}
      </div>
    </div>
  );
};

export default BranchView;
