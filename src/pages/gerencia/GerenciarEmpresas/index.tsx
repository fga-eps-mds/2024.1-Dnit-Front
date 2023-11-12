import { useContext, useEffect, useState } from "react";
import "../../../styles/App.css";
import Header from "../../../components/Header";
import Footer from "../../../components/Footer";
import TrilhaDeNavegacao from "../../../components/Navegacao";
import Table, { CustomTableRow } from "../../../components/Table";
import { EmpresaModel } from "../../../models/empresa";
import EditarEmpresasDialog from "../../../components/EditarEmpresaDialog";
import { fetchEmpresas } from "../../../service/empresaApi";
import { notification } from "antd";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../../provider/Autenticacao";
import { Permissao } from "../../../models/auth";
import InputFilter from "../../../components/InputFilter";

interface EmpresaDialogArgs {
  id: string | null;
  readOnly: boolean;
}

export default function GerenciarEmpresas() {
    const paginas = [{nome: "Gerenciar Empresas", link: "/gerenciarEmpresas"}];
	const [loading, setLoading] = useState(false);
    const [listaEmpresas, setListaEmpresas] = useState<EmpresaModel[]>([]);
	const [showEmpresa, setShowEmpresa] = useState<EmpresaDialogArgs | null>(null);
	const [razaoSocial, setRazaoSocial] = useState('');
	const [cnpj, setCnpj] = useState('');
	const [UFs, setUFs] = useState([]);
	const [tamanhoPagina, setTamanhoPagina] = useState(10);
	const [notificationApi, notificationContextHandler] = notification.useNotification();

	const navigate = useNavigate();

	const { temPermissao } = useContext(AuthContext);
	
	const [temPermissaoGerenciar, setTemPermissaoGerenciar] = useState({
		cadastrar: temPermissao(Permissao.EmpresaCadastrar),
		visualizar: temPermissao(Permissao.EmpresaVisualizar)
	  });

	const buscarEmpresas = () => {
		setLoading(true);

		fetchEmpresas(1, tamanhoPagina, razaoSocial)
			.then(empresas => setListaEmpresas(empresas))
			.catch(error => notificationApi.error({ message: 'Falha na listagem de empresas. ' + (error?.response?.data || '') }))
			.finally(() => setLoading(false));
	}

	useEffect(() => {
		buscarEmpresas();
	  }, [razaoSocial, cnpj, UFs]);

	useEffect(() => {
	if (!temPermissao(Permissao.EmpresaVisualizar)) {
	  navigate("/");
	}
	}, []);

	
    return (
		<div className="App">
			{notificationContextHandler}
			{showEmpresa && <EditarEmpresasDialog id={showEmpresa.id} readOnly={showEmpresa.readOnly} closeDialog={() => setShowEmpresa(null)}/>}
			<Header/>
			<TrilhaDeNavegacao elementosLi={paginas}/>
			<div className="d-flex flex-column m-5">
				<div className="d-flex justify-content-left align-items-center mr-5">
        			<InputFilter onChange={setRazaoSocial} dataTestId="filtroRazaoSocial" label="Razão Social" placeholder="Razão Social" />
        		</div>
				{listaEmpresas.length === 0 && <Table columsTitle={["Razão Social", "CNPJ", "UFs"]} initialItemsPerPage={10} title="Empresas Cadastradas"><></><></></Table>}
				<Table title="Empresas Cadastradas" initialItemsPerPage={10} columsTitle={["Razão Social", "CNPJ", "UFs"]}>
					{
						listaEmpresas.map((empresa, index) => (
							<CustomTableRow 
								key={`${empresa.cnpj}`} id={index}
								data={{'0': empresa.razaoSocial, '1': empresa.cnpj, '2': empresa.uFs.map((e) => e.sigla).join(', ')}}
								onEditRow={() => {
									// setEmpresaSelecionada(empresa.Cnpj)
									setShowEmpresa({id: empresa.cnpj, readOnly: false})
								}}
								onDetailRow={() => {
									// setEmpresaSelecionada(empresa.Cnpj)
									setShowEmpresa({id: empresa.cnpj, readOnly: true})
								}}
							/>
						))
					}
				</Table>
			</div>
			<Footer/>
		</div>
    )
}