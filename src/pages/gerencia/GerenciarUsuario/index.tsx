import Footer from "../../../components/Footer";
import "../../../styles/App.css";
import Header from "../../../components/Header";
import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import TrilhaDeNavegacao from "../../../components/Navegacao";
import Table, { CustomTableRow } from "../../../components/Table";
import ReactLoading from "react-loading";
import { EditarTipoPerfilDialog } from "../../../components/EditarTipoPerfilDialog";
import Select from "../../../components/Select";
import {fetchUsuarios} from "../../../service/usuarioApi";
import { notification } from "antd";
import { UsuarioModel } from "../../../models/usuario";
import {fetchUnidadeFederativa} from "../../../service/escolaApi";
import {fetchPerfis} from "../../../service/usuarioApi";
import { Permissao } from "../../../models/auth";
import { AuthContext } from "../../../provider/Autenticacao";
import {fetchMunicipio} from "../../../service/escolaApi";
import InputFilter from "../../../components/InputFilter";

interface EditarTipoPerfilArgs {
  id: string | null;
  readOnly: boolean;
}

interface ListaPaginada {
  pagina: number;
  itemsPorPagina: number;
  total: number;
  totalPaginas: number;
  items: UsuarioModel[];
}

export interface FilterOptions {
  id: string;
  rotulo: string;
}

export default function GerenciarUsuario() {
  const { temPermissao } = useContext(AuthContext);

  const [podeEditarPerfilUsuario, setPodeEditarPerfilUsuario] = useState(
    temPermissao(Permissao.UsuarioPerfilEditar)
  );

  const paginas = [{ nome: "Logout", link: "/login" }];
  const [loading, setLoading] = useState(false);
  const [mostrarPerfil, setMostrarPerfil] = useState<EditarTipoPerfilArgs | null>(null);
  const [nome, setNome] = useState('');
  const [uf, setUF] = useState('');
  const [perfil, setPerfil] = useState('');
  const [municipio, setMunicipio] = useState('');
  const [empresa, setEmpresa] = useState('');
  const [listaUsuarios, setListaUsuarios] = useState<UsuarioModel[]>([]);
  const [notificationApi, notificationContextHandler] = notification.useNotification();
  const [tamanhoPagina, setTamanhoPagina] = useState(10);
  const [listaUfs, setListaUfs] = useState<FilterOptions[]>([]);
  const [listaPerfis, setListaPerfis] = useState<FilterOptions[]>([]);
  const [listaMunicipios, setListaMunicipios] = useState<FilterOptions[]>([]);
  const [usuarioSelecionado, setUsuarioSelecionado] = useState('');
  const [atualizaPerfilSelecionado, setAtualizaPerfilSelecionado] = useState('');

  const navigate = useNavigate();


  const buscarUsuarios = () => {
    setLoading(true);

    fetchUsuarios<ListaPaginada>({ pagina: 1, itemsPorPagina: tamanhoPagina, nome: nome, ufLotacao: uf, perfilId: perfil, empresa: empresa })
      .then(lista => {
        // setBackupListaUsuarios(lista.items)
        setListaUsuarios(lista.items)
      })
      .catch(error => notificationApi.error({ message: 'Falha na listagem de usuários. ' + (error?.response?.data || '') }))
      .finally(() => setLoading(false));
  }

  async function fetchUf(): Promise<void> {
    const listaUfs = await fetchUnidadeFederativa();
    const novaUf = listaUfs.map((u) => ({ id: '' + u.id, rotulo: u.sigla }));
    setListaUfs(novaUf);
  }

  async function fetchPerfil(pagina: number, tamanhoPagina: number, nome: string): Promise<void> {
    const listaPerfis = await fetchPerfis(pagina, tamanhoPagina, nome);
    const novoPerfil = listaPerfis.map((u) => ({ id: u.id, rotulo: u.nome }));
    setListaPerfis(novoPerfil);
  }

  async function fetchMunicipios(): Promise<void> {
    console.log(Number(uf))
    const listaMunicipios = await fetchMunicipio(Number(uf));
    const novoMunicipio = listaMunicipios.map((u) => ({ id:''+ u.id, rotulo: u.nome }));
    setListaMunicipios(novoMunicipio);
  }

  function procuraRotuloUf(usuario: UsuarioModel) {
    return listaUfs.find((uf) => uf.id === '' + usuario.ufLotacao)?.rotulo;
  }

  function procuraNomePerfil(usuario: UsuarioModel) {
    return listaPerfis.find((perfil) => perfil.id === usuario.perfilId)?.rotulo
  }

  function get_empresa(usuario: UsuarioModel) {
    return usuario.empresa?.razaoSocial || ""
  }

  useEffect(() => {
    buscarUsuarios();
  }, [nome, uf, perfil, municipio, empresa]);

  useEffect(() => {
    fetchMunicipios();
  }, [uf]);

  useEffect(() => {
    fetchUf();
    fetchPerfil(1, 100, '');
  }, []);

  useEffect(() => {
    if (!temPermissao(Permissao.UsuarioVisualizar)) {
      navigate("/");
    }
  }, []);

  return (
    <div className="App">
      {notificationContextHandler}
      {mostrarPerfil != null && <EditarTipoPerfilDialog
        listaOpcoes={listaPerfis}
        listaUsuarios={listaUsuarios}
        usuarioId={usuarioSelecionado}
        closeDialog={() => setMostrarPerfil(null)}
        atualizaTabela={setListaUsuarios}
        perfilAntesAlteracao={atualizaPerfilSelecionado}
      />}
      <Header /> 
      <TrilhaDeNavegacao elementosLi={paginas} />
      <div className="d-flex flex-column m-5">
        <div className="d-flex justify-content-left align-items-center mr-5">
          <InputFilter onChange={setNome} dataTestId="filtroNome" label="Nome" placeholder="Nome"/>
          <InputFilter onChange={setEmpresa} dataTestId="empresaNome" label="Empresa" placeholder="Nome da Empresa"/>
          <Select items={listaUfs} value={uf} label={"UF:"} onChange={setUF} dropdownStyle={{ marginLeft: "20px", width: "260px" }} filtrarTodos={true}/>
          <Select items={listaPerfis} value={perfil} label={"Perfil:"} onChange={setPerfil} dropdownStyle={{ marginLeft: "20px", width: "260px" }} filtrarTodos={true}/>
          <Select items={listaMunicipios} value={municipio} label={"Municipios:"} onChange={setMunicipio} dropdownStyle={{ marginLeft: "20px", width: "260px" }} filtrarTodos={true}/>
        </div>
        {listaUsuarios.length === 0 && <Table columsTitle={['Nome', 'Tipo de Perfil', 'UF', 'Município', 'Email']} initialItemsPerPage={10} title="Perfis de usuário cadastrados"><></><></></Table>}

        <Table columsTitle={['Nome', 'Empresa', 'Tipo de Perfil', 'UF', 'Município', 'Email']} initialItemsPerPage={10} title="Perfis de usuário cadastrados">
          {
            listaUsuarios.map((usuario, index) =>
            (<CustomTableRow key={`${usuario.id}-${index}`} id={index}
              data={{ '0': usuario.nome, '1': get_empresa(usuario), '2': `${procuraNomePerfil(usuario)}`, '3': `${procuraRotuloUf(usuario) ?? ""}`, '4': "Não Cadastrado"/*`${usuario.municipio}`*/, '5': usuario.email }}
              onEditRow={() => {
                setUsuarioSelecionado(usuario.id)
                setMostrarPerfil({ id: null, readOnly: true })
                setAtualizaPerfilSelecionado(`${procuraNomePerfil(usuario)}`)
              }
              }
              hideEditIcon={!podeEditarPerfilUsuario}
              hideTrashIcon={true}
              hideEyeIcon={true}
            />
            ))
          }
        </Table>
        {loading && <div className="d-flex justify-content-center w-100 m-5"><ReactLoading type="spinningBubbles" color="#000000" /></div>}
      </div>
      <Footer />
    </div>
  );
}