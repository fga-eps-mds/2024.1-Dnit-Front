import { useState, useEffect } from "react";
import { Collapse, CollapseProps, notification } from "antd";
import Footer from "../../../components/Footer";
import Header from "../../../components/Header";
import TrilhaDeNavegacao from "../../../components/Navegacao";
import "./styles.css"
import FatorForm from "../../../components/FatorForm";
import { adicionarFatorPriorizacao, editarFatorPriorizacao, fetchCustosLogisticos, fetchFatoresPriorizacao, fetchPorte, fetchPropriedades } from "../../../service/prioridadeApi";
import { CustoLogisticoModel } from "../../../models/prioridade";
import { FilterOptions } from "../GerenciarUsuario";
import { fetchEtapasDeEnsino, fetchMunicipio, fetchSituacao, fetchUnidadeFederativa } from "../../../service/escolaApi";
import { SituacaoData } from "../../../models/service";
import { SelectItem } from "../../../components/Select";
import { FatorModel } from "../../../models/prioridade";

export default function GerenciarPrioridades() {
    const [parametrosCusto, setParametrosCusto] = useState<CustoLogisticoModel[]>([]);
    const paginas = [{nome: "Configuração de Pesos do Ranque", link: "/gerenciarPrioridades"}];
    const [propriedades, setPropriedades] = useState<FilterOptions[]>([]);
    const [listaFatores, setListaFatores] = useState<FatorModel[]>([]);
    const [notificationApi, notificationContextHandler] = notification.useNotification();
    const [ListaUfs, setListaUfs] = useState<FilterOptions[]>([]);
    const [listaMunicipios, setListaMunicipios] = useState<FilterOptions[]>([]);
    const [uf, setUF] = useState('');
    const [opcoesSituacao, setOpcoesSituacao] = useState<SituacaoData[]>([]);
    const [etapas, setEtapas] = useState<SelectItem[]>([]);
    const [listaPortesEscolas, setPortesEscolas] = useState<FilterOptions[]>([]);
    const [items, setItems] = useState<CollapseProps['items']>();

    const obterListaFatores = () => {
        fetchFatoresPriorizacao()
            .then((fs) => {
                setListaFatores(fs);
                // setFatorUPS(fs.find(f => f.nome === "UPS" && f.primario));
                // setFatorCusto(fs.find(f => f.nome === "Custo Logistico" && f.primario))
                // setOutrosFatores(fs.filter(f => !f.primario));
            })
            .catch(error => notificationApi.error({ message: 'Falha ao obter fatores de priorização.' + (error?.response?.data || '') }))
    }

    const salvarFator = (fator: FatorModel) => {
        if (fator.nome === "") {
            console.log("Fator deve ter um nome!");
            return;
        }
        
        if (fator.id) {
            console.log(fator)
            editarFatorPriorizacao(fator.id, fator)
                .then((fatorAtualizado) => {
                    notification.success({message: 'O fator foi editado com sucesso!'});
                    setListaFatores(listaFatores.map((f => f.id === fator.id ? fatorAtualizado : f)))
                })
                .catch(error => notificationApi.error({ message: 'Falha ao editar fator.' + (error?.response?.data || '') }));
        }
        else
        {
            console.log(fator)
        }
    }

    const obterPropriedadesCondicao = () => {
        fetchPropriedades()
            .then(c =>setPropriedades(c.filter(f => f.id != "3" && f.id != "7")))
            .catch(error => notificationApi.error({ message: 'Falha na listagem de propriedades de escola. ' + (error?.response?.data || '') }))
    }
    
    async function fetchMunicipios(): Promise<void> {
        const listaMunicipios = await fetchMunicipio(Number(uf));
        const novoMunicipio = listaMunicipios.map((u) => ({ id: '' + u.id, rotulo: u.nome }));
        setListaMunicipios(novoMunicipio);
    }

    async function obterPortesEscolas(): Promise<void> {
        const listaPortesEscolas = await fetchPorte();
        const novoPorte = listaPortesEscolas.map((u) => ({ id: u.id, rotulo: u.descricao }));
        setPortesEscolas(novoPorte);
    }

    async function fetchUf(): Promise<void> {
        const listaUfs = await fetchUnidadeFederativa();
        const novaUf = listaUfs.map((u) => ({ id: '' + u.id, rotulo: u.sigla }));
        setListaUfs(novaUf);
    }

    const obterParametrosCusto = () => {
        fetchCustosLogisticos()
            .then(c => setParametrosCusto(c))
            .catch(error => notificationApi.error({ message: 'Falha na dos parâmetros de custo logístico. ' + (error?.response?.data || '') }))
    }

    const getSituacao = async () => {
        try {
          const resposta = await fetchSituacao();
          setOpcoesSituacao(resposta);
        } catch (error) {}
    };

    useEffect(() => {
        fetchEtapasDeEnsino()
            .then(etapas => {
            etapas.sort((a, b) => b.descricao.localeCompare(a.descricao));
            setEtapas(etapas.map(e => ({ id: e.id.toString(), rotulo: e.descricao })));
            })
            .catch(error => notificationApi.error({ message: 'Falha ao obter etapas de ensino. ' + (error?.response?.data || '') }))
    },[])

    useEffect(() => {
        obterListaFatores();
        getSituacao();
        obterParametrosCusto();
        obterPropriedadesCondicao();
        fetchUf();
        obterPortesEscolas();
    }, [])


    useEffect(() => {
        fetchMunicipios();
    }, [uf]);


    const fatorUps = listaFatores.find(f => f.nome === "UPS" && f.primario);
    const fatorCustoLogistico = listaFatores.find(f => f.nome === "Custo Logistico" && f.primario);

    useEffect(() => {
        setItems([
            {
                key: '1',
                label: 'UPS',
                children: (
                    fatorUps && <FatorForm onSaveFator={salvarFator} fator={fatorUps}></FatorForm>
                )
            },
            {
                key: '2',
                label: "Custo Logístico",
                children: (
                    fatorCustoLogistico &&
                    <div className="custo-logistico">
                        <FatorForm fator={fatorCustoLogistico} onSaveFator={salvarFator}></FatorForm>
                        <div className="custo-table">
                            <p>Parâmetros do Custo Logístico</p>
                            <table>
                                <thead>
                                    <tr>
                                        <th>Custo</th>
                                        <th>Raio</th>
                                        <th>Valor</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {parametrosCusto.map((item) => (
                                        <tr key={item.custo}>
                                            <th>{"$".repeat(item.custo)}</th>
                                            <th>
                                                {
                                                    item.raioMax ?
                                                    <div>
                                                        <span>{item.raioMin} - 
                                                        <input type="number" defaultValue={item.raioMax} className="br-input small"></input>
                                                        </span>
                                                    </div> :
                                                    <p>Acima de {item.raioMin}</p>
                                                }
                                            </th>
                                            <th><input type="number" defaultValue={item.valor} className="br-input small"></input></th>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )
            },
            {
                key: '3',
                label: "Outros fatores",
                children: (
                    <div>
                        <button data-testid="botaoAdicionarFator" className="br-button primary" type="button" onClick={() => {}}>Novo Fator</button>
                        {listaFatores.filter(f => !f.primario).map((item) => (
                            <FatorForm key={item.id} fator={item} condicaoUfs={ListaUfs} 
                            propriedades={propriedades} municipios={listaMunicipios} 
                            situacoes ={opcoesSituacao.map(s => ({id : s.id.toString(), rotulo: s.descricao}))} 
                            etapasEnsino = {etapas} porte = {listaPortesEscolas} onSaveFator={salvarFator} />
                        ))}
                    </div>
                    //<FatorForm nome="Teste" condicaoUfs={ListaUfs} propriedades={propriedades} municipios={listaMunicipios} situacoes ={opcoesSituacao.map(s => ({id : s.id.toString(), rotulo: s.descricao}))} etapasEnsino = {etapas} porte = {listaPortesEscolas}></FatorForm>
                )
            },
        ]);
    }, [ListaUfs, propriedades, listaMunicipios, opcoesSituacao, etapas, listaPortesEscolas, items, listaFatores]);

    return (
        <div className="App">
            {notificationContextHandler}
            <Header/>
            <TrilhaDeNavegacao elementosLi={paginas}/>
            {items &&
                <Collapse className="collapse" items={items} defaultActiveKey={['1', '2', '3']} ghost></Collapse>
            }
            <Footer/>
        </div>
    )
}