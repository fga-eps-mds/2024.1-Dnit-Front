import { useState } from "react";
import Modal from "../Modal";
import { deleteUsuarioEmpresa } from "../../service/empresaApi";
import { notification } from "antd";
import "./styles.css"

interface RemoverUsuarioEmpresaProps {
    cnpj: string | undefined,
    nomeEmpresa: string | undefined,
    usuarioId: string,
    nomeUsuario: string,
    closeDialog: (removed: boolean) => void,
}

export default function RemoverUsuarioEmpresaDialog( { cnpj, nomeEmpresa, usuarioId, nomeUsuario, closeDialog }: RemoverUsuarioEmpresaProps) {
    const [loading, setLoading] = useState(false);

    const removerUsuario = () => {
        setLoading(true);
        if (cnpj) {
            deleteUsuarioEmpresa(cnpj, usuarioId)
            .then(() => {
                notification.success({ message: "O usuário foi removido da empresa com sucesso." });
                closeDialog(true);
            })
            .catch((error) => {
                notification.error({
                message:
                    "Falha na remoção do usuário. " + (error?.response?.data ?? ""),
                });
            })
        }
        setLoading(false);
    }

    return (
        <Modal className="delete-usuario">
          <p>
            <strong>Tem certeza que deseja remover esse usuário da empresa?</strong>
          </p>
          <p>
            O usuário <strong>{nomeUsuario}</strong> será removido da empresa <strong>{nomeEmpresa}</strong>.
          </p>
          <div className="d-flex w-100 justify-content-center">
            <button className="br-button secondary" type="button" onClick={() => closeDialog(false)}>
              Cancelar
            </button>
            <button className="br-button primary" type="button"onClick={removerUsuario}>
              Confirmar
            </button>
          </div>
        </Modal>
      );
}