import "./styles.css"
import Select from "../Select";

interface FatorProps {
    nome: string;
    primario?: boolean;
}

export default function FatorForm ({ nome, primario }: FatorProps) {
    return (
        <div className="fator-form">
            <div className="br-input input-inline">
                <label>Fator:</label>
                <input defaultValue={nome} readOnly={primario}></input>
            </div>
            <div className="br-input input-inline">
                <label>Peso:</label>
                <input></input>
            </div>
            {!primario && <div className="br-input input-inline" style={{width: "700px"}}>
                <label>Condição:</label>
                <Select items={[{id: "1", rotulo: "UF"}, {id: "2", rotulo: "Município"}]} value="" onChange={() => {}} />
                <Select items={[{id: "1", rotulo: "igual a"}, {id: "2", rotulo: "maior que"}]} value="" onChange={() => {}} />
                <Select items={[{id: "1", rotulo: "DF"}, {id: "2", rotulo: "5"}]} value="" onChange={() => {}} />
            </div>}
            <div className="br-switch icon">
                <input id="switch-icon" type="checkbox" defaultChecked={true}/>
                <label>Ativo:</label>
            </div>
            <div className="d-flex w-100 justify-content-start">
                <button disabled data-testid="botaoCancelar" className="br-button primary" type="button" onClick={() => {}}>Cancelar</button>
                <button disabled data-testid="botaoSalvar" className="br-button primary" type="button" onClick={() => {}}>Salvar</button>
            </div>
        </div>
    )
    
}