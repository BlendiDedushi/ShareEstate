import axios from "axios";

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
};

export default Cities;
