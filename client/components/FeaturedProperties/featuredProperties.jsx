import Link from "next/link";
import styles from "./featuredProperties.module.css";
import React from "react";

const FeaturedProperties = ({ data }) => {
  return (
    <div className={styles.fp}>
      <div className="w-[70%] flex justify-between mx-auto my-[20px]">
        {/* <div className="border border-[#dbdbdb] rounded-[6px] h-[280px] p-[30px] flex flex-col gap-[15px] w-[30%]">
          <img className="w-[46px] " src="/images/home.svg" />
          <h4 className="text-[#333] text-[24px] font-medium">Find a home</h4>
          <p className="text-[#727272]">
            Search listings in 192 countries and 18 languages.
          </p>
        </div>
        <div className="border border-[#dbdbdb] rounded-[6px] h-[280px] p-[30px] flex flex-col gap-[15px] w-[30%]">
          <img className="w-[46px] " src="/images/people.svg" />
          <h4 className="text-[#333] text-[24px] font-medium">
            Discover amazing people
          </h4>
          <p className="text-[#727272]">
            Connect with users using ShareEstate mailbox
          </p>
        </div>
        <div className="border border-[#dbdbdb] rounded-[6px] h-[280px] p-[30px] flex flex-col gap-[15px] w-[30%]">
          <img className="w-[46px] " src="/images/pet.svg" />
          <h4 className="text-[#333] text-[24px] font-medium">Pet</h4>
          <p className="text-[#727272]">
            Use search filters to find places and people that are pet friendly.
          </p>
        </div> */}
      </div>
      <div className={styles.properties}>
        {data?.map((estate) => (
          <Link href={`/estate/${estate._id}`}>
          <div key={estate.id} className={styles.fpItem}>
            <img
              src="https://cf.bstatic.com/xdata/images/hotel/square600/13125860.webp?k=e148feeb802ac3d28d1391dad9e4cf1e12d9231f897d0b53ca067bde8a9d3355&o=&s=1"
              alt=""
              className={styles.fpImg}
            />
            <span className={styles.fpName}>{estate.name}</span>
            <span className={styles.fpCity}>{estate.city}</span>
            <span className={styles.fpPrice}>
              Starting from ${estate.cheapestPrice}
            </span>
            <div className={styles.fpRating}>
              <button>{estate.rating}</button>
              <span>Excellent</span>
            </div>
          </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default FeaturedProperties;
