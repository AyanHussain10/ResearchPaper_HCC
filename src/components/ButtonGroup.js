import React, { useState } from 'react';
import '../styles/ButtonGroup.module.css'; // Make sure the CSS path is correct

const ButtonGroup = ({ onFetchChartData }) => {
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
    return handlers[type]();
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
    <div className="button-group">
      {['genotype', 'treatment', 'time'].map((category) => (
        <div key={category} className="category">
          <div className="label">{category.charAt(0).toUpperCase() + category.slice(1)}</div>
          {eval(category + 's').map((item) => (
            <button
              key={item}
              className={`button ${isActive(category, item) ? 'selected' : ''}`}
              onClick={() => handleSelection(category, item)}
            >
              {isActive(category, item) ? '✓ ' : ''}{item}
            </button>
          ))}
        </div>
      ))}
      <button onClick={handleOkClick} className="ok-button">OK</button>
    </div>
  );
};

export default ButtonGroup;
