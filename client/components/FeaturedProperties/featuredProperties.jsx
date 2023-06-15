import Link from "next/link";
import styles from "./featuredProperties.module.css";
import React from "react";
import {  Card, CardContent, Typography, Rating } from '@mui/material';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import StarIcon from '@mui/icons-material/Star';

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
        <Link href={`/estate/${estate._id}`} key={estate.id}>
          <Card className={styles.fpItem}>
            <img 
            // src={`http://localhost:8900/uploads/${estate.photos[0]}`}
            src={`${estate.photos[0]}`}
             alt="" className={styles.fpImg} />
            <CardContent>
              <Typography variant="subtitle1" className={styles.fpName}>
                {estate.name}
              </Typography>
              <Typography variant="subtitle2" className={styles.fpCity}>
                {estate.city}
              </Typography>
              <Typography variant="body2" className={styles.fpPrice}>
                Starting from {estate.cheapestPrice}€
              </Typography>
              <div className={styles.fpRating}>
                <Rating
                  name={`rating-${estate.id}`}
                  value={estate.rating}
                  max={5}
                  precision={0.5}
                  readOnly
                  emptyIcon={<StarBorderIcon style={{ fontSize: 25 }} />}
                  icon={<StarIcon style={{ fontSize: 25 }} />}
                />
              </div>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
    </div>
  );
};

export default FeaturedProperties;
