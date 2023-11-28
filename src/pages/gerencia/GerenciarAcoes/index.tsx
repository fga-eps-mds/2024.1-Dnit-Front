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

interface PlanejamentoData {
  id?: string;
}

const dados: PlanejamentoArgs[] = [{
  nome: 'PLANEJAMENTO CENTRO OESTE', 
  periodo: '10 JAN - 30 OUT',
  qtd: 1000,
  responsavel: "Wellington Guimarães"
},
{
  nome: 'PLANEJAMENTO NORTE', 
  periodo: '10 ABR - 20 JUL',
  qtd: 2400,
  responsavel: "Ronaldo Marques"
},
{
  nome: 'PLANEJAMENTO SUL', 
  periodo: '15 MAR - 7 NOV',
  qtd:  489,
  responsavel: "Julio Pellizon"
},
{
  nome: 'PLANEJAMENTO NORDESTE', 
  periodo: '10 FEV - 27 JUN',
  qtd: 2900,
  responsavel: "Nayara Azevedo"
},
{
  nome: 'PLANEJAMENTO SUDESTE', 
  periodo: '10 AGO - 12 DEZ',
  qtd: 500,
  responsavel: "Julieta Vieira"
}]

export default function GerenciarAcoes() {
  const paginas = [ { nome: "Gerenciar Ações", link: "/gerenciarAcoes"}];
  const [notificationApi, notificationContextHandler] = notification.useNotification();
  const { temPermissao } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const [pagina, setPagina] = useState<ListaPaginada<any>>({items: [], pagina: 1, itemsPorPagina: 10, total: 0, totalPaginas: 0})  
  const [planejamento, setPlanejamento] = useState<PlanejamentoMacroModel[]>([]);
  
  const planejamentos = dados;
  const colunas = ['Nome', 'Período', 'Quantidade de Ações', 'Responsável']
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
        
        <div style={{ margin: "20px" }}>
          <InputFilter onChange={setNome} label="Nome"/>
        </div>
        <Select items={listaPeriodo} value={periodo} label={"Período:"} onChange={setPeriodo} dropdownStyle={{ marginLeft: "20px", width: "260px" }} filtrarTodos={true}/>
        <InputFilter onChange={setResponsavel} label="Responsável" />

        {possuiPermissao &&
            <div style={{ position: 'absolute', right: '5%' }}>
              <ButtonComponent
                  label="Criar Novo Planejamento"
                  buttonStyle="primary"
                  onClick={() => navigate("/")}
              />
            </div>
        }
      </div>
      <Table
        columsTitle={colunas}
        title="" initialItemsPerPage={10} 
        totalItems={planejamentos.length}>
        {
          dados.map((e, index) =>
            <CustomTableRow
              key={e.nome}
              id={index}
              data={{
                '0': e.nome, 
                '1': `${e.periodo}`,
                '2': `${e.qtd}`,
                '3': e.responsavel
              }}
            />

          )
        }
      </Table>
      {loading && <div className="d-flex justify-content-center w-100 m-5"><ReactLoading type="spinningBubbles" color="#000000" /></div>}
    </div>
    <Footer/>
  </div>
  )
}