/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect } from "react";
// import Select from "react-select";
import {
  UseFormRegister,
  UseFormSetValue,
  UseFormWatch,
} from "react-hook-form";
import { useAppSelector } from "../../store/hooks";
import CreatableSelect from "react-select/creatable";

interface CustomerOption {
  value: string;
  label: string;
}

interface CustomerSelectProps {
  register: UseFormRegister<any>;
  setValue: UseFormSetValue<any>;
  watch: UseFormWatch<any>;
  name: string;
  list: { id: string; name: string }[];
  isMultiple?: boolean;
  onInputChange?: (inputValue: string) => void;
}

export const CustomerSelector: React.FC<CustomerSelectProps> = ({
  register,
  setValue,
  watch,
  name,
  list = [],
  isMultiple,
  onInputChange,
}) => {
  const options: CustomerOption[] = (list ?? []).map((customer) => ({
    value: customer.id,
    label: customer.name,
  }));

  const selectedValue = watch(name);
  const { isDarkMode } = useAppSelector((state) => state.darkMode);

  useEffect(() => {
    register(name, { required: `${name} is required` });
  }, [register, name]);

  // Helper to get the selected option(s), supporting new values
  const getSelectedOption = () => {
    const foundOption = options.find(
      (option) => option.value === selectedValue
    );
    if (foundOption) return foundOption;

    // Try to find by ID in list and get the name
    const customer = list.find((c) => String(c.id) === String(selectedValue));
    return selectedValue
      ? { value: selectedValue, label: customer?.name || selectedValue }
      : null;
  };

  return (
    <div>
      <CreatableSelect
        isMulti={isMultiple}
        options={options}
        isClearable
        value={getSelectedOption()}
        onChange={(selected: any) => {
          let newValue;

          const isExisting = options.some((o) => o.value === selected?.value);
          newValue = selected
            ? isExisting
              ? selected.value // id for existing
              : selected.label // name for new
            : "";
          setValue(name, newValue);
        }}
        onInputChange={onInputChange}
        styles={{
          control: (base, { isFocused }) => ({
            ...base,
            borderWidth: "1.5px",
            padding: "6px 10px",
            borderColor: isFocused ? "#2563eb" : "#d1d5db",
            boxShadow: isFocused ? "0 0 0 2px rgba(37, 99, 235, 0.5)" : "none",
            backgroundColor: "transparent",
            borderRadius: "0.375rem",
            transition: "all 0.2s ease-in-out",
          }),
          menu: (base) => ({
            ...base,
            backgroundColor: isDarkMode ? "#1f2937" : "#e2e8f0",
            borderRadius: "0.375rem",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
          }),
          option: (base, { isFocused, isSelected }) => ({
            ...base,
            backgroundColor: isSelected
              ? "#2563eb"
              : isFocused
              ? isDarkMode
                ? "#475569"
                : "#cbd5e1"
              : isDarkMode
              ? "#475569"
              : "#ffffff",
            color: isDarkMode ? "#fff" : "#000",
            padding: "10px",
            cursor: "pointer",
          }),
          singleValue: (base) => ({
            ...base,
            color: isDarkMode ? "#fff" : "#000",
            fontWeight: "500",
          }),
        }}
      />
      <input type="hidden" {...register(name, { required: true })} />
    </div>
  );
};
