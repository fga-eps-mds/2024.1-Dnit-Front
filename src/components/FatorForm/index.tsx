import "./styles.css"
import Select from "../Select";
import MultiSelect from "../MultiSelect";
import { useState } from "react";
import { fetchUnidadeFederativa } from "../../service/escolaApi";
import { FilterOptions } from "../../pages/gerencia/GerenciarUsuario";

interface FatorProps {
    nome: string;
    primario?: boolean;
    condicaoUfs?: FilterOptions[];
    propriedades?: FilterOptions[];
    municipios?: FilterOptions[];
    situacoes?: FilterOptions[];
    etapasEnsino?: FilterOptions[];
}


export default function FatorForm ({ nome, primario, condicaoUfs, propriedades, municipios, situacoes, etapasEnsino }: FatorProps) {
    const [valor, setValor] = useState<string[]>([]);
    const [propriedadeSelecionada, setPropriedadeSelecionada] = useState<string>('');

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
                <Select items={propriedades ? propriedades : []} value= {propriedadeSelecionada} onChange={setPropriedadeSelecionada} />
                <Select items={[{id: "1", rotulo: "igual a"}, {id: "2", rotulo: "maior que"}]} value="" onChange={() => {}} />
                {/* <MultiSelect items={(condicaoUfs ? condicaoUfs : [])} value={valor} onChange={setValor} /> */}
                {/* <MultiSelect items={(municipios ? municipios : [])} value={valor} onChange={setValor} /> */}
                {/* <MultiSelect items={(situacoes ? situacoes : [])} value={valor} onChange={setValor} /> */}
                <MultiSelect items={(etapasEnsino ? etapasEnsino : [])} value={valor} onChange={setValor} />
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