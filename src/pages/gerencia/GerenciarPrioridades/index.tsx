import { useState, useEffect } from "react";
import { Collapse, CollapseProps } from "antd";
import Footer from "../../../components/Footer";
import Header from "../../../components/Header";
import TrilhaDeNavegacao from "../../../components/Navegacao";
import "./styles.css"
import FatorForm from "../../../components/FatorForm";
import { fetchCustosLogisticos, fetchPropriedades } from "../../../service/prioridadeApi";
import { CustoLogisticoModel } from "../../../models/prioridade";
import { FilterOptions } from "../GerenciarUsuario";
import { fetchMunicipio, fetchSituacao, fetchUnidadeFederativa } from "../../../service/escolaApi";
import { SituacaoData } from "../../../models/service";

export default function GerenciarPrioridades() {
    const [parametrosCusto, setParametrosCusto] = useState<CustoLogisticoModel[]>([]);
    const paginas = [{nome: "Configuração de Pesos do Ranque", link: "/gerenciarPrioridades"}];
    const [propriedades, setPropriedades] = useState<FilterOptions[]>([]);
    const [ListaUfs, setListaUfs] = useState<FilterOptions[]>([]);
    const [listaMunicipios, setListaMunicipios] = useState<FilterOptions[]>([]);
    const [uf, setUF] = useState('');
    const [SituacaoPesquisada, setSituacaoPesquisada] = useState("");
    const [opcoesSituacao, setOpcoesSituacao] = useState<SituacaoData[]>([]);
    
    const ObterPropriedadesCondicao = () => {
        fetchPropriedades()
            .then(c =>setPropriedades(c))
    }
    
    async function fetchMunicipios(): Promise<void> {
        const listaMunicipios = await fetchMunicipio(Number(uf));
        const novoMunicipio = listaMunicipios.map((u) => ({ id: '' + u.id, rotulo: u.nome }));
        setListaMunicipios(novoMunicipio);
    }

    async function fetchUf(): Promise<void> {
        const listaUfs = await fetchUnidadeFederativa();
        const novaUf = listaUfs.map((u) => ({ id: '' + u.id, rotulo: u.sigla }));
        setListaUfs(novaUf);
    }

    const obterParametrosCusto = () => {
        fetchCustosLogisticos()
            .then(c => setParametrosCusto(c))
    }

    const getSituacao = async () => {
        try {
          const resposta = await fetchSituacao();
          setOpcoesSituacao(resposta);
        } catch (error) {}
    };

    useEffect(() => {
        getSituacao();
    },[]);

    useEffect(() => {
        obterParametrosCusto();
    }, [])

    useEffect(() =>{
        fetchUf();
    },[])

    useEffect(() =>{
        ObterPropriedadesCondicao();
    },[])

    useEffect(() => {
        fetchMunicipios();
      }, [uf]);
    
    const items: CollapseProps['items'] = [
        {
            key: '1',
            label: 'UPS',
            children: (
                <FatorForm nome="UPS" primario></FatorForm>
            )
        },
        {
            key: '2',
            label: "Custo Logístico",
            children: (
                <div className="custo-logistico">
                    <FatorForm nome="Custo Logístico" primario></FatorForm>
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
                                                    <input defaultValue={item.raioMax} className="br-input small"></input>
                                                    </span>
                                                </div> :
                                                <p>Acima de {item.raioMin}</p>
                                            }
                                        </th>
                                        <th><input defaultValue={item.valor} className="br-input small"></input></th>
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
                <FatorForm nome="Teste" condicaoUfs={ListaUfs} propriedades={propriedades} municipios={listaMunicipios} situacoes ={opcoesSituacao.map(s => ({id : s.id.toString(), rotulo: s.descricao}))}></FatorForm>
            )
        },
    ];

      

    return (
        <div className="App">
            <Header/>
            <TrilhaDeNavegacao elementosLi={paginas}/>
            <Collapse className="collapse" items={items} defaultActiveKey={['1', '2', '3']} ghost>
            </Collapse>
            <Footer/>
        </div>
    )
}