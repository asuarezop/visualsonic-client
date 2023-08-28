import Header from "../../components/Header/Header";
import Hero from "../../components/Hero/Hero";
import Visualizer from "../../components/Visualizer/Visualizer";
import "./HomePage.scss";

function HomePage() {
  // axios
  //   .put(`http://localhost:8080/wavplayer/${id}`)
  //   .then((response) => {
  //     console.log("Inventory updated:", response.data);
  //   })
  //   .catch((error) => {
  //     console.log("Got error updating existing inventory item", error);
  //   });
  return (
    <>
      <Header />
      <Hero />
      <Visualizer  />
    </>
  );
}

export default HomePage;
