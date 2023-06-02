import styles from "./propertyList.module.css";
import styless from "../FeaturedProperties/featuredProperties.module.css";
import React, { useState } from 'react';
import Link from 'next/link';

const PropertyList = ({ data }) => {
  const [filteredEstates, setFilteredEstates] = useState([]);

  const filterEstatesByCity = (city) => {
    const filteredData = data.filter((estate) => estate.city === city);
    setFilteredEstates(filteredData);
  };

  const resetFilter = () => {
    setFilteredEstates([]);
  };

  return (
    <div className={styles.plists}>
      <div className={styles.plItem} onClick={() => filterEstatesByCity('New York')}>
        <img
          src="https://i.natgeofe.com/k/5b396b5e-59e7-43a6-9448-708125549aa1/new-york-statue-of-liberty_2x1.jpg"
          alt=""
        />
        <span className={styles.plCity}>New York</span>
      </div>

      <div className={styles.plItem} onClick={() => filterEstatesByCity('Presheve')}>
        <img
          src="https://euronews.al/en/wp-content/uploads/2021/06/Presheva.jpg"
          alt=""
        />
        <span className={styles.plCity}>Presheve</span>
      </div>

      <div className={styles.plItem} onClick={() => filterEstatesByCity('Prishtina')}>
        <img
          src="https://prishtinainsight.com/wp-content/uploads/2022/08/IMG-8230.jpg"
          alt=""
        />
        <span className={styles.plCity}>Prishtina</span>
      </div>

      <div className={styles.plItem} onClick={() => filterEstatesByCity('Lipjan')}>
        <img
          src="https://www.kosovo-vacations.com/ressourcen/images/lipjan-winter.jpg"
          alt=""
        />
        <span className={styles.plCity}>Lipjan</span>
      </div>

      
          {filteredEstates.length > 0 ? (
              <div className={styles.properties}>
            {filteredEstates.map((estate) => (
            <Link key={estate._id} href={`/estate/${estate._id}`}>
              <div className={styless.fpItem}>
                <img
                  src="https://cf.bstatic.com/xdata/images/hotel/square600/13125860.webp?k=e148feeb802ac3d28d1391dad9e4cf1e12d9231f897d0b53ca067bde8a9d3355&o=&s=1"
                  alt=""
                  className={styles.fpImg}
                />
                <span className={styless.fpName}>{estate.name}</span>
                <span className={styless.fpCity}>{estate.city}</span>
                <span className={styless.fpPrice}>
                  Starting from ${estate.cheapestPrice}
                </span>
                <div className={styless.fpRating}>
                  <button>{estate.rating}</button>
                  <span>Excellent</span>
                </div>
              </div>
            </Link>
          ))} 
        </div>
      ) : null}
            <button className={styles.button} onClick={resetFilter}>Back to Cities</button>
        </div>
   
  );
};

export default PropertyList;
