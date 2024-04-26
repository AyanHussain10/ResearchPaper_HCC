import React from 'react';
import styles from '../styles/BranchView.module.css';
import HeightGraph from './HeightGraph';
import SpreadOfBranchesGraph from './SpreadOfBranchesGraph';
import DayTenView from './DayTenView';

const BranchView = ({ dataMap }) => {
  // Convert dataMap to the required format for HeightGraph
  const plotData = Object.entries(dataMap).map(([time, genotypes]) => ({
    time,
    data: Object.values(genotypes).flatMap(genotypeData =>
      Object.values(genotypeData).map(entry => ({
        category: `${entry.genotype} x ${entry.treatment}`,
        values: Object.values(entry.branches || {}).map(branch => branch.branchHeight)
      }))
    )
  }));

  return (
    <div className={styles.branchView}>
      <h2 className={styles.branchTitle}>Branch View</h2>
      <div style={{ display: 'block', flexDirection: 'column', alignItems: 'center', justifyContent: 'space-around' }}>
        {plotData.map(plot => (
          <div key={plot.time} className={styles.branchHeight}>
            <h3>{`${plot.time} Height`}</h3>
            <HeightGraph data={plot.data} />
          </div>
        ))}
      </div>

      <div className={styles.branchSpread}>
        <div className={styles.branchSpreadName}> 
          Branch Spread
        </div>
        <div className={styles.branchSpreadPlot}>
          <SpreadOfBranchesGraph />
        </div>
      </div>

      <div className={styles.dayTenView}>
        <div className={styles.dayTenViewName}> 
          Day 10 View
        </div>
        <div className={styles.dayTenViewPlot}>
          <DayTenView />
        </div>
      </div>
    </div>
  );
};

export default BranchView;
