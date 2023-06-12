import styles from "./propertyList.module.css";
import React, {useEffect, useState} from "react";
import Link from "next/link";
import {useRouter} from "next/router";

const PropertyList = ({ data }) => {
  const router = useRouter();
  const [filteredEstates, setFilteredEstates] = useState([router?.query?.city]);

  const filterEstatesByCity = (city) => {
    const filteredData = data.filter((estate) => estate.city === city);
    setFilteredEstates(filteredData);
  };

  useEffect(() => {
    filterEstatesByCity(router?.query?.city);
  },[router?.query?.city]);

  const resetFilter = () => {
    setFilteredEstates([]);
  };

  return (
    <div>
      <div className={styles.plists}>
        <div
          className={styles.plItem}
          onClick={() => filterEstatesByCity("New York")}
        >
          <img
            src="https://i.natgeofe.com/k/5b396b5e-59e7-43a6-9448-708125549aa1/new-york-statue-of-liberty_2x1.jpg"
            alt=""
          />
          <span className={styles.plCity}>New York</span>
        </div>

        <div
          className={styles.plItem}
          onClick={() => filterEstatesByCity("Presheve")}
        >
          <img
            src="https://euronews.al/en/wp-content/uploads/2021/06/Presheva.jpg"
            alt=""
          />
          <span className={styles.plCity}>Presheve</span>
        </div>

        <div
          className={styles.plItem}
          onClick={() => filterEstatesByCity("Prishtina")}
        >
          <img
            src="https://prishtinainsight.com/wp-content/uploads/2022/08/IMG-8230.jpg"
            alt=""
          />
          <span className={styles.plCity}>Prishtina</span>
        </div>

        <div
          className={styles.plItem}
          onClick={() => filterEstatesByCity("Lipjan")}
        >
          <img
            src="https://www.kosovo-vacations.com/ressourcen/images/lipjan-winter.jpg"
            alt=""
          />
          <span className={styles.plCity}>Lipjan</span>
        </div>
      </div>
      <div className={styles.filteredCities}>
        {filteredEstates.length > 0 ? (
          <div className={styles.properties}>
            {filteredEstates.map((estate) => (
              <Link key={estate?._id} href={`/estate/${estate?._id}`}>
                <div className={styles.fpItem}>
                  <img
                    src={estate?.photos[0]}
                    alt=""
                    className={styles.fpImg}
                  />
                  <span className={styles.fpName}>Name: {estate?.name}</span>
                  <span className={styles.fpCity}>Location: {estate?.city}</span>
                  <span className={styles.fpPrice}>
                    Price: {estate?.cheapestPrice}€
                  </span>
                  <div className={styles.fpRating}>
                    <button>{estate?.rating}</button>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default PropertyList;
