import { useState } from "react";
import Modal from "../Modal";
import { deleteEmpresa } from "../../service/empresaApi";
import { notification } from "antd";
import "./styles.css"

export interface DeletarEmpresaDialogArgs {
  id: string;
  nome: string;
}

interface DeletarEmpresaDialogProps {
    id: string;
    nome: string;
    closeDialog: () => void;
}

export default function DeletarEmpresaDialog( { id, nome, closeDialog }: DeletarEmpresaDialogProps) {
    const [loading, setLoading] = useState(false);

    const deletarEmpresa = () => {
        setLoading(true);
        deleteEmpresa(id)
        .then(() => {
            notification.success({ message: "Empresa deletada com sucesso" });
            closeDialog();
          })
        .catch((error) => {
            notification.error({
              message:
                "Falha na exclusão do perfil. " + (error?.response?.data ?? ""),
            });
          })
          .finally(() => setLoading(false));
    }

    return (
        <Modal className="delete-empresa">
          <p>
            <strong>Tem certeza que deseja excluir essa empresa?</strong>
          </p>
          <p>
            A empresa <strong>{nome}</strong> é usada por X usuários.
          </p>
          <div className="d-flex w-100 justify-content-center">
            <button className="br-button secondary" type="button" onClick={closeDialog}>
              Cancelar
            </button>
            <button className="br-button primary" type="button"onClick={deletarEmpresa}>
              Confirmar
            </button>
          </div>
        </Modal>
      );
}