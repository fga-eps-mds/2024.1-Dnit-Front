import "../../../../styles/dados.css";
import Dragdrop from "../UploadPlanilha";
interface ImportarPlanilhaEscolaProps {
  onClickBack: () => void;
  onClickError: () => void;
  onClickAceito: () => void;
  onClickErroJaCadastrada: () => void;
}

export default function ImportarPlanilhaEscolas({
  onClickBack,
  onClickError,
  onClickAceito,
  onClickErroJaCadastrada,
}: ImportarPlanilhaEscolaProps) {
  return (
    <div className="form3">
      <h2>Inserir escolas via planilha</h2>
      <div className="secaoInserir">
        <Dragdrop
          onClickBack={onClickBack}
          onClickError={onClickError}
          onClickAceito={onClickAceito}
          onClickErroJaCadastrada={onClickErroJaCadastrada}
        />
      </div>
    </div>
  );
}
