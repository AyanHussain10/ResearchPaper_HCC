import React, { useState, useEffect } from 'react';

const BranchDay10PCSelect = ( {chartsBranchData} ) => {
  // Step 1: Define an array of options
  const optionsArray = [
    { value: 'apple', label: 'Apple' },
    { value: 'banana', label: 'Banana' },
    { value: 'cherry', label: 'Cherry' },
    { value: 'date', label: 'Date' }
  ];
  console.log("....chartsBranchData, ", chartsBranchData);

  const branchIndex = Array.from({ length: chartsBranchData["numBranches"] }, (_, index) => index);

  // Step 2: Create a state variable to hold the selected value
  const [selectedOption, setSelectedOption] = useState('');

  useEffect(() => {
    console.log("....chartsBranchData, ", chartsBranchData)
    Object.keys(chartsBranchData).forEach((sampleKey)  => {
      console.log(chartsBranchData[sampleKey]["numBranches"])
      // let branchName = chartsBranchData[sampleKey]["link"].split('_Info')[0] + '_8.txt'
      let minX = 1000;
      let maxX = -1000;
      let minY = 1000;
      let maxY = -1000;
      let minZ = 1000;
      let maxZ = -1000;
      let branchName = 'KIT_C_10D_11.txt';
      fetch(`/data/branchDay10/${branchName}`)
      .then(response => response.text())
      .then(text => {
        const pointsData  = [];
      })
      .catch(error => console.error('Error loading the file', error));
    });
  // });  
  }, [chartsBranchData]);

  // Step 4: Write a function to handle selection changes
  const handleChange = (event) => {
    setSelectedOption(event.target.value);
    console.log('Selected:', event.target.value); // For demonstration purposes
  };

  return (
    <div>
      {/* Step 3: Render a select element with options */}
      <label htmlFor="branch-select">Choose a branch based on index:</label>
      <select
        id="branch-select"
        value={selectedOption}
        onChange={handleChange}
      >
        <option value="" disabled>Select a fruit</option>
        {optionsArray.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>

      {/* Optional display of the selected value */}
      {selectedOption && (
        <p>You have selected: {selectedOption}</p>
      )}
    </div>
  );
};

export default BranchDay10PCSelect;
