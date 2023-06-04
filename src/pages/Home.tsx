import imgLateral from "../assets/imgLateral.png";
import Header from "../components/Header";
import ResetPassword from "../components/form/ResetPassword";
import "../styles/App.css";


function Home() {
  return (
    <div className="App">
      <Header />
      <div className="Secao">
        <div className="Lateral">
          <img className="imgLateral" src={imgLateral} alt="Logo DNIT" />
        </div>
        <div className="Central">
          <ResetPassword />
        </div>
      </div>
    </div>
  );
}

export default Home;
