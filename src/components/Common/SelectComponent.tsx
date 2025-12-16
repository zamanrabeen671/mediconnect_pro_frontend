import React from "react";
import Select, { MultiValue, SingleValue } from "react-select";

interface SelectOption {
  value: number;
  label: string;
}

interface CommonSelectProps {
  selectOptions: SelectOption[];
  selectData?: SingleValue<SelectOption> | MultiValue<SelectOption> | null;
  setSingleSelectData?: (data: SingleValue<SelectOption> | null) => void;
  setMultiSelectData?: (data: SelectOption[]) => void;
  handleSelectChange: (
    data: SingleValue<SelectOption> | MultiValue<SelectOption>
  ) => void;
  placeholder: string;
  searchable?: boolean;
  clearable?: boolean;
  isMultiple?: boolean;
}

const SelectComponent: React.FC<CommonSelectProps> = ({
  selectOptions,
  selectData,
  setSingleSelectData,
  setMultiSelectData,
  handleSelectChange,
  placeholder,
  searchable = false,
  clearable = true,
  isMultiple = false,
}) => {
  const handleChange = (
    selectedOption: SingleValue<SelectOption> | MultiValue<SelectOption>
  ) => {
    if (isMultiple && setMultiSelectData && Array.isArray(selectedOption)) {
      // Spread only if `selectedOption` is an array (MultiValue case)
      setMultiSelectData([...selectedOption]);
    } else if (!isMultiple && setSingleSelectData) {
      setSingleSelectData(selectedOption as SingleValue<SelectOption>);
    }
    handleSelectChange(selectedOption);
  };

  return (
    <Select
      className="bg-transparent h-10 p-0.5 w-full text-black text-sm appearance-none focus:outline-none"
      classNamePrefix="select"
      aria-label="Common select"
      isMulti={isMultiple}
      isClearable={clearable}
      isSearchable={searchable}
      placeholder={placeholder}
      value={selectData}
      onChange={handleChange}
      options={selectOptions}
      instanceId="common-select"
    />
  );
};

export default SelectComponent;
