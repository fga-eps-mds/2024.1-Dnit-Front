import "./styles.css"
import Select from "../Select";
import MultiSelect from "../MultiSelect";
import { useEffect, useState } from "react";
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
    const [listaPropriedade, setListaPropriedade] = useState<FilterOptions[]>([])

    const SelecionarPropriedade = function(propriedade:string){
        
        if(propriedade == "2" && situacoes)
        {
            setListaPropriedade(situacoes)
        }else if(propriedade == "4" && condicaoUfs)
        {
            setListaPropriedade(condicaoUfs)
        }else if(propriedade == "7" && etapasEnsino)
        {
            setListaPropriedade(etapasEnsino)
        }
        
    }

    useEffect(() =>{
        SelecionarPropriedade(propriedadeSelecionada)
        }, [propriedadeSelecionada])

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
                <MultiSelect items={listaPropriedade} value={valor} onChange={setValor} />
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