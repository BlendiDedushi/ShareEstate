import Link from "next/link";
import styles from "./featuredProperties.module.css";
import React from "react";
import { Card, CardContent, Typography, Rating } from "@mui/material";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import StarIcon from "@mui/icons-material/Star";

const FeaturedProperties = ({ data }) => {
  return (
    <div className={styles.fp}>
      <div className="w-[70%] flex justify-between mx-auto my-[20px]">
        {/* Your previous code for the three info cards goes here */}
      </div>
      <div className={styles.properties}>
        {data?.map((estate) => (
          <Link href={`/estate/${estate._id}`} key={estate.id}>
            <Card className={styles.fpItem}>
              <img src={estate.photos[0]} alt="" className={styles.fpImg} />
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
