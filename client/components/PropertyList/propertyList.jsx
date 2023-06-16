import styles from "./propertyList.module.css";
import React, {useEffect, useState} from "react";
import Link from "next/link";
import {useRouter} from "next/router";
import { Card, CardContent, Typography, Rating } from '@mui/material';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import StarIcon from '@mui/icons-material/Star';

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
                <Card className={styles.fpItem}>
                  <img
                    // src={`http://localhost:8900/uploads/${estate.photos[0]}`}
                    src={estate?.photos[0]}
                    alt=""
                    className={styles.fpImg}
                  />
                  <CardContent>
                    <Typography variant="subtitle1" className={styles.fpName}>
                      Name: {estate?.name}
                    </Typography>
                    <Typography variant="subtitle2" className={styles.fpCity}>
                      Location: {estate?.city}
                    </Typography>
                    <Typography variant="body2" className={styles.fpPrice}>
                      Price: {estate?.cheapestPrice}€
                    </Typography>
                    <div className={styles.fpRating}>
                      <Rating
                        name={`rating-${estate?._id}`}
                        value={estate?.rating}
                        max={5}
                        precision={0.5}
                        readOnly
                        emptyIcon={<StarBorderIcon style={{ fontSize: 28 }} />}
                        icon={<StarIcon style={{ fontSize: 28 }} />}
                      />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default PropertyList;
