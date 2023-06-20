import styles from "./header.module.css";
import { useState } from "react";
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file
import { useRouter } from "next/router";
import axios from "axios";

const Header = () => {
  const router = useRouter();
  const [inputValue, setInputValue] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState("");

  const handleInputChange = async (event) => {
    const value = event.target.value;
    setInputValue(value);

    const response = await axios.get(
      `https://nominatim.openstreetmap.org/search?format=json&q=${value}`
    );

    if (response.data) {
      setSuggestions(response.data);
    }
  };

  const handleSelectAddress = (address) => {
    setSelectedAddress(address.display_name);
    setInputValue(address.display_name);
    setSuggestions([]);
  };

  const handleSearchEnter = async (event) => {
    if (event.key === "Enter") {
      await router.push({
        pathname: "/eByCity",
        query: { city: selectedAddress },
      });
    }
  };

  return (
    <div className={styles.header}>
      <div className="container m-auto flex justify-between w-[65%] mb-[80px] mt-[20px]">
        <div className="w-[50%]">
          <h1 className="text-[48px] mt-[80px] text-[#8CC084] font-semibold">
            Roommates
          </h1>
          <p className="text-[24px]" style={{ color: "white" }}>
            Find your perfect roommate
          </p>
          <input
            onKeyDown={handleSearchEnter}
            value={inputValue}
            onChange={handleInputChange}
            type="text"
            placeholder="Enter a city"
            className="border pl-[10px] rounded-[12px] border-[#333] h-[72px] w-full mt-[30px]"
            style={{ color: "black" }}
          />
          <ul className="mt-2 w-full max-w-md">
            {suggestions.map((suggestion) => (
              <li
                key={suggestion.place_id}
                onClick={() => handleSelectAddress(suggestion)}
                className="py-2 px-4 cursor-pointer hover:bg-gray-100"
              >
                {suggestion.display_name}
              </li>
            ))}
          </ul>
        </div>
        <div className="w-[37%]">
          <img className="w-full" src="/images/phone.svg" />
        </div>
      </div>
    </div>
  );
};
export default Header;
