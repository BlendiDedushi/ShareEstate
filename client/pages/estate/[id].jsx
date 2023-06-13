import styles from "../style/Hotel.module.css";
import Navbar from "@/components/Navbar/navbar";
import MailList from "@/components/MailList/mailList";
import Footer from "@/components/Footer/footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleArrowLeft,
  faCircleArrowRight,
  faCircleXmark,
  faLocationDot,
} from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import axios from "axios";
import dynamic from "next/dynamic";
import {useCookies} from "react-cookie";
import {useRouter} from "next/router";

// This capacity gets called at fabricate time
export async function getStaticPaths() {
  // Fetch data from an external API or database
  const data = await axios.get("http://localhost:8900/api/estates");
  const estates = await data.data;

  // Get the ways we need to pre-render in light of posts
  const paths = estates.map((estate) => ({
    params: { id: estate._id.toString() }, // Convert id to string
  }));

  return {
    paths: paths,
    fallback: false,
  };
}

export async function getStaticProps(context) {
  const { params } = context;
  console.log(context, "c0on");
  const response = await axios.get(
    `http://localhost:8900/api/estates/${params.id}`
  );
  const data = await response.data;

  return {
    props: {
      estate: data,
    },
  };
}

const Hotel = ({ estate }) => {
  const router = useRouter();
  const [slideNumber, setSlideNumber] = useState(0);
  const [open, setOpen] = useState(false);
  const [cookie] = useCookies(['token']);


  const photos = [
    {
      src: `http://localhost:8900/uploads/${estate.photos[0]}`,
    },
    {
      src: `http://localhost:8900/uploads/${estate.photos[1]}`,
    },
    {
      src: `http://localhost:8900/uploads/${estate.photos[2]}`,
    },
    {
      src: `http://localhost:8900/uploads/${estate.photos[3]}`,
    },
    {
      src: `http://localhost:8900/uploads/${estate.photos[4]}`,
    },
    {
      src: `http://localhost:8900/uploads/${estate.photos[5]}`,
    },
  ];

  console.log(estate);

  const handleReservation = async () => {
    if(cookie.token){
      await axios.post("http://localhost:8900/api/reservation", {
          startDate: "2023-05-16",
          endDate: "2023-05-18",
          estateId: estate?._id,
          paymentMethod: "Cash",
      }, {
        headers: {
          Authorization: `Bearer ${cookie.token}`
        }
      }).then((res) => {
        router.push({pathname:'/PaymentPage', query:{id: res.data.reservation.id}});
      })
    }else{
      await router.push('login');
    }
  }
  

  const handleOpen = (i) => {
    setSlideNumber(i);
    setOpen(true);
  };

  const handleMove = (direction) => {
    let newSlideNumber;

    if (direction === "l") {
      newSlideNumber = slideNumber === 0 ? 5 : slideNumber - 1;
    } else {
      newSlideNumber = slideNumber === 5 ? 0 : slideNumber + 1;
    }

    setSlideNumber(newSlideNumber);
  };

  const Map = dynamic(() => import("components/Map/map"), { loading: () => <p>loading...</p>,  ssr: false });

  return (
    <div>
      <Navbar />
      {/* <Header type="list" /> */}
      <div className={styles.cont}>
        <div className={styles.hotelContainer}>
          {open && (
            <div className={styles.slider}>
              <FontAwesomeIcon
                icon={faCircleXmark}
                className={styles.close}
                onClick={() => setOpen(false)}
              />
              <FontAwesomeIcon
                icon={faCircleArrowLeft}
                className={styles.arrow}
                onClick={() => handleMove("l")}
              />
              <div className={styles.sliderWrapper}>
                <img
                  src={photos[slideNumber].src}
                  alt=""
                  className={styles.sliderImg}
                />
              </div>
              <FontAwesomeIcon
                icon={faCircleArrowRight}
                className={styles.arrow}
                onClick={() => handleMove("r")}
              />
            </div>
          )}
          <div className={styles.hotelWrapper}>
            <h1 className={styles.hotelTitle}>{estate?.name}</h1>
            <div className={styles.hotelAddress}>
              <FontAwesomeIcon icon={faLocationDot} />
              <span>
                {estate.city} {estate.address}
              </span>
            </div>
            <span className={styles.hotelDistance}>
              Excellent location – {estate.distance} from center
            </span>
            <span className={styles.hotelPriceHighlight}>
              Book a stay over $114 at this property and get a free airport taxi
            </span>
            <div className={styles.hotelImages}>
              {photos.map((photo, i) => (
                <div className={styles.hotelImgWrapper} key={i}>
                  <img
                    onClick={() => handleOpen(i)}
                    src={photo.src}
                    alt=""
                    className={styles.hotelImg}
                  />
                </div>
              ))}
            </div>
            <div className={styles.hotelDetails}>
              <div className={styles.hotelDetailsTexts}>
                <h1 className={styles.hotelTitle}>Stay in the heart of City</h1>
                <p className={styles.hotelDesc}>{estate.desc}</p>
              </div>
              <div className={styles.hotelDetailsPrice}>
                <h1>Perfect for a 9-night stay!</h1>
                <h2>
                  <b>{estate.cheapestPrice}€</b>
                </h2>
                <button onClick={handleReservation} className={styles.reserveButton}>Reserve or Book Now!</button>
              </div>
            </div>
          </div>
        </div>
        <Map latitude={estate.latitude} longitude={estate.longitude} />
      </div>
      <MailList />
      <Footer />
    </div>
  );
};

export default Hotel;
