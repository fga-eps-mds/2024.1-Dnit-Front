import { useEffect, useState } from "react";
import Modal from "../Modal";
import "./styles.css"
import { notification } from "antd";
import { FilterOptions } from "../../pages/gerencia/GerenciarUsuario";
import Select from "../Select";
import { PoloModel } from "../../models/polo";
import { fetchPolo, sendCadastroPolo, updatePolo } from "../../service/poloApi";
import { fetchMunicipio } from "../../service/escolaApi";

interface EditarPolosDialogProps {
	readonly id: number | null;
	readonly readOnly: boolean;
	readonly listaUfs: FilterOptions[];
	readonly closeDialog: (saved: boolean) => void;
}

export default function EditarPolosDialog( { id, readOnly, listaUfs, closeDialog }: EditarPolosDialogProps ) {
	const [notificationApi, contextHolder] = notification.useNotification();
	const [newUF, setNewUF] = useState(Number);
	const [listaMunicipios, setListaMunicipios] = useState<FilterOptions[]>([]);
	const [newMunicipio, setNewMunicipio] = useState("");
	const [nome, setNome] = useState("");
	const [latitude, setLatitude] = useState("");
	const [longitude, setLongitude] = useState("");
	const [endereco, setEndereco] = useState("");
	const [cep, setCEP] = useState("");

	async function fetchMunicipios(): Promise<void> {
		const listaMunicipios = await fetchMunicipio(Number(newUF));
		const novoMunicipio = listaMunicipios.map((u) => ({ id:''+ u.id, rotulo: u.nome }));
		setListaMunicipios(novoMunicipio);
	}

	useEffect(() => {
		fetchMunicipios();
	}, [newUF]);
	

	async function buscarPolo(id : any) {
		fetchPolo(id)
			.then(polo => {
				setNome(polo.nome);
				setEndereco(polo.endereco);
				setCEP(polo.cep);
				setLatitude(polo.latitude);
				setLongitude(polo.longitude);
				setNewUF(polo.uf.id);
				setNewMunicipio(polo.municipio.id.toString());
			});
	}

	const salvarPolo = () => {
		const polo = {
			nome: nome.trim(),
			endereco: endereco.trim(),
			cep: cep.trim(),
			latitude: latitude.trim(),
			longitude: longitude.trim(),
			idUf: newUF,
			municipioId: Number(newMunicipio),
		};
		
		if (!id)
		{
			sendCadastroPolo(polo)
				.then(e => {
				notification.success({message: 'O polo foi cadastrado com sucesso!'});
				closeDialog(true);
			  })
			  .catch(error => notificationApi.error({message: 'Falha no cadastro do polo. ' + (error?.response?.data ?? ''), duration: 30}))
			return;
		}
		
		updatePolo(id, polo)
		.then(e => {
			notification.success({message: 'O polo foi alterado com sucesso!'});
			closeDialog(true);
		  })
		  .catch(error => notificationApi.error({message: 'Falha na edição do polo. ' + (error?.response?.data ?? ''), duration: 30}))
	}

	useEffect(() => {
		if (id) {
			buscarPolo(id);
		}
	}, [id]);

	return (
		
		<Modal className="edicao-polo" closeModal={() => { closeDialog(false) }}>
			{contextHolder}
			<div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
				{id && <h4 className="text-center mt-1">{readOnly ? 'Informações do Polo' : 'Atualizar Polo'}</h4>}
        		{!id && <h4 className="text-center mt-1">Cadastrar Polo</h4>}
				<button data-testid="botaoFechar" className="br-button close circle" type="button" aria-label="Close" onClick={() =>{ closeDialog(false) }}>
					<i className="fas fa-times" aria-hidden="true"></i>
				</button>
      		</div>
			<div style={ {height: "inherit"} }>
				<div className="br-input edicao-polo">
					<label>Nome</label>
					<input id="input-default" data-testid="inputNome" type={"text"} readOnly={readOnly} onChange={e => setNome(e.target.value)} defaultValue={nome}/>
				</div>
				<div className="br-input edicao-polo">
					<label>Endereço</label>
					<input id="input-default" type={"text"} readOnly={readOnly} onChange={e => setEndereco(e.target.value)} 
						defaultValue={endereco} data-testid="inputEndereco" />
				</div>
				<div className="br-input edicao-polo-cod ">
					<label>Latitude</label>
					<input id="input-default" type={"text"} readOnly={readOnly} onChange={e => setLatitude(e.target.value)} 
						defaultValue={latitude} data-testid="inputLatitude" />
				</div>
				<div className="br-input edicao-polo-cod ">
					<label>Longitude</label>
					<input id="input-default" type={"text"} readOnly={readOnly} onChange={e => setLongitude(e.target.value)} 
						defaultValue={longitude} data-testid="inputLongitude" />
				</div>
				<div className="br-input edicao-polo-cod ">
					<label>CEP</label>
					<input id="input-default" type={"text"} readOnly={readOnly} onChange={e => setCEP(e.target.value)} 
						 data-testid="inputCEP" defaultValue={cep}/>
				</div>
				<Select 
					items={listaUfs} 
					value={newUF.toString()} 
					label={"UF"} 
					onChange={(uf) => {
					setNewUF(parseInt(uf,10))}} 
					inputStyle={{ width: "450px" }} 
					dropdownStyle={{ width: "450px" }} 
					buttonStyle={{ left: "150px" } } 
					filtrarTodos={false}
					definePlaceholder="Escolha a Unidade Federativa"
					inputReadOnly={readOnly}
				/>
				<Select 
					items={listaMunicipios} 
					value={newMunicipio} 
					label={"Municipio"} 
					onChange={(municipio) => {
					setNewMunicipio(municipio)}} 
					inputStyle={{ width: "450px" }} 
					dropdownStyle={{ width: "450px" }} 
					buttonStyle={{ left: "150px" } } 
					filtrarTodos={false}
					definePlaceholder="Escolha o Municipio"
					inputReadOnly={readOnly}
				/>
			</div>
			{!readOnly &&
			(<div className="d-flex w-100 justify-content-end">
        		<button data-testid="botaoCancelar" className="br-button secondary" type="button" onClick={() => {closeDialog(false)}}>Cancelar</button>
        		<button data-testid="botaoConfirmar" className="br-button primary" type="submit" onClick={salvarPolo}>Confirmar</button>
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