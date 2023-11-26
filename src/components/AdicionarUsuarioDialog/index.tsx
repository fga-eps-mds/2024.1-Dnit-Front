import { useEffect, useState } from "react";
import Modal from "../Modal";
import { adicionarUsuarioEmpresa } from "../../service/empresaApi";
import { notification } from "antd";
import { fetchUsuarios } from "../../service/usuarioApi";
import { FilterOptions, ListaPaginada } from "../../pages/gerencia/GerenciarUsuario";
import Select from "../Select";
import "./styles.css"

interface AdicionarUsuarioDialogProps {
    readonly cnpj: string | undefined;
    readonly nomeEmpresa: string | undefined;
    readonly closeDialog: (added: boolean) => void;
}

export default function AdicionarUsuarioDialog({ cnpj, nomeEmpresa, closeDialog }: AdicionarUsuarioDialogProps) {
    const [currentInputValue, setCurrentInputValue] = useState<string>("")
    const [currentInputRotulo, setCurrentInputRotulo] = useState<string>("")
    const [selectedId, setSelectedId] = useState('');
    const [listaUsuarios, setListaUsuarios] = useState<FilterOptions[]>([]);

    const buscarUsuarios = async () => {
        fetchUsuarios<ListaPaginada>({pagina: 1, itemsPorPagina: 15, nome: currentInputRotulo})
            .then(lista => {
                setListaUsuarios(lista.items.filter(user => user.empresa?.cnpj !== cnpj)
                    .map((user) => ({ id: user.id, rotulo: user.nome + " - " + user.email})));
            })
            .catch(error => {
                notification.error({message: "Erro ao obter usuários."} + 
                    (error?.response?.data ?? ""));
            })
    }

    const adicionarUsuario = (usuarioid: string) => {
        if (!cnpj || !usuarioid) return;
        adicionarUsuarioEmpresa({cnpj, usuarioid})
            .then(() => {
                notification.success({message: "Usuário adicionado com sucesso."});
                closeDialog(true);
            })
            .catch((error) => {
                notification.error({message: "Falha ao adicionar o usuário." + 
                    (error?.response?.data ?? "")});
            })
    }

    const getRotuloById = (id: string, rotulo?: string): string => {
        const item = listaUsuarios.find(item => item.id === id);
        return item ? item.rotulo : rotulo ?? "";
    };

    useEffect(() => {
        buscarUsuarios();
    }, [currentInputValue]);

    return (
        <Modal className="adicionar-usuario-empresa" closeModal={() => {}}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <h4 className="text-center mt-1">Adicionar Usuário - {nomeEmpresa}</h4>
            </div>
            <Select items={listaUsuarios} value={selectedId} label={"Usuários"} onChange={(inputValueId, inputValueRotulo) => {
                setSelectedId(inputValueId);
                setCurrentInputValue(getRotuloById(inputValueId, inputValueRotulo));
                setCurrentInputRotulo(inputValueRotulo ?? "");
            }} inputValue={currentInputValue} inputReadOnly={false} dropdownStyle={{ marginLeft: "0px", width: "280px" }}
            />
          <div className="d-flex w-100 justify-content-center">
            <button className="br-button secondary" data-testid="botao-cancelar" type="button" onClick={() => closeDialog(false)}>
              Cancelar
            </button>
            <button className="br-button primary" data-testid="botao-cadastrar" type="button"onClick={() => adicionarUsuario(selectedId)}>
              Adicionar
            </button>
          </div>
        </Modal>
      );
}