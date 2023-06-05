import FeaturedProperties from "@/components/FeaturedProperties/featuredProperties";
import Footer from "@/components/Footer/footer";
import MailList from "@/components/MailList/mailList";
import Navbar from "@/components/Navbar/navbar";
import axios from "axios";
import {useRouter} from "next/router";

export async function getStaticProps() {
  const data = await axios.get("http://localhost:8900/api/estates");
  const jsonData = await data.data;

  return {
    props: {
      data: jsonData,
    },
  };
}

const AllEstates = ({ data }) => {
    const router = useRouter();
console.log(router.query);
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
