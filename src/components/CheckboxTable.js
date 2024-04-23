import React, { useState } from 'react';
import styles from '../styles/CheckboxTable.module.css';

const CheckboxTable = ({ onFetchChartData }) => {
  const [selectedOptions, setSelectedOptions] = useState({
    genotype: [],
    treatment: [],
    time: []
  });

  const options = {
    genotype: ['KIT', 'HO1', 'HO2', 'HC2', 'HC5'],
    treatment: ['Control', 'HDNT'],
    time: ['D4', 'D7', 'D10']
  };

  const handleCheckboxChange = (category, value) => {
    const current = selectedOptions[category];
    const newSelection = current.includes(value) ?
      current.filter(item => item !== value) : [...current, value];
    setSelectedOptions({ ...selectedOptions, [category]: newSelection });
  };

  const handleOkClick = () => {
    if (selectedOptions.genotype.length && selectedOptions.treatment.length && selectedOptions.time.length) {
      selectedOptions.genotype.forEach(genotype => {
        selectedOptions.treatment.forEach(treatment => {
          selectedOptions.time.forEach(time => {
            const filename = `${genotype}_${treatment}_${time}_Info.json`;
            onFetchChartData(filename);
          });
        });
      });
    } else {
      alert('Please select at least one option from each category.');
    }
  };

  return (
    <div className={styles.checkboxTable}>
      {Object.keys(options).map(category => (
        <div key={category} className={styles.checkboxWithDimName}>
          <p className={styles.dimName}>{category.charAt(0).toUpperCase() + category.slice(1)}</p>
          <table className={styles.checkboxWithLabel}>
            <tbody>
              <tr>
                {options[category].map(item => (
                  <td key={item} className={styles.checkboxEach}>
                    <label>
                      <input
                        type="checkbox"
                        name={item}
                        checked={selectedOptions[category].includes(item)}
                        onChange={() => handleCheckboxChange(category, item)}
                      />
                      {item}
                    </label>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      ))}
      <button onClick={handleOkClick} className="ok-button">OK</button>
    </div>
  );
};

export default CheckboxTable;
