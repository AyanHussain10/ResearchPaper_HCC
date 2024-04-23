import React, { useState } from 'react';
import '../styles/ButtonGroup.module.css';

const ButtonGroup = ({ onFetchChartData }) => {
  const [selectedGenotype, setSelectedGenotype] = useState('KIT');
  const [selectedTreatment, setSelectedTreatment] = useState('Control');
  const [selectedTime, setSelectedTime] = useState('D4');

  const genotypes = ['KIT', 'HO1', 'HO2', 'HC2', 'HC5'];
  const treatments = ['Control', 'HDNT'];
  const times = ['D4', 'D7', 'D10'];

  const handleOkClick = () => {
    if (selectedGenotype && selectedTreatment && selectedTime) {
      // let treat, time;
      // selectedTreatment==='Control'? treat='C':treat=`${selectedTreatment}`;
      // selectedTime==='D4'? time='d4':time=`${selectedTime}`;
      // selectedTime==='D7'? time='d7':time=`${selectedTime}`;
      // selectedTime==='D10'? time='d10':time=`${selectedTime}`;

      const filename = `../data/${selectedGenotype}_${selectedTreatment}_${selectedTime}_Info.json`;
      onFetchChartData(filename);
    } else {
      alert('Please select an option from each category.');
    }
  };

  return (
    <div className="button-group">
      <div className="category">
        <div className="label">Genotype</div>
        {genotypes.map(genotype => (
          <button
            key={genotype}
            className={selectedGenotype === genotype ? 'button selected' : 'button'}
            onClick={() => setSelectedGenotype(genotype)}
          >
            {selectedGenotype === genotype ? '✓ ' : ''}{genotype}
          </button>
        ))}
      </div>
      <div className="category">
        <div className="label">Treatment</div>
        {treatments.map(treatment => (
          <button
            key={treatment}
            className={selectedTreatment === treatment ? 'button selected' : 'button'}
            onClick={() => setSelectedTreatment(treatment)}
          >
            {selectedTreatment === treatment ? '✓ ' : ''}{treatment}
          </button>
        ))}
      </div>
      <div className="category">
        <div className="label">Time</div>
        {times.map(time => (
          <button
            key={time}
            className={selectedTime === time ? 'button selected' : 'button'}
            onClick={() => setSelectedTime(time)}
          >
            {selectedTime === time ? '✓ ' : ''}{time}
          </button>
        ))}
      </div>
      <button onClick={handleOkClick}>OK</button>
    </div>
  );
};

export default ButtonGroup;
