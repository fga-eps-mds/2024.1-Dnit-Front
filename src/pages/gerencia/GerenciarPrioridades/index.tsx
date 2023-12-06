import { useState, useEffect } from "react";
import { Collapse, CollapseProps } from "antd";
import Footer from "../../../components/Footer";
import Header from "../../../components/Header";
import TrilhaDeNavegacao from "../../../components/Navegacao";
import "./styles.css"
import FatorForm from "../../../components/FatorForm";
import { fetchCustosLogisticos } from "../../../service/prioridadeApi";
import { CustoLogisticoModel } from "../../../models/prioridade";

export default function GerenciarPrioridades() {
    const [parametrosCusto, setParametrosCusto] = useState<CustoLogisticoModel[]>([]);
    const paginas = [{nome: "Configuração de Pesos do Ranque", link: "/gerenciarPrioridades"}];
    
    const obterParametrosCusto = () => {
        fetchCustosLogisticos()
            .then(c => setParametrosCusto(c))
    }
    
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
                <FatorForm nome="Teste"></FatorForm>
            )
        },
    ];

    useEffect(() => {
        obterParametrosCusto();
    }, [])    

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