import Footer from "@/components/Footer/footer";
import Header from "@/components/Header/header";
import MailList from "@/components/MailList/mailList";
import Navbar from "@/components/Navbar/navbar";

const Home = () => {
  return (
    <div>
      <Navbar />
      <Header />
      <MailList />
      <Footer />
    </div>
  );
};

export default Home;
