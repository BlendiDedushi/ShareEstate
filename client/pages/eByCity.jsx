import { useEffect, useState } from "react";
import axios from "axios";
import Footer from "@/components/Footer/footer";
import MailList from "@/components/MailList/mailList";
import Navbar from "@/components/Navbar/navbar";
import PropertyList from "@/components/PropertyList/propertyList";
import styles from "./style/index.module.css";

export async function getStaticProps(context) {
  const data = await axios.get("http://localhost:8900/api/estates");
  const jsonData = await data.data;

  return {
    props: {
      data: jsonData,
    },
  };
}

const ByCity = ({ data }) => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <div>
      <Navbar />
      <div className={styles.homeContainer}>
        <h1
          className={`${styles.homeTitle} text-4xl text-gray-800 font-medium`}
        >
          Book Estates in Popular Cities
        </h1>
        {isLoaded ? (
          <PropertyList data={data} />
        ) : (
          <div className="animate-pulse">
            <div className="h-12 bg-gray-200 rounded"></div>
            <div className="h-12 bg-gray-200 rounded"></div>
            <div className="h-12 bg-gray-200 rounded"></div>
          </div>
        )}
        <MailList />
        <Footer />
      </div>
    </div>
  );
};

export default ByCity;
