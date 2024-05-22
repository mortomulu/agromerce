"use client";
import React, { useState } from "react";

const SelectGroup: React.FC = () => {
  const [selectedOption, setSelectedOption] = useState<string>("");
  const [isOptionSelected, setIsOptionSelected] = useState<boolean>(false);

  const changeTextColor = () => {
    setIsOptionSelected(true);
  };

  return (
    <div>
      <label className="mb-3 block text-sm font-medium text-black dark:text-white">
        Select Category
      </label>

      <div className="relative z-20 bg-white dark:bg-form-input">
        <select
          value={selectedOption}
          onChange={(e) => {
            setSelectedOption(e.target.value);
            changeTextColor();
          }}
          className={`relative text-gray-500 border-gray-300 z-20 w-full appearance-none rounded-lg border-[1.5px] border-stroke bg-transparent px-6 py-3 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input ${
            isOptionSelected ? "text-gray-300 dark:text-white" : ""
          }`}
        >
          <option
            value=""
            disabled
            className="text-body text-gray-200 dark:text-bodydark"
          >
            Select Category
          </option>
          <option value="USA" className="text-body dark:text-bodydark">
            Pra
          </option>
          <option value="UK" className="text-body dark:text-bodydark">
            Pasca
          </option>
        </select>
      </div>
    </div>
  );
};

export default SelectGroup;
