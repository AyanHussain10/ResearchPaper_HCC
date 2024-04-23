import React, { useState } from 'react';
import styles from '../styles/CheckboxTable.module.css';

const CheckboxTable = ({ onFetchChartData }) => {
  const [selectedGenotype, setSelectedGenotype] = useState(null);
  const [selectedTreatment, setSelectedTreatment] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);

  const genotypes = ['KIT', 'HO1', 'HO2', 'HC2', 'HC5'];
  const treatments = ['Control', 'HDNT'];
  const times = ['D4', 'D7', 'D10'];

  const handleSelection = (type, value) => {
    const handlers = {
      genotype: () => setSelectedGenotype(value),
      treatment: () => setSelectedTreatment(value),
      time: () => setSelectedTime(value),
    };
    handlers[type]();
  };

  const isActive = (type, value) => {
    const selections = {
      genotype: selectedGenotype,
      treatment: selectedTreatment,
      time: selectedTime,
    };
    return selections[type] === value;
  };

  const handleOkClick = () => {
    if (selectedGenotype && selectedTreatment && selectedTime) {
      const filename = `${selectedGenotype}_${selectedTreatment}_${selectedTime}_Info.json`;
      onFetchChartData(filename);
    } else {
      alert('Please select an option from each category.');
    }
  };

  return (
    <div className={styles.checkboxTable}>
      {['genotype', 'treatment', 'time'].map((category) => (
        <div key={category} className={styles.checkboxWithDimName}>
          <p className={styles.dimName}>{category.charAt(0).toUpperCase() + category.slice(1)}</p>
          <table className={styles.checkboxWithLabel}>
            <tbody>
              <tr>
                {eval(category + 's').map((item) => (
                  <td key={item} className={styles.checkboxEach}>
                    <label>
                      <input
                        type="checkbox"
                        name={item}
                        checked={isActive(category, item)}
                        onChange={() => handleSelection(category, item)}
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
