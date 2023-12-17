import { useEffect, useState } from "react";
import { FilterOptions } from "../../pages/gerencia/GerenciarUsuario";
import MultiSelect from "../MultiSelect";
import Select, { SelectItem } from "../Select";
import { Condicao, Localizacao, Operador, Rede } from "../../models/prioridade";
import { fetchPorte } from "../../service/prioridadeApi";
import { fetchSituacao, fetchUnidadeFederativa } from "../../service/escolaApi";

interface CondicaoProps
{
    readonly onChange: (condicao:Condicao, i: number) => void;
    readonly index: number;
    readonly condicao: Condicao;
    readonly condicaoUfs?: FilterOptions[];
    readonly propriedades?: FilterOptions[];
    readonly municipios?: FilterOptions[];
    readonly situacoes?: FilterOptions[];
    readonly etapasEnsino?: FilterOptions[];
    readonly porte?: FilterOptions[];
}

const SelecionarOperadores = (propriedade: string) => {
    if (propriedade == "6") {
        return [
            { id: Operador.maior, rotulo: "maior ou igual a"},
            { id: Operador.menor, rotulo: "menor ou igual a"}
        ]
    }
    else {
        return [
            { id: Operador.igual, rotulo: "igual a"}
        ]
    }
}

async function obterPortesEscolas(): Promise<FilterOptions[]> {
    const listaPortesEscolas = await fetchPorte();
    const novoPorte = listaPortesEscolas.map((u) => ({ id: u.id, rotulo: u.descricao }));
    return novoPorte;
}

async function fetchUf(): Promise<FilterOptions[]> {
    const listaUfs = await fetchUnidadeFederativa();
    const novaUf = listaUfs.map((u) => ({ id: '' + u.id, rotulo: u.sigla }));
    return novaUf;
}

const getSituacao = async (): Promise<FilterOptions[]> => {
    const resposta = await fetchSituacao();
    const r = resposta.map((item) => {
        return { id: String(item.id), rotulo: item.descricao }
    })
    return r;
};

const getLocalizacao = async (): Promise<FilterOptions[]> => {
    return [
        { id: Localizacao.Rural, rotulo: "Rural" },
        { id: Localizacao.Urbana, rotulo: "Urbana" }
    ]
}

const getRede = async (): Promise<FilterOptions[]> => {
    return [
        { id: Rede.Estadual, rotulo: "Estadual" },
        { id: Rede.Municipal, rotulo: "Municipal" },
        { id: Rede.Privada, rotulo:"Privada" }
    ]
}

const getPropriedadeCallback = (propriedade: String) => {
    if (propriedade == "1") return obterPortesEscolas;
    if (propriedade == "2") return getSituacao;
    if (propriedade == "4") return fetchUf;
    if (propriedade == "5") return getLocalizacao;
    if (propriedade == "8") return getRede;
    else return async () => [];
}

export default function FatorCondicaoSelect({index, condicao, propriedades, onChange}:CondicaoProps) {

    const opcoesOperadores = SelecionarOperadores(String(condicao.propriedade));

    const [propriedadeSelecionada, setPropriedadeSelecionada] = useState<string>(String(condicao.propriedade));
    const [operadorSelecionado, setOperadorSelecionado] = useState<string>(
        opcoesOperadores.map(o => o.id.toString()).find(e => e === String(condicao.operador)) 
        ?? opcoesOperadores[0].id);
    const [valores, setValores] = useState<FilterOptions[]>([]);
    const [valoresSelecionados, setValoresSelecionados] = useState<string[]>(condicao.valores);

    const callOnChange = () => {
        onChange({
            propriedade: Number(propriedadeSelecionada), 
            operador: Number(operadorSelecionado), 
            valores: valoresSelecionados
        }, index);
    }

    useEffect(() => {
        const callback = getPropriedadeCallback(propriedadeSelecionada);
        callback().then(options => {
            setValores(options);
        })
    }, [propriedadeSelecionada]);

    useEffect(() => {
        if (propriedadeSelecionada && operadorSelecionado && valoresSelecionados.length > 0)
            callOnChange();
    }, [propriedadeSelecionada, operadorSelecionado])

    const selectPropriedades: SelectItem[] = propriedades?.map((item) => {
        return {
            id: String(item.id),
            rotulo: item.rotulo
        }
    }) ?? []

    return (
        <div style={{display: "flex"}}>
            <Select items={selectPropriedades} dropdownStyle={{width: "194px", marginLeft: "20px"}} value={propriedadeSelecionada} onChange={(c) => {
                setValoresSelecionados([]);
                setPropriedadeSelecionada(c);
            }} />
            <Select items={opcoesOperadores} dropdownStyle={{width: "194px", marginLeft: "20px"}} value={operadorSelecionado} onChange={(e) => setOperadorSelecionado(e)} />
            {propriedadeSelecionada != "6" ? 
                <MultiSelect items={valores} value={valoresSelecionados} onDropDownClose={callOnChange}
                    dropdownStyle={{width: "194px", marginLeft: "20px"}} onChange={e => setValoresSelecionados(e)} /> :
                <input className="br-input large" id="alunos-input" type="number" 
                    value={valoresSelecionados[0]} onChange={(e) => setValoresSelecionados([e.target.value])} 
                    onBlur={callOnChange}/>
            }
        </div>          
    )
}