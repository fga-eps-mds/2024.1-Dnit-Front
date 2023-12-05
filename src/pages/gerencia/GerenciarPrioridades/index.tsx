import { Collapse, CollapseProps } from "antd";
import Footer from "../../../components/Footer";
import Header from "../../../components/Header";
import TrilhaDeNavegacao from "../../../components/Navegacao";
import "./styles.css"

export default function GerenciarPrioridades() {
    const paginas = [{nome: "Configuração de Pesos do Ranque", link: "/gerenciarPrioridades"}];

    const items: CollapseProps['items'] = [
        {
            key: '1',
            label: 'UPS',
            children: (
                <div className="mycontainer">
                    <div className="br-input input-inline">
                        <label>Fator:</label>
                        <input value="UPS" readOnly></input>
                    </div>
                    <div className="br-input input-inline">
                        <label>Peso:</label>
                        <input maxLength={3}></input>
                    </div>
                    <div className="br-switch icon">
                        <input id="switch-icon" type="checkbox" checked/>
                        <label>Ativo:</label>
                    </div>
                    <div className="d-flex w-100 justify-content-start">
                        <button disabled data-testid="botaoCancelar" className="br-button primary" type="button" onClick={() => {}}>Cancelar</button>
                        <button disabled data-testid="botaoSalvar" className="br-button primary" type="button" onClick={() => {}}>Salvar</button>
                    </div>
                </div>
            )
        },
        {
            key: '2',
            label: "Custo Logístico",
            children: (
                <div className="mycontainer">
                    <div className="br-input input-inline">
                        <label>Fator:</label>
                        <input value="Custo Logístico" readOnly></input>
                    </div>
                    <div className="br-input input-inline">
                        <label>Peso:</label>
                        <input></input>
                    </div>
                    <div className="br-switch icon">
                        <input id="switch-icon" type="checkbox" checked/>
                        <label>Ativo:</label>
                    </div>
                    <div className="d-flex w-100 justify-content-start">
                        <button disabled data-testid="botaoCancelar" className="br-button primary" type="button" onClick={() => {}}>Cancelar</button>
                        <button disabled data-testid="botaoSalvar" className="br-button primary" type="button" onClick={() => {}}>Salvar</button>
                    </div>
                </div>
            )
        },
        {
            key: '3',
            label: "Outros fatores",
            children: (
                <div className="mycontainer">
                    <div className="br-input input-inline">
                        <label>Fator:</label>
                        <input value="Teste"></input>
                    </div>
                    <div className="br-input input-inline">
                        <label>Peso:</label>
                        <input></input>
                    </div>
                    <div className="br-input input-inline">
                        <label>Condição:</label>
                        <input></input>
                    </div>
                    <div className="br-switch icon">
                        <input id="switch-icon" type="checkbox" checked/>
                        <label>Ativo:</label>
                    </div>
                    <div className="d-flex w-100 justify-content-start">
                        <button disabled data-testid="botaoCancelar" className="br-button primary" type="button" onClick={() => {}}>Cancelar</button>
                        <button disabled data-testid="botaoSalvar" className="br-button primary" type="button" onClick={() => {}}>Salvar</button>
                    </div>
                </div>
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