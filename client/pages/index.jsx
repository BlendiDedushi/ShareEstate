import Featured from "@/components/Featured/featured";
import FeaturedProperties from "@/components/FeaturedProperties/featuredProperties";
import Footer from "@/components/Footer/footer";
import Header from "@/components/Header/header";
import MailList from "@/components/MailList/mailList";
import Navbar from "@/components/Navbar/navbar";
import PropertyList from "@/components/PropertyList/propertyList";
import styles from "./style/index.module.css";
import axios from "axios";

export async function getStaticProps(context) {
  // Fetch data from an external API or database
  const data = await axios.get('http://localhost:8900/api/estates')
  const jsonData = await data.data;
  
  // Pass data to the page via props
  return {
    props: {
      data: jsonData
    }
  }
}

const Home = ({data}) => {
  return (
    <div>
      <Navbar />
      <Header/>
      <div className={styles.homeContainer}>
        <Featured/>
        <h1 className={styles.homeTitle}>Browse by property type</h1>
        <PropertyList/>
        <h1 className={styles.homeTitle}>Homes guests love</h1>
        <FeaturedProperties data={data}/>
        <MailList/>
        <Footer/>
      </div>
    </div>
  );
};

export default Home;