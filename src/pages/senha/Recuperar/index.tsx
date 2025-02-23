import imgLateral from "../../../assets/imgLateral.png";
import Header from "../../../components/Header";
import RecoverPasswordForm from "../../../components/senha/Recuperar";
import "../../../styles/App.css";

function EsqueciSenha() {
  return (
    <div className="App">
      <Header hasLogged={false} />
      <div className="Secao">
        <div className="Lateral">
          <img className="imgLateral" src={imgLateral} alt="Logo DNIT" />
        </div>
        <div className="Central">
          <RecoverPasswordForm />
        </div>
      </div>
    </div>
  );
}

export default EsqueciSenha;