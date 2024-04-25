import React, { useState } from 'react';
import styles from '../styles/DimensionSelection.module.css';
import CheckboxTable from './CheckboxTable';
import DimensionColorMapping from './DimensionColorMapping';

const DimensionSelection = ({ onFetchChartData }) => {

  const [selectedOptions, setSelectedOptions] = useState({
    genotype: [],
    treatment: [],
    time: []
  });

  // Function to handle the selections made in CheckboxTable
  const handleSelectionChange = (category, selections) => {
    setSelectedOptions({ ...selectedOptions, [category]: selections });
  };


  return (
    <div className={styles.dimensionSelection}>
      <h2 className={styles.dimensionTitle}>Dimension Selection</h2>
      <CheckboxTable onFetchChartData={onFetchChartData} />
      <DimensionColorMapping/>
    </div>
  );
};

export default DimensionSelection;