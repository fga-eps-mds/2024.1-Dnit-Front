import "../../../../styles/dados.css"
import { Button } from "antd";
import { CheckCircleOutlined } from "@ant-design/icons"

interface RodoviasAceitoProps {
    onClickVoltar: () => void;
}

export default function RodoviasAceito({ onClickVoltar }: RodoviasAceitoProps) {
    return (
        <div className="form3_1">
            <div className="secaoTexto">
                <h2>Inserção de arquivos concluída com sucesso</h2>
                <CheckCircleOutlined className="boaoCheck" />
            </div>
            <div className="secaoVoltar">
                <Button className="botaoVoltar" onClick={onClickVoltar}>
                    Concluir
                </Button>
            </div>
        </div>
    )
}
