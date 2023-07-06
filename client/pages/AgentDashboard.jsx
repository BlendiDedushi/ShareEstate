import Navbar from "@/components/Navbar/navbar";
import AgentDashboard from "@/components/AgentDashboard/agentDashboard";
import Footer from "@/components/Footer/footer";
import axios from "axios";
import MailList from "@/components/MailList/mailList";

export async function getStaticProps() {
  const data = await axios.get("http://localhost:8900/api/estates");
  const jsonData = await data.data;

  return {
    props: {
      data: jsonData,
    },
  };
}

const AgentD = ({ data }) => {
  return (
    <div>
      <Navbar />
      <AgentDashboard data={data}/>
    </div>
  );
};

export default AgentD;
