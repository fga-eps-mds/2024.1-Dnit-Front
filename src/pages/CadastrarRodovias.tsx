import Header from "../components/Header";
import RegistrarRodovias from "../components/cadastrarRodovias/CadastrarRodovias";
import Footer from "../components/Footer";
import "../styles/App.css";

function CadastrarRodovias() {
  return (
    <div className="App">
      <Header dashboard />
      <div className="Secao2">
        <RegistrarRodovias />
      </div>
      <Footer />
    </div>
  );
}

export default CadastrarRodovias;
