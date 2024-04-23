import React from 'react';
import styles from '../styles/DimensionSelection.module.css';
import ButtonGroup from './ButtonGroup';

const DimensionSelection = ({ onFetchChartData }) => {
  return (
    <div className={styles.dimensionSelection}>
      <h2 className={styles.dimensionTitle}>Dimension Selection</h2>
      <ButtonGroup onFetchChartData={onFetchChartData} />
    </div>
  );
};

export default DimensionSelection;
