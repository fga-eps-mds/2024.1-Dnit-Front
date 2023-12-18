import { useState, useEffect, useContext } from "react";
import { Collapse, CollapseProps, notification } from "antd";
import Footer from "../../../components/Footer";
import Header from "../../../components/Header";
import TrilhaDeNavegacao from "../../../components/Navegacao";
import "./styles.css"
import FatorForm from "../../../components/FatorForm";
import { adicionarFatorPriorizacao, deletarFatorPriorizacao, editarCustosLogisticos, editarFatorPriorizacao, fetchCustosLogisticos, fetchFatoresPriorizacao, fetchPorte, fetchPropriedades } from "../../../service/prioridadeApi";
import { CustoLogisticoModel } from "../../../models/prioridade";
import { FilterOptions } from "../GerenciarUsuario";
import { FatorModel } from "../../../models/prioridade";
import { AuthContext } from "../../../provider/Autenticacao";
import { Permissao } from "../../../models/auth";
import { useNavigate } from "react-router-dom";

export default function GerenciarPrioridades() {
    const [parametrosCusto, setParametrosCusto] = useState<CustoLogisticoModel[]>([]);
    const paginas = [{nome: "Configuração de Pesos do Ranque", link: "/gerenciarPrioridades"}];
    const [propriedades, setPropriedades] = useState<FilterOptions[]>([]);
    const [listaFatores, setListaFatores] = useState<FatorModel[]>([]);
    const [notificationApi, notificationContextHandler] = notification.useNotification();
    const { temPermissao } = useContext(AuthContext);
    const navigate = useNavigate();
    
    const obterListaFatores = () => {
        fetchFatoresPriorizacao()
            .then(setListaFatores)
            .catch(error => notificationApi.error({ message: 'Falha ao obter fatores de priorização.' + (error?.response?.data || '') }))
    }

    const onAddFator = () => {
        const fatorVazio:FatorModel = 
        {
            nome: "",
            peso: 0,
            ativo: false,
            primario: false,
            fatorCondicoes: []
        };
        setListaFatores([fatorVazio, ...listaFatores]);
    }

    const salvarFator = (fator: FatorModel) => {
        if (fator.nome === "") {
            notification.error({message: "Por favor, dê um nome ao fator."});
            return;
        }

        if (fator.fatorCondicoes.some(c => c.propriedade === 0 || c.operador === 0 || c.valores.length === 0)) {
            notification.error({message: "Por favor, não deixe condições vazias."});
            return;
        }

        if (fator.id) {
            editarFatorPriorizacao(fator.id, fator)
                .then((fatorAtualizado) => {
                    notification.success({message: `O fator ${fator.nome} foi editado com sucesso!`});
                    setListaFatores(listaFatores.map((f => f.id === fator.id ? fatorAtualizado : f)))
                })
                .catch(error => notificationApi.error({ message: 'Falha ao editar fator.' + (error?.response?.data || '') }));
        }
        else
        {
            adicionarFatorPriorizacao(fator)
                .then((fatorAdicionado) => {
                    notification.success({message: `O fator ${fator.nome} foi adicionado com sucesso!`});
                    setListaFatores(listaFatores.map((f => f.id === fator.id ? fatorAdicionado : f)))
                })
        }
    }

    const excluirFator = (fator: FatorModel) => {
        if (fator.id)
            deletarFatorPriorizacao(fator.id)
                .then(() => {
                    notification.success({message: `O fator ${fator.nome} foi excluído com sucesso!`});
                    setListaFatores(listaFatores.filter(f => f.id !== fator.id))
                })
                .catch(error => notificationApi.error({ message: 'Falha ao deletar o fator.' + (error?.response?.data || '') }));
    }

    const handleParametroCustoChange = (item: CustoLogisticoModel, parametro: string, novoValor: number) => {
        let next = parametrosCusto.find(p => p.custo === item.custo + 1);
        if (parametro === "raioMax") {
            item.raioMax = novoValor;
            if (next) next.raioMin = novoValor;
        }
        else if (parametro === "valor") {
            item.valor = novoValor;
        }   
        if (novoValor > 0)
            setParametrosCusto(parametrosCusto.map(p => p.custo === item.custo ? item : p.custo === next?.custo ? next : p))
    }

    const salvarParametrosCustoLogistico = () => {
        editarCustosLogisticos(parametrosCusto)
            .then(() => {
                notification.success({message: 'Os parâmetros de custo logístico foram alterados com sucesso!'});
            })
            .catch(error => notificationApi.error({ message: 'Falha ao editar custos logísticos.' + (error?.response?.data || '') }));
    }

    const obterPropriedadesCondicao = () => {
        fetchPropriedades()
            .then(c =>setPropriedades(c.filter(f => f.id != "3" && f.id != "7")))
            .catch(error => notificationApi.error({ message: 'Falha na listagem de propriedades de escola. ' + (error?.response?.data || '') }))
    }

    const obterParametrosCusto = () => {
        fetchCustosLogisticos()
            .then(c => setParametrosCusto(c))
            .catch(error => notificationApi.error({ message: 'Falha na dos parâmetros de custo logístico. ' + (error?.response?.data || '') }))
    }
    
    useEffect(() => {
        if (!temPermissao(Permissao.PrioridadesVisualizar)) {
            navigate("/dashboard");
        }
        obterListaFatores();
        obterParametrosCusto();
        obterPropriedadesCondicao();
    }, [])


    const fatorUps = listaFatores.find(f => f.nome === "UPS" && f.primario);
    const fatorCustoLogistico = listaFatores.find(f => f.nome === "Custo Logistico" && f.primario);

    const items: CollapseProps['items'] =
    [
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
                        <FatorForm fator={fatorCustoLogistico} onSaveFator={(f) => {
                            salvarFator(f);
                            salvarParametrosCustoLogistico();
                        }
                        }></FatorForm>
                        <div className="custo-table">
                            <table>
                                <caption style={{fontWeight: "bold"}}>Parâmetros do Custo Logístico</caption>
                                <thead>
                                    <tr>
                                        <th>Custo</th>
                                        <th>Raio(km)</th>
                                        <th>Valor</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {parametrosCusto.map((item) => (
                                        <tr key={item.custo}>
                                            <td>{"$".repeat(item.custo)}</td>
                                            <td>
                                                {
                                                    item.raioMax !== null ?
                                                    <div>
                                                        <span>{item.raioMin} - 
                                                        <input data-testid={`raioParam${item.custo}`} type="number" id="raioMax" defaultValue={item.raioMax} className="br-input small" 
                                                        onChange={e => handleParametroCustoChange(item, e.target.id, e.target.valueAsNumber)}></input>
                                                        </span>
                                                    </div> :
                                                    <span>Acima de {item.raioMin}</span>
                                                }
                                            </td>
                                            <td><input data-testid={`valorParam${item.custo}`} type="number" id="valor" defaultValue={item.valor} className="br-input small"></input></td>
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
                    <button disabled={!temPermissao(Permissao.PrioridadesEditar)} data-testid="botaoAdicionarFator" className="br-button primary" type="button" onClick={onAddFator}>Novo Fator</button>
                    {listaFatores.filter(f => !f.primario).map((item) => (
                        <FatorForm key={item.id} fator={item} propriedades={propriedades} 
                        onSaveFator={salvarFator} onDeleteFator={excluirFator}/>
                    ))}
                </div>
                )
            },
        ];

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