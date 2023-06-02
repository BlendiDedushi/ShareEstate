import FeaturedProperties from "@/components/FeaturedProperties/featuredProperties";
import Footer from "@/components/Footer/footer";
import MailList from "@/components/MailList/mailList";
import Navbar from "@/components/Navbar/navbar";
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

const AllEstates = ({ data }) => {
  return (
    <div>
      <Navbar />
      <FeaturedProperties data={data} />
      <MailList />
      <Footer />
    </div>
  );
};

export default AllEstates;
