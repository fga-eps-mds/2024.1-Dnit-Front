import { Collapse, CollapseProps } from "antd";
import Footer from "../../../components/Footer";
import Header from "../../../components/Header";
import TrilhaDeNavegacao from "../../../components/Navegacao";
import "./styles.css"
import FatorForm from "../../../components/FatorForm";

export default function GerenciarPrioridades() {
    const paginas = [{nome: "Configuração de Pesos do Ranque", link: "/gerenciarPrioridades"}];

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
                                <tr>
                                    <th>$</th>
                                    <th>0 - <input className="br-input small"></input></th>
                                    <th>50</th>
                                </tr>
                                <tr>
                                    <th>$$</th>
                                    <th><input className="br-input small"></input> - <input className="br-input small"></input></th>
                                    <th>50</th>
                                </tr>
                                <tr>
                                    <th>$$$</th>
                                    <th><input className="br-input small"></input> - <input className="br-input small"></input></th>
                                    <th>50</th>
                                </tr>
                                <tr>
                                    <th>$$$$</th>
                                    <th>Acima de XXX</th>
                                    <th>50</th>
                                </tr>
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