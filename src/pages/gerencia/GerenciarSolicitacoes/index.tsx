import { notification } from "antd";
import { useContext, useEffect, useState } from "react";
import { UsuarioModel } from "../../../models/usuario";
import Header from "../../../components/Header";
import Table, { CustomTableRow } from "../../../components/Table";
import Footer from "../../../components/Footer";
import { fetchUsuariosEmpresa } from "../../../service/empresaApi";
import TrilhaDeNavegacao from "../../../components/Navegacao";
import InputFilter from "../../../components/InputFilter";
import ReactLoading from "react-loading";
import { useParams } from "react-router-dom";
import { FilterOptions } from "../GerenciarUsuario";
import { fetchUnidadeFederativa } from "../../../service/escolaApi";
import { fetchPerfis } from "../../../service/usuarioApi";
import Select from "../../../components/Select";
import RemoverUsuarioEmpresaDialog from "../../../components/RemoverUsuarioEmpresaDialog";
import { AuthContext } from "../../../provider/Autenticacao";
import { Permissao } from "../../../models/auth";
import { ButtonComponent } from "../../../components/Button";
import AdicionarUsuarioDialog from "../../../components/AdicionarUsuarioDialog";


export default function GerenciarSolicitacoes() {
    const paginas = [{ nome: "Gerenciar Solicitações de Açoes", link: "/gerenciarSolicitacaoAcao" }];
    const [notificationApi, notificationContextHandler] = notification.useNotification();
    const [loading, setLoading] = useState(false);
    const [listaSolicitacoes, setListaSolicitacoes] = useState<UsuarioModel[]>([]);
    const [escola, setEscola] = useState('');
    const [uf, setUf] = useState('');
    const [municipio, setMunicipio] = useState('');
    const [listaUfs, setListaUfs] = useState<FilterOptions[]>([]);
    const [listaMunicipios, setListaMunicipios] = useState<FilterOptions[]>([]);
    const { temPermissao } = useContext(AuthContext);
    const [pagina, setPagina] = useState(1);
    const [totalPaginas, setTotalPaginas] = useState(1);
    const [tamanhoPagina, setTamanhoPagina] = useState(10);

    const buscarSolicitacoes = (proximaPagina: number, novoTamanhoPagina: number = tamanhoPagina) => {
		// fetchSolicitacaoAcoes(proximaPagina, novoTamanhoPagina, escola, uf, municipio)
		// 	.then(pagina => {
		// 		setPagina(pagina)
		// 		setListaSolicitacoes(pagina.items)
		// 		setTamanhoPagina(pagina.itemsPorPagina)
		// 	})
		// 	.catch(error => notificationApi.error({ message: 'Falha na listagem de solicitacoes. ' + (error?.response?.data || '') }))
	}

    async function fetchUf(): Promise<void> {
        const listaUfs = await fetchUnidadeFederativa();
        const novaUf = listaUfs.map((u) => ({ id: '' + u.id, rotulo: u.sigla }));
        setListaUfs(novaUf);
    }

    function procuraRotuloMunicipio(usuario: UsuarioModel) {
        return usuario.municipio === null || usuario.municipio?.nome === "undefined" ? "Não Cadastrado" : usuario.municipio?.nome;
    }

    function procuraRotuloUf(usuario: UsuarioModel) {
        return listaUfs.find((uf) => uf.id === '' + usuario.ufLotacao)?.rotulo;
    }


    useEffect(() => {
        buscarSolicitacoes(pagina, tamanhoPagina);
    }, [escola, uf, pagina, tamanhoPagina]);

    useEffect(() => {
        fetchUf();
    }, []);

    return (
        <div className="App">
            {notificationContextHandler}
            <Header />
            <TrilhaDeNavegacao elementosLi={paginas} />
            <div className="d-flex flex-column m-5">
                <div className="d-flex justify-content-between align-items-center mr-5">
                    <InputFilter onChange={setEscola} dataTestId="filtroEscola" label="Escola" placeholder="Escola" />
                    <Select items={listaUfs} value={uf} label={"UF:"} onChange={setUf} dropdownStyle={{ marginLeft: "20px", width: "260px" }} filtrarTodos={true} />
                    <Select items={listaMunicipios} value={municipio} label={"Municipios:"} onChange={setMunicipio} dropdownStyle={{ marginLeft: "20px", width: "260px" }} filtrarTodos={true} />
                </div>
                {listaSolicitacoes.length === 0 && <Table columsTitle={['Escola', 'Qtd. de Alunos', 'UF', 'Municipio']} initialItemsPerPage={10} title="Usuários cadastrados"><></><></></Table>}

                <Table columsTitle={['Escola', 'Qtd. de Alunos', 'UF', 'Municipio']} initialItemsPerPage={10} title="Soliciatações de Ações">
                    {
                        listaSolicitacoes.map((usuario, index) =>
                            <CustomTableRow key={`${usuario.id}-${index}`} id={index}
                                data={{ '0': usuario.nome, '1': `${temPermissao(Permissao.PerfilVisualizar) ? usuario.perfil.nome : ""}`, '2': `${procuraRotuloUf(usuario)}`, '3': `${usuario.email}` }}
                                hideEyeIcon={false}
                                hideTrashIcon={false}
                                onDeleteRow={() => { }}
                                onDetailRow={() => { }}
                            />
                        )
                    }
                </Table>
                {loading && <div className="d-flex justify-content-center w-100 m-5"><ReactLoading type="spinningBubbles" color="#000000" /></div>}
            </div>
            <Footer />
        </div>
    )
}