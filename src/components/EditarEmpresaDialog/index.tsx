import { useEffect, useState } from "react";
import Modal from "../Modal";
import "./styles.css"
import { fetchEmpresa, sendCadastroEmpresa, updateEmpresa } from "../../service/empresaApi";
import { notification } from "antd";
import { EmpresaModel } from "../../models/empresa";
import { formatCnpj } from "../../pages/gerencia/GerenciarEmpresas";
import MultiSelect from "../MultiSelect";
import { FilterOptions } from "../../pages/gerencia/GerenciarUsuario";

interface EditarEmpresasDialogProps {
	readonly id: string | null;
	readonly readOnly: boolean;
	readonly listaUfs: FilterOptions[];
	readonly closeDialog: (saved: boolean) => void;
}

export default function EditarEmpresasDialog( { id, readOnly, listaUfs, closeDialog }: EditarEmpresasDialogProps ) {
	const [notificationApi, contextHolder] = notification.useNotification();
	const [razaoSocial, setRazaoSocial] = useState('');
	const [cnpj, setCnpj] = useState('');
	const [UFs, setUFs] = useState<string[]>([]);
	const [errors, setErrors] = useState({
		RazaoSocial: "",
		CNPJ: "",
		UFs: ""
	});

	async function buscarEmpresa(cnpj : string): Promise<EmpresaModel> {
		const empresa = await fetchEmpresa(cnpj);
		setRazaoSocial(empresa.razaoSocial);
		setCnpj(empresa.cnpj);
		setUFs(empresa.uFs?.map(uf => uf.id.toString()));
		return empresa;
	}

	const salvarEmpresa = async () => {
		console.log(razaoSocial);
		let valido = validarRazaoSocial(razaoSocial);
		valido = validarCNPJ(cnpj) && valido;
		valido = validarUFs(UFs) && valido;

		if (!valido) return;

		const empresa = {
			Cnpj: cnpj.trim(),
			RazaoSocial: razaoSocial.trim(),
			UFs: UFs.map(Number)
		};
		
		if (!id)
		{
			sendCadastroEmpresa(empresa)
				.then(e => {
				notification.success({message: 'A empresa foi cadastrada com sucesso!'});
				closeDialog(true);
			  })
			  .catch(error => notificationApi.error({message: 'Falha no cadastro da empresa. ' + (error?.response?.data ?? ''), duration: 30}))
			return;
		}
		
		updateEmpresa(id, empresa)
		.then(e => {
			notification.success({message: 'A empresa foi alterada com sucesso!'});
			closeDialog(true);
		  })
		  .catch(error => notificationApi.error({message: 'Falha na edição da empresa. ' + (error?.response?.data ?? ''), duration: 30}))
	}

	const validarRazaoSocial = (value: string) : boolean => {
		const message = value.trim() === "" ? "Este campo é obrigatório." : "";

		setErrors((prevErrors) => ({ ...prevErrors, RazaoSocial: message}));

		return !Boolean(message);
	}
	
	const validarCNPJ = (value: string) : boolean => {
		// Adicionar algoritmo de verificação de CNPJ
		const message = value.length !== 14 ? (value.length === 0 ? "Este campo é obrigatório." :
			"O CNPJ deve conter 14 dígitos.") : "";

		setErrors((prevErrors) => ({ ...prevErrors, CNPJ: message }));

		return !Boolean(message);
	}

	const validarUFs = (value: string[]) : boolean => {
		const message = value.length === 0 ? "Selecione uma ou mais UFs." : "";

		setErrors((prevErrors) => ({ ...prevErrors, UFs: message }));

		return !Boolean(message);
	}

	useEffect(() => {
		if (id) {
			buscarEmpresa(id);
		}
	}, [id]);

	return (
		
		<Modal className="edicao-empresa" closeModal={() => { closeDialog(false) }}>
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
					<input id="input-default" data-testid="inputRazaoSocial" type={"text"} readOnly={readOnly}
						onChange={e => setRazaoSocial(e.target.value)} value={razaoSocial}/>
					<div className="erro">
						{errors.RazaoSocial && <p>{errors.RazaoSocial}</p>}
					</div>
				</div>
				<div className="br-input edicao-empresa">
					<label>CNPJ</label>
					<input id="input-default" type={"text"} readOnly={Boolean(id)} onChange={e => setCnpj(e.target.value.replace(/\D/g, ''))} 
						value={formatCnpj(cnpj)} maxLength={18} data-testid="inputCnpj" defaultValue={id ? formatCnpj(id) : ""}/>
					<div className="erro">
						{errors.CNPJ && <p>{errors.CNPJ}</p>}
					</div>	
				</div>
				<MultiSelect items={listaUfs} value={UFs} label={"UFs"} labelStyle={{display: "inline", fontSize: "14px", marginLeft: "0px !important"}} onChange={setUFs} 
						dropdownStyle={{ marginLeft: "0px", width: "280px" }} readOnly={readOnly} errorMessage={errors.UFs}/>
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