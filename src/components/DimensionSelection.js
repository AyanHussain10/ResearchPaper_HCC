import React from 'react';
import styles from '../styles/DimensionSelection.module.css';
import CheckboxTable from './CheckboxTable';

const DimensionSelection = ({ onFetchChartData }) => {
  return (
    <div className={styles.dimensionSelection}>
      <h2 className={styles.dimensionTitle}>Dimension Selection</h2>
      <CheckboxTable onFetchChartData={onFetchChartData} />
    </div>
  );
};

export default DimensionSelection;
