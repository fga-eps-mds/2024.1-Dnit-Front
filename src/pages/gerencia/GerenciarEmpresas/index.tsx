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
// import { EditarEmpresaDialog } from "../../../components/EditarEmpresaDialog"

// const exampleData: Array<EmpresaModel> = [
//     {Cnpj: "123456789", RazaoSocial: "Empresa A", Ufs: ['1', '2', '3']},
//     {Cnpj: "123456781", RazaoSocial: "Empresa A", Ufs: ['1', '2', '3']},
//     {Cnpj: "123456735", RazaoSocial: "Empresa A", Ufs: ['1', '2', '3']}
// ]

interface EmpresaDialogArgs {
  id: string | null;
  readOnly: boolean;
}

interface FiltroRazaoSocialProps {
  nome?: string;
  onNomeChange: (nome: string) => void;
}

export function FiltroRazaoSocial({ onNomeChange, nome }: FiltroRazaoSocialProps) {
  return (
    <div className="d-flex flex-column ml-3 mt-5 mb-5">
      <label className="ml-2" style={{ textAlign: 'start', fontSize: '16px' }}>Razao Social:</label>
      <div className="d-flex" style={{ fontSize: '16px' }}>
        <div className="br-input large input-button">
          <input data-testid="filtroNome" className="br-input-search-large" type="search" placeholder="Razão Social" value={nome}
            onChange={e => onNomeChange(e.target.value)}
          />
          <button className="br-button" type="button" aria-label="Buscar" onClick={() => { }}>
            <i className="fas fa-search" aria-hidden="true"></i>
          </button>
        </div>
      </div>
    </div>
  );
}

export default function GerenciarEmpresas() {
    const paginas = [{nome: "Gerenciar Empresas", link: "/gerenciarEmpresas"}];
	const [loading, setLoading] = useState(false);
    const [listaEmpresas, setListaEmpresas] = useState<EmpresaModel[]>([]);
	// const [empresaSelecionada, setEmpresaSelecionada] = useState<EmpresaModel | null>(null);
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
        			<FiltroRazaoSocial onNomeChange={setRazaoSocial}></FiltroRazaoSocial>
        		</div>
				{listaEmpresas.length === 0 && <Table columsTitle={["Razão Social", "CNPJ", "UFs"]} initialItemsPerPage={10} title="Empresas Cadastradas"><></><></></Table>}
				<Table title="Empresas Cadastradas" initialItemsPerPage={10} columsTitle={["Razão Social", "CNPJ", "UFs"]}>
					{
						listaEmpresas.map((empresa, index) => (
							<CustomTableRow 
								key={`${empresa.cnpj}`} id={index}
								data={{'0': empresa.razaoSocial, '1': empresa.cnpj, '2': empresa.uFs.map(String).join(', ')}}
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