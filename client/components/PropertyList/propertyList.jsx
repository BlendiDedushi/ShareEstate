import Link from "next/link";
import styles from "./propertyList.module.css";
import React from "react";

const PropertyList = ({ data }) => {
  return (
    <div className={styles.plists}>
      {data?.map((estate) => (
        <Link href={`/estate/${estate.city}`}>
          <div key={estate.city} className={styles.plItem}>
            <img
              src="https://image.cnbcfm.com/api/v1/image/107229932-1682347932426-gettyimages-1401566574-_02a9324.jpeg?v=1683841133&w=929&h=523&vtcrop=y"
              alt=""
            />
            <span className={styles.plCity}>{estate.city}</span>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default PropertyList;
