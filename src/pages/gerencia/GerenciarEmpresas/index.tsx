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
import { ButtonComponent } from "../../../components/Button";
import DeletarEmpresaDialog, { DeletarEmpresaDialogArgs } from "../../../components/DeletarEmpresaDialog";

interface EmpresaDialogArgs {
  id: string | null;
  readOnly: boolean;
}

export default function GerenciarEmpresas() {
    const paginas = [{nome: "Gerenciar Empresas", link: "/gerenciarEmpresas"}];
	const [loading, setLoading] = useState(false);
    const [listaEmpresas, setListaEmpresas] = useState<EmpresaModel[]>([]);
	const [showEmpresa, setShowEmpresa] = useState<EmpresaDialogArgs | null>(null);
	const [showDeleteEmpresa, setShowDeleteEmpresa] = useState<DeletarEmpresaDialogArgs | null>(null);
	const [razaoSocial, setRazaoSocial] = useState('');
	const [cnpj, setCnpj] = useState('');
	const [UFs, setUFs] = useState([]);
	const [tamanhoPagina, setTamanhoPagina] = useState(20);
	const [notificationApi, notificationContextHandler] = notification.useNotification();

	const navigate = useNavigate();

	const { temPermissao } = useContext(AuthContext);
	
	const [temPermissaoGerenciar, setTemPermissaoGerenciar] = useState({
		cadastrar: temPermissao(Permissao.EmpresaCadastrar),
		visualizar: temPermissao(Permissao.EmpresaVisualizar),
		remover: temPermissao(Permissao.EmpresaRemover),
		editar: temPermissao(Permissao.EmpresaEditar)
	  });

	const buscarEmpresas = () => {
		setLoading(true);

		fetchEmpresas(1, tamanhoPagina, razaoSocial)
			.then(pagina => setListaEmpresas(pagina.items))
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
			{showDeleteEmpresa && <DeletarEmpresaDialog id={showDeleteEmpresa.id} nome={showDeleteEmpresa.nome} closeDialog={() => setShowDeleteEmpresa(null)}/>}
			<Header/>
			<TrilhaDeNavegacao elementosLi={paginas}/>
			<div className="d-flex flex-column m-5">
				<div className="d-flex justify-content-left align-items-center mr-5">
        			<InputFilter onChange={setRazaoSocial} dataTestId="filtroRazaoSocial" label="Razão Social" placeholder="Razão Social" />
					<InputFilter onChange={setCnpj} dataTestId="filtroCnpj" label="Cnpj" placeholder="Cnpj" />
					{/* <InputFilter onChange={setUFs} dataTestId="filtroRazaoSocial" label="Razão Social" placeholder="Razão Social" /> */}
					{temPermissaoGerenciar.cadastrar && <ButtonComponent label="Cadastrar Empresa" buttonStyle="primary" onClick={() => setShowEmpresa({ id: null, readOnly: false })}></ButtonComponent>}
        		</div>
				{listaEmpresas.length === 0 && <Table columsTitle={["Razão Social", "CNPJ", "UFs"]} initialItemsPerPage={10} title="Empresas Cadastradas"><></><></></Table>}
				<Table title="Empresas Cadastradas" initialItemsPerPage={10} columsTitle={["Razão Social", "CNPJ", "UFs"]}>
					{
						listaEmpresas.map((empresa, index) => (
							<CustomTableRow 
								key={`${empresa.cnpj}`} id={index}
								data={{'0': empresa.razaoSocial, '1': formatCnpj(empresa.cnpj), '2': empresa.uFs.map((e) => e.sigla).join(', ')}}
								onEditRow={() => {
									// setEmpresaSelecionada(empresa.Cnpj)
									setShowEmpresa({id: empresa.cnpj, readOnly: false})
								}}
								onDetailRow={() => {
									// setEmpresaSelecionada(empresa.Cnpj)
									setShowEmpresa({id: empresa.cnpj, readOnly: true})
								}}
								onDeleteRow={() => {
									setShowDeleteEmpresa({id: empresa.cnpj, nome: empresa.razaoSocial})
								}}
								onUsersRow={() => {
									navigate(`/gerenciarUsuariosEmpresa/${empresa.cnpj}`);
								}}
								hideUsersIcon = {false}
							/>
						))
					}
				</Table>
			</div>
			<Footer/>
		</div>
    )
}

export const formatCnpj = (input: string) => {
	const cnpjNumeric = input.replace(/\D/g, '');

	if (cnpjNumeric.length >= 13) {
		return `${cnpjNumeric.slice(0, 2)}.${cnpjNumeric.slice(2, 5)}.${cnpjNumeric.slice(5, 8)}/${cnpjNumeric.slice(8, 12)}-${cnpjNumeric.slice(12)}`;
	} 
	else if (cnpjNumeric.length >= 9) {
		return `${cnpjNumeric.slice(0, 2)}.${cnpjNumeric.slice(2, 5)}.${cnpjNumeric.slice(5, 8)}/${cnpjNumeric.slice(8)}`;
	} 
	else if (cnpjNumeric.length >= 6) {
		return `${cnpjNumeric.slice(0, 2)}.${cnpjNumeric.slice(2, 5)}.${cnpjNumeric.slice(5)}`;
	} 
	else if (cnpjNumeric.length >= 3) {
		return `${cnpjNumeric.slice(0, 2)}.${cnpjNumeric.slice(2)}`;
	} 
	else {
		return cnpjNumeric;
	}
}