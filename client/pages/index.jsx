import Footer from "@/components/Footer/footer";
import Header from "@/components/Header/header";
import MailList from "@/components/MailList/mailList";
import Navbar from "@/components/Navbar/navbar";
import {useCookies} from "react-cookie";
import {useEffect} from "react";
import {useRouter} from "next/router";

const Home = () => {
    const [cookie, setCookie] = useCookies(['token']);
    const router = useRouter();
    const {token} = router.query

    useEffect(() => {
        if(token){
            setCookie('token', token);
        }
    },[token]);

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
