import { useState } from "react";
import Modal from "../Modal";
import "./styles.css"

interface EditarEmpresasDialogProps {
	id: string | null;
	readOnly: boolean;
	closeDialog: () => void;
}

export default function EditarEmpresasDialog( { id, readOnly, closeDialog }: EditarEmpresasDialogProps ) {
	return (
		<Modal className="modal-title">
			<div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
				<h4 className="text-center mt-1">Editar Empresa</h4>
				<button data-testid="botaoFechar" className="br-button close circle" type="button" aria-label="Close" onClick={() =>{ closeDialog() }}>
					<i className="fas fa-times" aria-hidden="true"></i>
				</button>
      		</div>
			<div style={ {height: "inherit"} }>
				<div className="br-input edicao-empresa">
					<label>Razão Social</label>
					<input id="input-default" type={"text"} readOnly={readOnly} defaultValue="TODO"/>
				</div>
				<div className="br-input edicao-empresa">
					<label>CNPJ</label>
					<input id="input-default" type={"text"} readOnly={readOnly} defaultValue={id ? id : ""}/>
				</div>
			</div>
			{!readOnly &&
			(<div className="d-flex w-100 justify-content-end">
        		<button data-testid="botaoCancelar" className="br-button secondary" type="button" onClick={() => {closeDialog()}}>Cancelar</button>
        		<button data-testid="botaoConfirmar" className="br-button primary" type="button">Confirmar</button>
      		</div>)
			}
			{readOnly &&
			(<div className="d-flex w-100 justify-content-end">
				<button data-testid="botaoCancelar" className="br-button secondary" type="button" onClick={() => {closeDialog()}}>Voltar</button>
			</div>)
			}

		</Modal>
	)
}