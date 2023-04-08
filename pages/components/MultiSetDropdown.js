import React from 'react';
import Select from 'react-select';

const options = [
  { value: 'RSRWB', label: 'Right Side Road Wheel Bearing' },
  { value: 'RSOS', label: 'Right Side Oil Seal' },
  { value: 'OP', label: 'Oil Protactor (OIL Seal Protactor)' },
  { value: 'SI', label: 'Spacer Inner' },
  { value: 'RWC', label: 'Rear Wheel Cylinder' },
  { value: 'EM6E', label: 'Engine Mounting 624 each' },
  { value: 'R3E', label: 'Rotter 369 each' },
  { value: 'AM', label: 'Ampear Miter' },
  { value: 'DP', label: 'Diode Plate(set of 16 pcs)' },
  { value: 'ICV', label: 'Injector Control Valve' },
  { value: 'CFO', label: 'Cabin For OC' },
  { value: 'WB', label: 'Wiper Blade' },
  { value: 'WC', label: 'Wheel Cover' },
];

const MultiSetDropdown = ({ selectedValues, handleChange }) => {
  const selectedOptions = options.filter((option) =>
    selectedValues.includes(option.value)
  );

  return (
    <Select
      isMulti
      options={options}
      value={selectedOptions}
      onChange={handleChange}
    />
  );
};

export default MultiSetDropdown;