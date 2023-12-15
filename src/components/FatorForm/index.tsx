import "./styles.css"
import Select from "../Select";
import MultiSelect from "../MultiSelect";
import { useContext, useEffect, useState } from "react";
import { fetchUnidadeFederativa } from "../../service/escolaApi";
import { FilterOptions } from "../../pages/gerencia/GerenciarUsuario";
import { Condicao, FatorModel, Localizacao, Operador, Rede } from "../../models/prioridade";
import FatorCondicaoSelect from "../FatorCondicaoSelect";
import { fetchPorte } from "../../service/prioridadeApi";
import { AuthContext } from "../../provider/Autenticacao";
import { Permissao } from "../../models/auth";

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
    const { temPermissao } = useContext(AuthContext);

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

    const handleFatorCondicaoChange = (condicao: Condicao, i: number) => {
        let novaListaCondicoes = [...listaCondicoes];
        novaListaCondicoes[i] = condicao;
        setListaCondicoes(novaListaCondicoes);
    }

    const removeCondicao = (index: number) => {
        setListaCondicoes((prevCondicoes) => {
          return prevCondicoes.filter((_, i) => i !== index);
        });
    };

    const handlePeso = (peso: number) => {
        setPesoFator(peso < 0 ? 0 : peso > 100 ? 100 : peso);
    }

    return (
        <div className="fator-form">
            <div className="br-input input-inline">
                <label>Fator:</label>
                <input data-testid={`inputFator${fator.nome}`} defaultValue={nomeFator} readOnly={fator?.primario} onChange={e => setNomeFator(e.target.value)}></input>
            </div>
            <div className="br-input input-inline">
                <label>Peso:</label>
                <input type="number" data-testid={`peso${fator.nome}`} maxLength={3} value={pesoFator} onChange={e => handlePeso(e.target.valueAsNumber)}></input>
            </div>
            {!fator?.primario && <div className="br-input input-inline" style={{width: "800px"}}>
                <label>Condições:</label>
                <div style={{display: "inline-block"}}>
                    {listaCondicoes.map((item, i) => (
                        <div style={{display: "flex"}} key={`${i}-${item.propriedade}-${item.operador}-${item.valores}`} >
                            <FatorCondicaoSelect index={i} condicao={item} propriedades={propriedades} onChange={handleFatorCondicaoChange}></FatorCondicaoSelect>
                            {temPermissao(Permissao.PrioridadesEditar) && 
                            <i data-testid={`remover-condicao-${i}`} style={{alignSelf: "center"}} className="fas fa-minus-circle" aria-hidden="true" 
                            onClick={() => removeCondicao(i)}></i>}
                        </div>
                    ))}
                    { temPermissao(Permissao.PrioridadesEditar) && <i data-testid="adicionar-condicao" className="fas fa-plus-circle" aria-hidden="true" onClick={() => {
                        const novaCondicao: Condicao = {
                            propriedade: 0,
                            operador: 0,
                            valores: []
                        };
                        setListaCondicoes([...listaCondicoes, novaCondicao]);
                    }}></i>}
                </div>
            </div>}
            <div className="br-switch icon" >
                <input id="switch-icon" type="checkbox" checked={ativo} />
                <label data-testid={`ativo-${fator.nome}`} onClick={() => temPermissao(Permissao.PrioridadesEditar) ? setAtivo(!ativo) : {}} onKeyDown={() => {}}>Ativo:</label>
            </div>
            <div className="d-flex w-100 justify-content-start">
                <button disabled={fator?.primario || !fator?.id || !temPermissao(Permissao.PrioridadesExcluir)} data-testid={`botaoExcluir${fator.nome}`} className="br-button primary" onClick={handleDeleteButton} type="button">Excluir</button>
                <button disabled={!temPermissao(Permissao.PrioridadesEditar)} data-testid={`botaoSalvar${fator.nome}`} className="br-button primary" type="button" onClick={handleSaveButton}>Salvar</button>
            </div>
        </div>
    )
    
}