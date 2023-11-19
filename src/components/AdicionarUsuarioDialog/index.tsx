import { useEffect, useState } from "react";
import Modal from "../Modal";
import { adicionarUsuarioEmpresa, fetchEmpresa } from "../../service/empresaApi";
import { notification } from "antd";
import { fetchUsuarios } from "../../service/usuarioApi";
import { FilterOptions, ListaPaginada } from "../../pages/gerencia/GerenciarUsuario";
import Select from "../Select";
import "./styles.css"

interface AdicionarUsuarioDialogProps {
    cnpj: string | undefined;
    closeDialog: (added: boolean) => void;
}

export default function AdicionarUsuarioDialog( { cnpj, closeDialog }: AdicionarUsuarioDialogProps) {
    const [currentInputValue, setCurrentInputValue] = useState<string>("")
    const [currentInputRotulo, setCurrentInputRotulo] = useState<string>("")
    const [selectedId, setSelectedId] = useState('');
    const [nomeEmpresa, setNomeEmpresa] = useState('');
    const [listaUsuarios, setListaUsuarios] = useState<FilterOptions[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [loading, setLoading] = useState(false);

    const buscarUsuarios = async () => {
        setLoading(true);
        fetchUsuarios<ListaPaginada>({pagina: currentPage, itemsPorPagina: 15, nome: currentInputRotulo})
            .then(lista => {
                setListaUsuarios(lista.items.filter(user => user.empresa?.cnpj !== cnpj)
                    .map((user) => ({ id: user.id, rotulo: user.nome + " - " + user.email})));
            })
            .catch(error => {
                notification.error({message: "Erro ao obter usuários."} + 
                    (error?.response?.data ?? ""));
            }) 
            .finally(() => setLoading(false))
    }

    const adicionarUsuario = (usuarioid: string) => {
        if (!cnpj || !usuarioid) return;
        setLoading(true);
        adicionarUsuarioEmpresa({cnpj, usuarioid})
            .then(() => {
                notification.success({message: "Usuário adicionado com sucesso."});
                closeDialog(true);
            })
            .catch((error) => {
                notification.error({message: "Falha ao adicionar o usuário." + 
                    (error?.response?.data ?? "")});
            })
            .finally(() => setLoading(false))
    }

    async function buscarEmpresa(cnpj : string | undefined) {
        if (cnpj) {
		    const empresa = await fetchEmpresa(cnpj);
		    setNomeEmpresa(empresa.razaoSocial);
        }
	}

    const getRotuloById = (id: string, rotulo?: string): string => {
        const item = listaUsuarios.find(item => item.id === id);
        return item ? item.rotulo : rotulo || "";
    };

    useEffect(() => {
        buscarUsuarios();
        buscarEmpresa(cnpj);
    }, [currentInputValue]);

    return (
        <Modal className="adicionar-usuario-empresa" closeModal={() => {}}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <h4 className="text-center mt-1"><strong>Adicionar Usuário - {nomeEmpresa}</strong></h4>
            </div>
            <Select items={listaUsuarios} value={selectedId} label={"Usuários"} onChange={(inputValueId, inputValueRotulo) => {
                setSelectedId(inputValueId);
                setCurrentInputValue(getRotuloById(inputValueId, inputValueRotulo));
                setCurrentInputRotulo(inputValueRotulo || "");
            }} inputValue={currentInputValue} inputReadOnly={false} dropdownStyle={{ marginLeft: "0px", width: "290px" }}
            />
          <div className="d-flex w-100 justify-content-center">
            <button className="br-button secondary" type="button" onClick={() => closeDialog(false)}>
              Cancelar
            </button>
            <button className="br-button primary" type="button"onClick={() => adicionarUsuario(selectedId)}>
              Adicionar
            </button>
          </div>
        </Modal>
      );
}