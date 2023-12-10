import "./styles.css"
import Select from "../Select";
import MultiSelect from "../MultiSelect";
import { useEffect, useState } from "react";
import { fetchUnidadeFederativa } from "../../service/escolaApi";
import { FilterOptions } from "../../pages/gerencia/GerenciarUsuario";
import { Condicao, Localizacao, Operador, Rede } from "../../models/prioridade";
import FatorCondicaoSelect from "../FatorCondicaoSelect";

interface FatorProps {
    nome: string;
    primario?: boolean;
    condicaoUfs?: FilterOptions[];
    propriedades?: FilterOptions[];
    municipios?: FilterOptions[];
    situacoes?: FilterOptions[];
    etapasEnsino?: FilterOptions[];
    porte?: FilterOptions[];
}


export default function FatorForm ({ nome, primario, condicaoUfs, propriedades, municipios, situacoes, etapasEnsino, porte }: FatorProps) {
    
    const [listaCondicoes, setListaCondicoes] = useState<Condicao[]>([])
    const [condicaoAtual, setCondicaoAtual] = useState<Condicao>()

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
                {listaCondicoes.map((item) => (
                    <FatorCondicaoSelect condicaoUfs={condicaoUfs} propriedades={propriedades} municipios={municipios} situacoes={situacoes} etapasEnsino={etapasEnsino} porte={porte} onChange={() => {}}></FatorCondicaoSelect>
                ))}
                <FatorCondicaoSelect condicaoUfs={condicaoUfs} propriedades={propriedades} municipios={municipios} situacoes={situacoes} etapasEnsino={etapasEnsino} porte={porte} onChange={setCondicaoAtual}></FatorCondicaoSelect>
                <i className="fas fa-plus-circle" aria-hidden="true" onClick={() => {
                    if(condicaoAtual)setListaCondicoes([...listaCondicoes,condicaoAtual])
                }}></i>
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