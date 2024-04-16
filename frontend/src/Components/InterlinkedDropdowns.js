import React, { useState } from 'react';
import Select from 'react-select';

const InterlinkedDropdowns = () => {
  const [selectedType, setSelectedType] = useState(null);
  const [selectedExample, setSelectedExample] = useState(null);

  const options = {
    regression: ['Linear Regression', 'Polynomial Regression'],
    classification: ['Logistic Regression', 'Decision Tree']
  };

  const modelTypes = Object.keys(options).map(key => ({
    value: key,
    label: key.charAt(0).toUpperCase() + key.slice(1) // Capitalize the first letter
  }));

  const handleTypeChange = selectedOption => {
    setSelectedType(selectedOption);
    setSelectedExample(null); // Reset example dropdown when type changes
  };

  const handleExampleChange = selectedOption => {
    setSelectedExample(selectedOption);
  };

  return (
    <div>
      <Select
        value={selectedType}
        onChange={handleTypeChange}
        options={modelTypes}
        placeholder="Select Model Type"
      />
      {selectedType && (
        <Select
          value={selectedExample}
          onChange={handleExampleChange}
          options={options[selectedType.value].map(option => ({
            value: option,
            label: option
          }))}
          placeholder="Select Example"
        />
      )}
    </div>
  );
};

export default InterlinkedDropdowns;
