import "./styles.css"
import Select from "../Select";
import MultiSelect from "../MultiSelect";
import { useEffect, useState } from "react";
import { fetchUnidadeFederativa } from "../../service/escolaApi";
import { FilterOptions } from "../../pages/gerencia/GerenciarUsuario";
import { Condicao, FatorModel, Localizacao, Operador, Rede } from "../../models/prioridade";
import FatorCondicaoSelect from "../FatorCondicaoSelect";

interface FatorProps {
    fator: FatorModel;
    onSaveFator: (fator: FatorModel) => void;
    onDeleteFator?: (fator: FatorModel) => void;
    condicaoUfs?: FilterOptions[];
    propriedades?: FilterOptions[];
    municipios?: FilterOptions[];
    situacoes?: FilterOptions[];
    etapasEnsino?: FilterOptions[];
    porte?: FilterOptions[];
}

export default function FatorForm ({ fator, onSaveFator, onDeleteFator, condicaoUfs, propriedades, municipios, situacoes, etapasEnsino, porte }: FatorProps) { 
    const [nomeFator, setNomeFator] = useState(fator?.nome ?? "");
    const [pesoFator, setPesoFator] = useState(fator?.peso ?? 0);
    const [ativo, setAtivo] = useState(fator?.ativo ?? true);
    const [listaCondicoes, setListaCondicoes] = useState<Condicao[]>(fator?.fatorCondicoes ?? []);
    const [condicaoAtual, setCondicaoAtual] = useState<Condicao>();
    
    // const fatorAtualizado: FatorModel = 
    // {
    //     id: fator?.id,
    //     nome: fator?.nome ?? "",
    //     peso: fator?.peso ?? 0,
    //     ativo: fator?.ativo ?? true,
    //     primario: fator?.primario ?? false,
    //     fatorCondicoes: fator?.fatorCondicoes ?? [],
    // };
    
    const handleSaveButton = () => {
        const fatorAtualizado: FatorModel = 
        {
            id: fator?.id,
            nome: nomeFator,
            peso: pesoFator,
            ativo: ativo,
            primario: fator?.primario ?? false,
            fatorCondicoes: listaCondicoes
        }
        onSaveFator(fatorAtualizado);
    }

    const handleDeleteButton = () => {
        const fatorAtualizado: FatorModel = 
        {
            id: fator?.id,
            nome: nomeFator,
            peso: pesoFator,
            ativo: ativo,
            primario: fator?.primario ?? false,
            fatorCondicoes: listaCondicoes
        }
        onDeleteFator?.(fatorAtualizado);
    }
    
    return (
        <div className="fator-form">
            <div className="br-input input-inline">
                <label>Fator:</label>
                <input defaultValue={nomeFator} readOnly={fator?.primario} onChange={e => setNomeFator(e.target.value)}></input>
            </div>
            <div className="br-input input-inline">
                <label>Peso:</label>
                <input type="number" defaultValue={pesoFator} onChange={e => setPesoFator(e.target.valueAsNumber)}></input>
            </div>
            {!fator?.primario && <div className="br-input input-inline" style={{width: "700px"}}>
                <label>Condições:</label>
                <div style={{display: "inline-block"}}>
                    {listaCondicoes.map((item) => (
                    <FatorCondicaoSelect condicaoUfs={condicaoUfs} propriedades={propriedades} municipios={municipios} situacoes={situacoes} etapasEnsino={etapasEnsino} porte={porte} onChange={() => {}}></FatorCondicaoSelect>
                    ))}
                    <FatorCondicaoSelect condicaoUfs={condicaoUfs} propriedades={propriedades} municipios={municipios} situacoes={situacoes} etapasEnsino={etapasEnsino} porte={porte} onChange={setCondicaoAtual}></FatorCondicaoSelect>
                    <i className="fas fa-plus-circle" aria-hidden="true" onClick={() => {
                        if(condicaoAtual) setListaCondicoes([...listaCondicoes, condicaoAtual])
                    }}></i>
                </div>
            </div>}
            <div className="br-switch icon" onClick={() => setAtivo(!ativo)}>
                <input id="switch-icon" type="checkbox" checked={ativo} />
                <label>Ativo:</label>
            </div>
            <div className="d-flex w-100 justify-content-start">
                <button disabled={fator?.primario || !fator?.id} data-testid="botaoExcluir" className="br-button primary" onClick={handleDeleteButton} type="button">Excluir</button>
                <button data-testid="botaoSalvar" className="br-button primary" type="button" onClick={handleSaveButton}>Salvar</button>
            </div>
        </div>
    )
    
}