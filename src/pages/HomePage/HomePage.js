import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import Hero from "../../components/Hero/Hero";
import Steps from "../../components/Steps/Steps";
import "./HomePage.scss";

function HomePage() {
  return (
    <>
      <Header />
      <Hero />
      <Steps />
      <hr className="section-divider"></hr>
      <Footer />
    </>
  );
}

export default HomePage;
