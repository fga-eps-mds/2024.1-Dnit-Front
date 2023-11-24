import React, { useContext, useState } from "react";
import { ListaPaginada, periodos } from '../../../models/planejamento';
import { notification } from "antd";
import { AuthContext, temPermissao } from '../../../provider/Autenticacao';
import { useNavigate, useParams } from "react-router-dom";
import { Permissao } from "../../../models/auth";
import { PlanejamentoMacroModel } from "../../../models/planejamento";
import { fetchPlanejamento } from "../../../service/planejamentoApi";
import Header from "../../../components/Header";
import Footer from "../../../components/Footer";
import TrilhaDeNavegacao from '../../../components/Navegacao/index';
import InputFilter from '../../../components/InputFilter/index';
import Select from "../../../components/Select";
import Table, { CustomTableRow } from "../../../components/Table";
import ReactLoading  from 'react-loading';
import { ButtonComponent } from "../../../components/Button";


interface PlanejamentoArgs {
  nome: string;
  periodo: string;
  qtd: number | null;
  responsavel: string;
}

interface FilterOptions{
  id: string;
  rotulo: string;
  intervalos: string | null;
}

export default function GerenciarAcoes() {
  const paginas = [ { nome: "Gerenciar Ações", link: "/gerenciarAcoes"}];
  const [notificationApi, notificationContextHandler] = notification.useNotification();
  const { temPermissao } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const [pagina, setPagina] = useState<ListaPaginada<any>>({items: [], pagina: 1, itemsPorPagina: 10, total: 0, totalPaginas: 0})  
  const [planejamento, setPlanejamento] = useState<PlanejamentoMacroModel[]>([]);
  
  const [showDeletePlanejamento, setShowDeletePlanejamento] = useState<PlanejamentoArgs | null>(null)

  const [nome, setNome] = useState("");
  const [periodo, setPeriodo] = useState("");
  const [qtd, setQtd] = useState();
  const [responsavel, setResponsavel] = useState("");

  const [listaPeriodo, setListaPeriodo] = useState<FilterOptions[]>([]);
  const [tamanhoPagina, setTamanhoPagina] = useState(pagina.itemsPorPagina);

  const possuiPermissao = {
    excluir: temPermissao(Permissao.UsuarioEditar)
  }

  return  (
  <div className="App">
    {notificationContextHandler}
    <Header/>
    <TrilhaDeNavegacao elementosLi={paginas}/>
    <div className="d-flex flex-column m-5">
      <div className="d-flex justify-content-left align-items-center mr-5">
        <InputFilter onChange={setNome} label="Nome"/>
        <Select items={listaPeriodo} value={periodo} label={"Período:"} onChange={setPeriodo} dropdownStyle={{ marginLeft: "20px", width: "260px" }} filtrarTodos={true}/>
        <InputFilter onChange={setResponsavel} label="Responsável" />
        {possuiPermissao && <ButtonComponent label="Criar Novo Planejamento" buttonStyle="primary" onClick={() => navigate("/")}></ButtonComponent>}
      </div>
      {planejamento.length === 0 && 
      <Table 
        columsTitle={["Nome", "Período", "Quantidade de Ações", "Responsável"]}
        initialItemsPerPage={10}
        title="Planejamentos Macro Cadastrados"
        totalItems={planejamento.length}
      >
        <></><></>
      </Table>
      }
      {loading && <div className="d-flex justify-content-center w-100 m-5"><ReactLoading type="spinningBubbles" color="#000000" /></div>}
    </div>
    <Footer/>
  </div>
  )
}