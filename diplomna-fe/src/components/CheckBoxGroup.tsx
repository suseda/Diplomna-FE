import React, { useState } from 'react';
import CheckBox from './CheckBox';
import { CheckBoxGroupProps } from '../interface';


const CheckBoxGroup: React.FC<CheckBoxGroupProps> = ({ options, handleType }) => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const handleOptionChange = (option: string) => {
    setSelectedOption(option);
    handleType(option);
  };

  return (
    <div>
      {options.map((option) => (
        <CheckBox
          key={option}
          text={option}
          name="category"
          checked={option === selectedOption}
          onChange={() => handleOptionChange(option)}
        />
      ))}
    </div>
  );
};

export default CheckBoxGroup;