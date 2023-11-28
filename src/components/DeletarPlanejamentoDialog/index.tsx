import { useState } from "react";
import Modal from "../Modal";
import { notification } from "antd";
import "./styles.css"
import { deletePlanejamento } from "../../service/planejamentoApi";
export interface DeletarPlanejamentoDialogArgs{
  nome: string;
  qtdAcoes: number | null;
}

interface DeletarPlanejamentoDialogProps {
  readonly nome: string;
  readonly qtdAcoes: number;
  readonly closeDialog: (deleted: boolean) => void;
}

export default function DeletarPlanejamentoDialog( { nome, qtdAcoes, closeDialog}: DeletarPlanejamentoDialogProps) {
  const deletarPlanejamento = () => {
    deletePlanejamento(nome)
    .then(() => {
      notification.success({ message: "Planejamento deletado com sucesso!"});
      closeDialog(true);
    })
    .catch((error) => {
      notification.error({
        message: "Falha na exclusão do perfil. " + (error?.response?.data ?? "")
      });
    })
  }

  return (
    <Modal className="delete-planejamento" closeModal={() => closeDialog(false) }>
      <p>
        <strong>Tem certeza que deseja excluir este planejamento? </strong>
      </p>
      <p>
        O planejamento <strong>{nome} será excluído do sistema.</strong>
      </p>
      <div className="d-flex w-100 justify-content-center">
      <button className="br-button secondary" type="button" onClick={() => closeDialog(false)} data-testid="botaoCancelar">
        Cancelar
      </button>
      <button className="br-button primary" disabled type="button"onClick={deletarPlanejamento} data-testid="botaoConfirmar">
        Confirmar
      </button>
      </div>
    </Modal>
  );
}
