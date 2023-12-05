import { useState } from "react";
import Modal from "../Modal";
import { deleteEscola } from "../../service/escolaApi";
import { notification } from "antd";
import "./styles.css"
export interface DeletarEscolaDialogArgs {
  id: string;
  nome: string;
}

interface DeletarEscolaDialogProps {
  readonly id: string;
  readonly nome: string;
  readonly closeDialog: (deleted : boolean) => void
}

export default function DeletarEscolaDialog( { nome, closeDialog} : DeletarEscolaDialogProps) {
  const deletarEscola = () => {
    
  }

  return (
    <Modal className="delete-escola-planejamento" closeModal={() => closeDialog(false)}>
      <p>
        <strong>Tem certeza que deseja excluir esta escola?</strong>
      </p>
      <p>
        A escola <strong>{nome}</strong> será excluída do planejamento.
      </p>
      <div className="d-flex w-100 justify-content-center">
        <button className="br-button secondary" type="button" onClick={() => closeDialog(false)} data-testid="botaoCancelar">
        Cancelar
       </button>
        <button className="br-button primary" disabled type="button"onClick={deletarEscola} data-testid="botaoConfirmar">
        Confirmar
        </button>
      </div>
    </Modal>
  )

}
