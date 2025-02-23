import { CheckCircleOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { useEscolasCadastradas } from "../../../../context/escolasCadastradasErro";
import "../../../../styles/dados.css";

interface EscolasAceitaProps {
  onClickVoltar: () => void;
}

export default function EscolasAceito({ onClickVoltar }: EscolasAceitaProps) {
  const { escolasCadastradas } = useEscolasCadastradas();
  if (escolasCadastradas?.length > 0) {
    return (
      <div className="form3_1">
        <div className="secaoTexto">
          <h2>Inserção de arquivos concluída com sucesso</h2>
          <h2>Quantidade de escolas novas: {escolasCadastradas.length}</h2>
          <CheckCircleOutlined className="botaoCheck" />
        </div>
        <div className="secaoVoltar2">
          <Button className="botaoVoltar" onClick={onClickVoltar}>
            Concluir
          </Button>
        </div>
      </div>
    );
  }
  return (
    <div className="form3_1">
      <div className="secaoTexto">
        <h2>Inserção de arquivos concluída com sucesso</h2>
        <CheckCircleOutlined className="botaoCheck" />
      </div>
      <div className="secaoVoltar">
        <Button className="botaoVoltar" onClick={onClickVoltar}>
          Concluir
        </Button>
      </div>
    </div>
  );
}
