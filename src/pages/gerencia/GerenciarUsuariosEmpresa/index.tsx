import { notification } from "antd";
import { useEffect, useState } from "react";
import { UsuarioModel } from "../../../models/usuario";
import Header from "../../../components/Header";
import Table, { CustomTableRow } from "../../../components/Table";
import Footer from "../../../components/Footer";
import { fetchUsuariosEmpresa } from "../../../service/empresaApi";
import TrilhaDeNavegacao from "../../../components/Navegacao";
import InputFilter from "../../../components/InputFilter";
import ReactLoading from "react-loading";
import { useParams } from "react-router-dom";

export default function GerenciarUsuariosEmpresa() {
    const { cnpj } = useParams();
    const paginas = [{nome: "Gerenciar Empresas", link: "/gerenciarEmpresas"}, 
        {nome: "Usuarios", link: "/gerenciarUsuariosEmpresa"}];
    const [listaUsuarios, setListaUsuarios] = useState<UsuarioModel[]>([]);
    const [nome, setNome] = useState('');
    const [uf, setUf] = useState('');
    const [perfil, setPerfil] = useState('');
    const [tamanhoPagina, setTamanhoPagina] = useState(20);
    const [loading, setLoading] = useState(false);
    const [notificationApi, notificationContextHandler] = notification.useNotification();
    
    const buscarUsuariosEmpresa = () => {
        setLoading(true);
        console.log(cnpj);
        if (cnpj) {
            fetchUsuariosEmpresa(cnpj, 1, tamanhoPagina, nome)
            .then(u => setListaUsuarios(u.items))
            .catch(error => notificationApi.error({ message: 'Falha na listagem de usuários. ' + (error?.response?.data || '') }))
            .finally(() => setLoading(false));
        }
        else
        {
            setLoading(false);
        }
    }

    useEffect(() => {
        buscarUsuariosEmpresa();
    }, [nome, uf, perfil]);

    return (
        <div className="App">
          {notificationContextHandler}
          <Header />
          <TrilhaDeNavegacao elementosLi={paginas} />
          <div className="d-flex flex-column m-5">
            <div className="d-flex justify-content-between align-items-center mr-5">
                <InputFilter onChange={setNome} dataTestId="filtroNome" label="Nome" placeholder="Nome"/>
            </div>
            {listaUsuarios.length === 0 && <Table columsTitle={['Nome', 'Tipo de Perfil', 'UF', 'E-mail']} initialItemsPerPage={10} title="Perfis de usuário cadastrados"><></><></></Table>}
    
            <Table columsTitle={['Nome', 'Tipo de Perfil', 'UF', 'E-mail']} initialItemsPerPage={10} title="Usuários cadastrados">
              {
                listaUsuarios.map((u, index) =>
                  <CustomTableRow key={`${u.id}-${index}`} id={index}
                    data={{ '0': u.nome, '1': `${u.perfil.nome}`, '2': `${u.ufLotacao}`, '3': `${u.email}`}}
                    hideEditIcon={true}
                    hideEyeIcon={true}
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