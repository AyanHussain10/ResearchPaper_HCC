import React from 'react';
import styles from '../styles/DimensionColorMapping.module.css';

// Mapping from genotype x treatment combinations to colors
const colorMapping = {
  'KIT x HDNT': 'crimson',
  'HC5 x HDNT': 'navy',
  'KIT x CONTROL': '#50C878',
  'HC5 x CONTROL': 'gold', // Changed from 'mustard' to 'gold' which is a recognized CSS color
  'HO1 x HDNT': 'purple', // Changed from 'royalpurple' to 'purple' which is a recognized CSS color
  'HO1 x CONTROL': 'orange', // Changed from 'burntorange' to 'orange' which is a recognized CSS color
  'HO2 x HDNT': 'teal', // Changed from 'tealblue' to 'teal' which is a recognized CSS color
  'HO2 x CONTROL': 'fuchsia', // Changed from 'magenta' to 'fuchsia' which is a recognized CSS color
  'HC2 x HDNT': 'pink', // 'pink' is a recognized CSS color
  'HC2 x CONTROL': 'turquoise', // 'turquoise' is a recognized CSS color
};


// List of days for the headers
const days = ['Day 4', 'Day 7', 'Day 10', 'Day 7/4', 'Day 10/7'];

const DimensionColorMapping = () => {
  // Generate an array of genotype x treatment combinations
  const combinations = Object.keys(colorMapping);

  return (
    <div className={styles.dimensionColorContainer}>
      <table className={styles.dimensionColorTable}>
        <thead>
          <tr>
            <th>Combination</th>
            {days.map(day => <th key={day}>{day}</th>)}
          </tr>
        </thead>
        <tbody>
          {combinations.map(combination => (
            <tr key={combination}>
              <td>{combination}</td>
              {days.map((day, index) => (
                <td key={day} style={{
                  backgroundColor: colorMapping[combination],
                  // Adjust the tone based on the day
                  opacity: 1 - index * 0.2 // This will decrease the tone by 20% each day
                }}>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DimensionColorMapping;
