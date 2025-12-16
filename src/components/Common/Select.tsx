/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect } from "react";
import Select from "react-select";
import { UseFormRegister, UseFormSetValue, UseFormWatch } from "react-hook-form";
import { useAppSelector } from "../../store/hooks";

interface BrandOption {
  value: string;
  label: string;
}

interface BrandSelectProps {
  register: UseFormRegister<any>;
  setValue: UseFormSetValue<any>;
  watch: UseFormWatch<any>;
  name: string;
  list: { id: string; name: string }[];
  isMultiple?: boolean;
}

const Selector: React.FC<BrandSelectProps> = ({ register, setValue, watch, name, list, isMultiple }) => {
  const options: BrandOption[] = list.map((brand) => ({
    value: brand.id,
    label: brand.name,
  }));

  const selectedValue = watch(name);
  //   const isDarkMode = document.documentElement.classList.contains("dark")
  //   console.log(isDarkMode)
  const { isDarkMode } = useAppSelector((state) => state.darkMode)

  useEffect(() => {
    register(name, { required: `${name} is required` });
  }, [register, name]);

  return (
    <div>
      <Select
        isMulti={isMultiple}
        options={options}
        isClearable
        value={options.find((option) => option.value === selectedValue)}
        // onChange={(selected) => setValue(name, selected ? selected.value : "")}
        onChange={(selected:any) => {
          const newValue = isMultiple
            ? selected
              ? selected.map((s:any) => s.value) // Extract array of selected values
              : []
            : selected?.value || "";
          console.log("Selected Values:", newValue);
          setValue(name, newValue);
        }}
        styles={{
          control: (base, { isFocused }) => ({
            ...base,
            borderWidth: "1.5px",
            padding: "6px 10px",
            borderColor: isFocused ? "#2563eb" : "#d1d5db", // Tailwind: primary and gray-300
            boxShadow: isFocused ? "0 0 0 2px rgba(37, 99, 235, 0.5)" : "none",
            backgroundColor: "transparent",
            borderRadius: "0.375rem",
            transition: "all 0.2s ease-in-out",
          }),
          menu: (base) => ({
            ...base,
            backgroundColor: isDarkMode ? "#1f2937" : "#e2e8f0", // dark: gray-800, light: slate-200
            borderRadius: "0.375rem",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
          }),
          option: (base, { isFocused, isSelected }) => ({
            ...base,
            backgroundColor: isSelected
              ? "#2563eb" // Selected option background color
              : isFocused
              ? isDarkMode
                ? "#475569" // Dark mode hover color
                : "#cbd5e1" // Light mode hover color (slate-300)
              : isDarkMode
              ? "#475569" // Dark mode normal state
              : "#ffffff", // Light mode normal state
            // color: isSelected ? "#ffffff" : "#000000",
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

export default Selector;
