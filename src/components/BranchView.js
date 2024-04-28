import React from 'react';
import styles from '../styles/BranchView.module.css';
import HeightGraph from './HeightGraph';
import SpreadOfBranchesGraph from './SpreadOfBranchesGraph';
import DayTenView from './DayTenView';


const BranchView = ({ dataMap }) => {
  // Convert dataMap to the required format for HeightGraph using the time as the category
  const plotData = Object.entries(dataMap).flatMap(([time, details]) => (
    Object.entries(details).flatMap(([genotype, treatments]) => (
      Object.entries(treatments).map(([treatment, value]) => ({
        category: time,  // Use the time as the category
        values: Object.values(value.branches || {}).map(branch => branch.branchHeight)
      }))
    ))
  ));
  
  return (
    <div className={styles.branchView}>
      <h2 className={styles.branchTitle}>Branch View</h2>
      <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-around' }}>
      {plotData.map((plot, index) => (
        <div key={index} className={styles.branchHeight}>
          <h3>{`${plot.category} Height`}</h3>
          <HeightGraph data={[plot]} />
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

      {/* Insert additional components for the branch view */}
    </div>
  );
};

export default BranchView;
