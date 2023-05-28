import styles from './featuredProperties.module.css';
import React from 'react';

const FeaturedProperties = ({data}) => {

  return (
    <div className={styles.fp}>
      {data?.map((estate) => (
        <div key={estate.id} className={styles.fpItem}>
        <img
          src="https://cf.bstatic.com/xdata/images/hotel/square600/13125860.webp?k=e148feeb802ac3d28d1391dad9e4cf1e12d9231f897d0b53ca067bde8a9d3355&o=&s=1"
          alt=""
          className={styles.fpImg}
        />
        <span className={styles.fpName}>{estate.name}</span>
        <span className={styles.fpCity}>{estate.city}</span>
        <span className={styles.fpPrice}>Starting from ${estate.cheapestPrice}</span>
        <div className={styles.fpRating}>
          <button>{estate.rating}</button>
          <span>Excellent</span>
        </div>
      </div>
      ))}
    </div>
  );
};

export default FeaturedProperties;