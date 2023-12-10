import Modal from "../Modal";
import { notification } from "antd";
import "./styles.css"
import {deletePlanejamentoMacro} from "../../service/gerenciarAcoes";
import {PlanejamentoMacro} from "../../models/gerenciarAcoes";

interface DeletarPlanejamentoDialogProps {
  readonly planejamento: PlanejamentoMacro;
  readonly closeDialog: (deleted: boolean) => void;
}

export default function DeletarPlanejamentoDialog( { planejamento, closeDialog}: DeletarPlanejamentoDialogProps) {
    
  return (
    <Modal className="delete-planejamento" closeModal={() => closeDialog(false) }>
      <p>
        <strong>Tem certeza que deseja excluir este planejamento?</strong>
      </p>
      <p>
        O planejamento <strong>{planejamento.nome} será excluído do sistema.</strong>
      </p>
      <div className="d-flex w-100 justify-content-end mb-2">
          <button className="br-button secondary" type="button" onClick={() => closeDialog(false)} data-testid="botaoCancelar">
            Cancelar
          </button>
          
          <button className="br-button primary" type="button" data-testid="botaoConfirmar"
              onClick={() => {
                  deletePlanejamentoMacro(planejamento.id)
                      .then(() => {
                          notification.success({ message: "Planejamento deletado com sucesso!" });
                          closeDialog(true);
                      })
                      .catch((error) => {
                          notification.error({
                              message: "Falha na exclusão do Planejamento. " + (error?.response?.data ?? "")
                          });
                      });
                  closeDialog(false);
          }}>
                Confirmar
          </button>
      </div>
    </Modal>
  );
}
