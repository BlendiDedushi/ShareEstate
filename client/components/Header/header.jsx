import {
    faBed,
    faCalendarDays,
    faCar,
    faPerson,
    faPlane,
    faTaxi,
  } from "@fortawesome/free-solid-svg-icons";
  import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
  import styles from "./header.module.css";
  import { DateRange } from "react-date-range";
  import { useState } from "react";
  import "react-date-range/dist/styles.css"; // main css file
  import "react-date-range/dist/theme/default.css"; // theme css file
  import { format } from "date-fns";
  import { useRouter } from "next/router";
  
  const Header = ({ type }) => {
    const [destination, setDestination] = useState("");
    const [openDate, setOpenDate] = useState(false);
    const [date, setDate] = useState([
      {
        startDate: new Date(),
        endDate: new Date(),
        key: "selection",
      },
    ]);
    const [openOptions, setOpenOptions] = useState(false);
    const [options, setOptions] = useState({
      adult: 1,
      children: 0,
      room: 1,
    });
  
    const navigate = useRouter();
  
    const handleOption = (name, operation) => {
      setOptions((prev) => {
        return {
          ...prev,
          [name]: operation === "i" ? options[name] + 1 : options[name] - 1,
        };
      });
    };
  
    const handleSearch = () => {
      navigate("/hotels", { state: { destination, date, options } });
    };
  
    return (
      <div className={styles.header}>
        <div
          className={styles.
            type === "list" ? "headerContainer listMode" : "headerContainer"
          }
        >
          <div className={styles.headerList}>
            <div className={`${styles.headerListItem} ${styles.active}`}>
              <FontAwesomeIcon icon={faBed} />
              <span>Stays</span>
            </div>
            <div className={styles.headerListItem}>
              <FontAwesomeIcon icon={faPlane} />
              <span>Flights</span>
            </div>
            <div className={styles.headerListItem}>
              <FontAwesomeIcon icon={faCar} />
              <span>Car rentals</span>
            </div>
            <div className={styles.headerListItem}>
              <FontAwesomeIcon icon={faBed} />
              <span>Attractions</span>
            </div>
            <div className={styles.headerListItem}>
              <FontAwesomeIcon icon={faTaxi} />
              <span>Airport taxis</span>
            </div>
          </div>
          {type !== "list" && (
            <>
              <h1 className={styles.headerTitle}>
                A lifetime of discounts? It's Genius.
              </h1>
              <p className={styles.headerDesc}>
                Get rewarded for your travels – unlock instant savings of 10% or
                more with a free Lamabooking account
              </p>
              <button className={styles.headerBtn}>Sign in / Register</button>
              <div className={styles.headerSearch}>
                <div className={styles.headerSearchItem}>
                  <FontAwesomeIcon icon={faBed} className={styles.headerIcon} />
                  <input
                    type="text"
                    placeholder="Where are you going?"
                    className={styles.headerSearchInput}
                    onChange={(e) => setDestination(e.target.value)}
                  />
                </div>
                <div className={styles.headerSearchItem}>
                  <FontAwesomeIcon icon={faCalendarDays} className={styles.headerIcon} />
                  <span
                    onClick={() => setOpenDate(!openDate)}
                    className={styles.headerSearchText}
                  >{`${format(date[0].startDate, "MM/dd/yyyy")} to ${format(
                    date[0].endDate,
                    "MM/dd/yyyy"
                  )}`}</span>
                  {openDate && (
                    <DateRange
                      editableDateInputs={true}
                      onChange={(item) => setDate([item.selection])}
                      moveRangeOnFirstSelection={false}
                      ranges={date}
                      className={styles.date}
                      minDate={new Date()}
                    />
                  )}
                </div>
                <div className={styles.headerSearchItem}>
                  <FontAwesomeIcon icon={faPerson} className={styles.headerIcon} />
                  <span
                    onClick={() => setOpenOptions(!openOptions)}
                    className={styles.headerSearchText}
                  >{`${options.adult} adult · ${options.children} children · ${options.room} room`}</span>
                  {openOptions && (
                    <div className={styles.options}>
                      <div className={styles.optionItem}>
                        <span className={styles.optionText}>Adult</span>
                        <div className={styles.optionCounter}>
                          <button
                            disabled={options.adult <= 1}
                            className={styles.optionCounterButton}
                            onClick={() => handleOption("adult", "d")}
                          >
                            -
                          </button>
                          <span className={styles.optionCounterNumber}>
                            {options.adult}
                          </span>
                          <button
                            className={styles.optionCounterButton}
                            onClick={() => handleOption("adult", "i")}
                          >
                            +
                          </button>
                        </div>
                      </div>
                      <div className={styles.optionItem}>
                        <span className={styles.optionText}>Children</span>
                        <div className={styles.optionCounter}>
                          <button
                            disabled={options.children <= 0}
                            className={styles.optionCounterButton}
                            onClick={() => handleOption("children", "d")}
                          >
                            -
                          </button>
                          <span className={styles.optionCounterNumber}>
                            {options.children}
                          </span>
                          <button
                            className={styles.optionCounterButton}
                            onClick={() => handleOption("children", "i")}
                          >
                            +
                          </button>
                        </div>
                      </div>
                      <div className={styles.optionItem}>
                        <span className={styles.optionText}>Room</span>
                        <div className={styles.optionCounter}>
                          <button
                            disabled={options.room <= 1}
                            className={styles.optionCounterButton}
                            onClick={() => handleOption("room", "d")}
                          >
                            -
                          </button>
                          <span className={styles.optionCounterNumber}>
                            {options.room}
                          </span>
                          <button
                            className={styles.optionCounterButton}
                            onClick={() => handleOption("room", "i")}
                          >
                            +
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
                <div className={styles.headerSearchItem}>
                  <button className={styles.headerBtn} onClick={handleSearch}>
                    Search
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    );
  };
  
  export default Header;