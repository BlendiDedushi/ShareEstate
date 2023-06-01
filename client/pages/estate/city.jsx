import axios from "axios";
import Navbar from "@/components/Navbar/navbar";
import Footer from "@/components/Footer/footer";

export async function getStaticPaths() {

  const data = await axios.get('http://localhost:8900/api/estates');
  const estates = await data.data;

  const paths = estates.map((estate) => ({
    params: { city: estate.city },
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
    `http://localhost:8900/api/estates/${params.city}`
  );
  const data = await response.data;

  return {
    props: {
      estate: data,
    },
  };
}

const Cities = ({ estate }) => {
  return (
    <div>
      <Navbar />
      <span>{estate.city}</span>
      <Footer />
    </div>
  );
};

export default Cities;
