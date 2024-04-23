import React from 'react';
import styles from '../styles/BranchView.module.css';
import HeightGraph from './HeightGraph';
import SpreadOfBranchesGraph from './SpreadOfBranchesGraph';
import DayTenView from './DayTenView';


const BranchView = () => {
  return (
    <div className={styles.branchView}>
      <h2 className={styles.branchTitle}>Branch View</h2>
      <div className={styles.branchHeight}>
        <div className={styles.branchHeightName}> 
          Branch Height
        </div>
        <div className={styles.branchHeightPlot}>
          <HeightGraph />
        </div>
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
