import Featured from "@/components/Featured/featured";
import FeaturedProperties from "@/components/FeaturedProperties/featuredProperties";
import Footer from "@/components/Footer/footer";
import Header from "@/components/Header/header";
import MailList from "@/components/MailList/mailList";
import Navbar from "@/components/Navbar/navbar";
import PropertyList from "@/components/PropertyList/propertyList";
import styles from "./style/index.module.css";

const Home = () => {
  return (
    <div>
      <Navbar />
      <Header/>
      <div className={styles.homeContainer}>
        <Featured/>
        <h1 className={styles.homeTitle}>Browse by property type</h1>
        <PropertyList/>
        <h1 className={styles.homeTitle}>Homes guests love</h1>
        <FeaturedProperties/>
        <MailList/>
        <Footer/>
      </div>
    </div>
  );
};

export default Home;