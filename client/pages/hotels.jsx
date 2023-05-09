import style from "./style/List.module.css";;
import Navbar from "@/components/Navbar/navbar";
import Header from "@/components/Header/header";
import { useState } from "react";
import { format } from "date-fns";
import { DateRange } from "react-date-range";
import SearchItem from "@/components/SearchItem/searchItem";
import { useRouter } from "next/router";
import moment from "moment";

const List = () => {
    const router = useRouter();
    const [destination, setDestination] = useState(router.query?.destination || '');
    const [date, setDate] = useState(router.query?.date || '');
    const [openDate, setOpenDate] = useState(false);
    const [options, setOptions] = useState(JSON.parse(router.query?.options) || '');
    console.log(date);
  return (
    <div>
      <Navbar />
      <Header type="list" />
      <div className={style.listContainer}>
        <div className={style.listWrapper}>
          <div className={style.listSearch}>
            <h1 className={style.lsTitle}>Search</h1>
            <div className={style.lsItem}>
              <label>Destination</label>
              <input placeholder={destination} type="text" />
            </div>
            <div className={style.lsItem}>
              <label>Check-in Date</label>
              <span onClick={() => setOpenDate(!openDate)}>{`${ moment(date[0].startDate).format('YYYY/MM/DD')} to ${ moment(date[0].endDate).format('YYYY/MM/DD')}`}</span>
              {openDate && (
                <DateRange
                  editableDateInputs={true}
                  moveRangeOnFirstSelection={false}
                  onChange={(item) => setDate([item.selection])}
                  minDate={new Date()}
                  ranges={[JSON.parse(date)]}
                />
              )}
            </div>
            <div className={style.lsItem}>
              <label>Options</label>
              <div className={style.lsOptions}>
                <div className={style.lsOptionItem}>
                  <span className={style.lsOptionText}>
                    Min price <small>per night</small>
                  </span>
                  <input type="number" className={style.lsOptionInput} />
                </div>
                <div className={style.lsOptionItem}>
                  <span className={style.lsOptionText}>
                    Max price <small>per night</small>
                  </span>
                  <input type="number" className={style.lsOptionInput} />
                </div>
                <div className={style.lsOptionItem}>
                  <span className={style.lsOptionText}>Adult</span>
                  <input
                    type="number"
                    min={1}
                    className={style.lsOptionInput}
                    placeholder={options.adult}
                  />
                </div>
                <div className={style.lsOptionItem}>
                  <span className={style.lsOptionText}>Children</span>
                  <input
                    type="number"
                    min={0}
                    className={style.lsOptionInput}
                    placeholder={options.children}
                  />
                </div>
                <div className={style.lsOptionItem}>
                  <span className={style.lsOptionText}>Room</span>
                  <input
                    type="number"
                    min={1}
                    className={style.lsOptionInput}
                    placeholder={options.room}
                  />
                </div>
              </div>
            </div>
            <button>Search</button>
          </div>
          <div className={style.listResult}>
            <SearchItem />
            <SearchItem />
            <SearchItem />
            <SearchItem />
            <SearchItem />
            <SearchItem />
            <SearchItem />
            <SearchItem />
            <SearchItem />
          </div>
        </div>
      </div>
    </div>
  );
};

export default List;