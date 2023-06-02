import Footer from "@/components/Footer/footer";
import MailList from "@/components/MailList/mailList";
import Navbar from "@/components/Navbar/navbar";
import PropertyList from "@/components/PropertyList/propertyList";
import styles from "./style/index.module.css";
import axios from "axios";

export async function getStaticProps(context) {
  const data = await axios.get("http://localhost:8900/api/estates");
  const jsonData = await data.data;

  return {
    props: {
      data: jsonData,
    },
  };
}

export async function getStaticProps2(context) {
  const data2 = await axios.get("http://localhost:8900/api/estates/city");
  const jsonData = await data2.data;

  return {
    props: {
      data2: jsonData,
    },
  };
}

const ByCity = ({ data }) => {
  return (
    <div>
      <Navbar />
      <div className={styles.homeContainer}>
        <h1 className="text-[32px] text-[#333] font-medium">
          Book Estates in popular cities
        </h1>
        <PropertyList data={data} />
        <MailList />
        <Footer />
      </div>
    </div>
  );
};

export default ByCity;
