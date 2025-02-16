import imgLateral from "../../../assets/imgLateral.png";
import Header from "../../../components/Header";
import ResetPassword from "../../../components/senha/Redefinir";
import "../../../styles/App.css";

function RecuperarSenha() {
  return (
    <div className="App">
      <Header hasLogged={false} />
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

export default RecuperarSenha;

