import { useEffect, useState } from "react";
import Modal from "../Modal";
import "./styles.css"
import { fetchEmpresa, sendCadastroEmpresa, updateEmpresa } from "../../service/empresaApi";
import { notification } from "antd";
import { EmpresaModel, UFs } from "../../models/empresa";
import { formatCnpj } from "../../pages/gerencia/GerenciarEmpresas";

interface EditarEmpresasDialogProps {
	id: string | null;
	readOnly: boolean;
	closeDialog: (saved: boolean) => void;
}

export default function EditarEmpresasDialog( { id, readOnly, closeDialog }: EditarEmpresasDialogProps ) {
	const [notificationApi, contextHolder] = notification.useNotification();
	const [razaoSocial, setRazaoSocial] = useState('');
	const [cnpj, setCnpj] = useState('');
	const [listaUfs, setListaUfs] = useState<UFs[]>([]);
	const [loading, setLoading] = useState(false);

	async function buscarEmpresa(cnpj : string): Promise<EmpresaModel> {
		setLoading(true);
		const empresa = await fetchEmpresa(cnpj);
		setRazaoSocial(empresa.razaoSocial);
		setCnpj(empresa.cnpj);
		setListaUfs(empresa.uFs);
		setLoading(false);
		return empresa;
	
	}

	const salvarEmpresa = () => {
		if (!razaoSocial.trim()) {
			return;
		}

		const empresa = {
			Cnpj: cnpj.trim(),
			RazaoSocial: razaoSocial.trim(),
			UFs: listaUfs.map(u => u.id)
		};

		setLoading(true);
		
		if (!id)
		{
			sendCadastroEmpresa(empresa)
				.then(e => {
				notification.success({message: 'A empresa foi cadastrada com sucesso!'});
				closeDialog(true);
			  })
			  .catch(error => notificationApi.error({message: 'Falha no cadastro da empresa. ' + (error?.response?.data ?? ''), duration: 30}))
			  .finally(() => setLoading(false));
			return;
		}
		
		updateEmpresa(id, empresa)
		.then(e => {
			notification.success({message: 'A empresa foi alterada com sucesso!'});
			closeDialog(true);
		  })
		  .catch(error => notificationApi.error({message: 'Falha na edição da empresa. ' + (error?.response?.data ?? ''), duration: 30}))
		  .finally(() => setLoading(false));
	}

	useEffect(() => {
		if (id) {
			buscarEmpresa(id);
		}
	}, [id]);

	return (
		
		<Modal className="modal-title">
			{contextHolder}
			<div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
				{id && <h4 className="text-center mt-1">{readOnly ? 'Visualizar Empresa' : 'Editar Empresa'}</h4>}
        		{!id && <h4 className="text-center mt-1">Cadastrar Empresa</h4>}
				<button data-testid="botaoFechar" className="br-button close circle" type="button" aria-label="Close" onClick={() =>{ closeDialog(false) }}>
					<i className="fas fa-times" aria-hidden="true"></i>
				</button>
      		</div>
			<div style={ {height: "inherit"} }>
				<div className="br-input edicao-empresa">
					<label>Razão Social</label>
					<input id="input-default" type={"text"} readOnly={readOnly} onChange={e => setRazaoSocial(e.target.value)} defaultValue={razaoSocial}/>
				</div>
				<div className="br-input edicao-empresa">
					<label>CNPJ</label>
					<input id="input-default" type={"text"} readOnly={id ? true : false} onChange={e => setCnpj(e.target.value.replace(/\D/g, ''))} value={formatCnpj(cnpj)} defaultValue={id ? formatCnpj(id) : ""}/>
				</div>
			</div>
			{!readOnly &&
			(<div className="d-flex w-100 justify-content-end">
        		<button data-testid="botaoCancelar" className="br-button secondary" type="button" onClick={() => {closeDialog(false)}}>Cancelar</button>
        		<button data-testid="botaoConfirmar" className="br-button primary" type="submit" onClick={salvarEmpresa}>Confirmar</button>
      		</div>)
			}
			{readOnly &&
			(<div className="d-flex w-100 justify-content-end">
				<button data-testid="botaoCancelar" className="br-button secondary" type="button" onClick={() => {closeDialog(false)}}>Voltar</button>
			</div>)
			}

		</Modal>
	)
}