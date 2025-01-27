import { useEffect, useState } from "react";

const SelectWithSearch = ({ options, onSelect }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredOptions, setFilteredOptions] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setFilteredOptions(options);
  }, [options]);

  const handleSearchChange = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    setFilteredOptions(
      options.filter((option) =>
        option?.school_name.toLowerCase().includes(term)
      )
    );
    setIsOpen(true);
  };

  const handleOptionClick = (option) => {
    setSearchTerm(option.school_name); // Set the selected option in the input field
    onSelect((prev) => ({...prev, school_UID:option.school_UID})); // Pass the selected value to the parent
    setIsOpen(false); // Close the dropdown
  };

  const handleBlur = () => {
    // Close the dropdown when input loses focus (with a delay to allow clicking options)
    setTimeout(() => setIsOpen(false), 100);
  };

  return (
    <div className="relative w-full">
      <input
        type="text"
        placeholder="Search or select"
        value={searchTerm}
        onChange={handleSearchChange}
        onFocus={() => setIsOpen(true)}
        onBlur={handleBlur}
        className="input input-bordered w-full"
        required
      />
      {isOpen && (
        <ul className="absolute z-10 mt-1 w-full bg-white shadow-lg rounded-md max-h-60 overflow-auto">
          {filteredOptions?.length > 0 ? (
            filteredOptions.map((option, index) => (
              <li
                key={index}
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                onClick={() => handleOptionClick(option)}
              >
                {option.school_name}
              </li>
            ))
          ) : (
            <li className="px-4 py-2 text-gray-500">No options found</li>
          )}
        </ul>
      )}
    </div>
  );
};

export default SelectWithSearch;
