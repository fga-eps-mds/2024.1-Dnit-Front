import TrilhaNavegacao from "../../../components/escolasCadastradas/navegacao/TrilhaNavegacao";
import FiltragemTabela from "../../../components/escolasCadastradas/tabela/FiltragemTabela";
import Footer from "../../../components/Rodape";
import Header from "../../../components/escolasCadastradas/CabecalhoListaEscolas";
import TabelaEscola from "../../../components/escolasCadastradas/tabela/TabelaEscola";
import { FiltroProvider } from "../../../context/FiltroTabela";
import "../../../styles/App.css";

export default function EscolasCadastradas() {
  const paginas = [{ nome: "Logout", link: "/login" }];
  return (
    <div className="App">
      <Header />
      <TrilhaNavegacao elementosLi={paginas} escolasCadastradas></TrilhaNavegacao>
      <FiltroProvider>
        <FiltragemTabela />
        <TabelaEscola />
      </FiltroProvider>
      <Footer />
    </div>
  );
}
