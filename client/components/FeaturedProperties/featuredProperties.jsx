import styles from "./featuredProperties.module.css";
import React from "react";

const FeaturedProperties = ({ data }) => {
  return (
    <div className={styles.fp}>
      <div className="w-[70%] flex justify-between mx-auto my-[150px]">
        <div className="border border-[#333] p-[30px] flex flex-col gap-[15px] w-[30%]">
          <img className="w-[30px] " src="/images/case-logo.svg" />
          <h4>Find a home</h4>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam</p>
        </div>
        <div className="border border-[#333] p-[30px] flex flex-col gap-[15px] w-[30%]">
          <img className="w-[30px] " src="/images/case-logo.svg" />
          <h4>Find a home</h4>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam</p>
        </div>
        <div className="border border-[#333] p-[30px] flex flex-col gap-[15px] w-[30%]">
          <img className="w-[30px] " src="/images/case-logo.svg" />
          <h4>Find a home</h4>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam</p>
        </div>
      </div>
      {/* {data?.map((estate) => (
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
      ))} */}
    </div>
  );
};

export default FeaturedProperties;
